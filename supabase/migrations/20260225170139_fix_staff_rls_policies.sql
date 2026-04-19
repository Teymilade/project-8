/*
  # Fix Staff RLS Policies

  ## Problem
  - Circular dependency in RLS policies causing database errors
  - Admin policies query staff_profiles to check if user is admin, which triggers RLS again

  ## Solution
  - Create helper functions that run with SECURITY DEFINER to bypass RLS
  - Simplify RLS policies to use these helper functions
  - Remove circular dependencies

  ## Changes
  1. Create helper function to check user role
  2. Drop existing problematic policies
  3. Create new simplified policies using helper function
  
  ## Security
  - Helper function is SECURITY DEFINER but only returns boolean
  - RLS remains enabled and restrictive
  - Staff can only access own data unless admin/manager
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Staff can read own profile" ON staff_profiles;
DROP POLICY IF EXISTS "Staff can update own profile" ON staff_profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON staff_profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON staff_profiles;
DROP POLICY IF EXISTS "Admins can insert staff" ON staff_profiles;
DROP POLICY IF EXISTS "Admins can delete profiles" ON staff_profiles;

-- Create helper function to get user role (bypasses RLS)
CREATE OR REPLACE FUNCTION get_user_role(user_id uuid)
RETURNS text
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT role FROM staff_profiles WHERE id = user_id LIMIT 1;
$$;

-- Create helper function to check if user is active
CREATE OR REPLACE FUNCTION is_user_active(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT COALESCE(is_active, false) FROM staff_profiles WHERE id = user_id LIMIT 1;
$$;

-- Staff can read own profile (always allowed for authenticated users)
CREATE POLICY "Staff can read own profile"
  ON staff_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Admins can read all profiles
CREATE POLICY "Admins can read all profiles"
  ON staff_profiles
  FOR SELECT
  TO authenticated
  USING (
    get_user_role(auth.uid()) = 'admin' 
    AND is_user_active(auth.uid())
  );

-- Managers can read all profiles
CREATE POLICY "Managers can read all profiles"
  ON staff_profiles
  FOR SELECT
  TO authenticated
  USING (
    get_user_role(auth.uid()) = 'manager' 
    AND is_user_active(auth.uid())
  );

-- Staff can update own profile (limited fields)
CREATE POLICY "Staff can update own profile"
  ON staff_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id 
    AND role = get_user_role(auth.uid())
    AND is_active = is_user_active(auth.uid())
  );

-- Admins can update all profiles
CREATE POLICY "Admins can update all profiles"
  ON staff_profiles
  FOR UPDATE
  TO authenticated
  USING (
    get_user_role(auth.uid()) = 'admin' 
    AND is_user_active(auth.uid())
  )
  WITH CHECK (
    get_user_role(auth.uid()) = 'admin' 
    AND is_user_active(auth.uid())
  );

-- Admins can insert staff
CREATE POLICY "Admins can insert staff"
  ON staff_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    get_user_role(auth.uid()) = 'admin' 
    AND is_user_active(auth.uid())
  );

-- Admins can delete profiles
CREATE POLICY "Admins can delete profiles"
  ON staff_profiles
  FOR DELETE
  TO authenticated
  USING (
    get_user_role(auth.uid()) = 'admin' 
    AND is_user_active(auth.uid())
  );
