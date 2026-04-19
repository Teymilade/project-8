/*
  # Staff Authentication System

  1. New Tables
    - `staff_profiles`
      - `id` (uuid, references auth.users)
      - `full_name` (text)
      - `role` (text) - 'cleaner', 'manager', 'admin'
      - `phone` (text, optional)
      - `is_active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `staff_profiles` table
    - Add policies for staff to read their own profile
    - Add policies for managers/admins to manage staff

  3. Notes
    - Staff members will use Supabase Auth with email/password
    - Each staff member has a unique email address
    - Roles: cleaner (basic access), manager (can view team), admin (full access)
*/

-- Create staff_profiles table
CREATE TABLE IF NOT EXISTS staff_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'cleaner' CHECK (role IN ('cleaner', 'manager', 'admin')),
  phone text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE staff_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Staff can read their own profile
CREATE POLICY "Staff can read own profile"
  ON staff_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Policy: Staff can update their own profile (but not role or is_active)
CREATE POLICY "Staff can update own profile"
  ON staff_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id AND
    role = (SELECT role FROM staff_profiles WHERE id = auth.uid()) AND
    is_active = (SELECT is_active FROM staff_profiles WHERE id = auth.uid())
  );

-- Policy: Admins can read all staff profiles
CREATE POLICY "Admins can read all profiles"
  ON staff_profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM staff_profiles
      WHERE id = auth.uid() AND role = 'admin' AND is_active = true
    )
  );

-- Policy: Admins can insert new staff
CREATE POLICY "Admins can insert staff"
  ON staff_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM staff_profiles
      WHERE id = auth.uid() AND role = 'admin' AND is_active = true
    )
  );

-- Policy: Admins can update all staff profiles
CREATE POLICY "Admins can update all profiles"
  ON staff_profiles
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM staff_profiles
      WHERE id = auth.uid() AND role = 'admin' AND is_active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM staff_profiles
      WHERE id = auth.uid() AND role = 'admin' AND is_active = true
    )
  );

-- Policy: Admins can delete staff profiles
CREATE POLICY "Admins can delete profiles"
  ON staff_profiles
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM staff_profiles
      WHERE id = auth.uid() AND role = 'admin' AND is_active = true
    )
  );

-- Create function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_staff_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS staff_profiles_updated_at ON staff_profiles;
CREATE TRIGGER staff_profiles_updated_at
  BEFORE UPDATE ON staff_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_staff_updated_at();
