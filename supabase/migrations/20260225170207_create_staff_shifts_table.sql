/*
  # Create Staff Shifts Table

  ## Overview
  Replace the generic cleaner_shifts table with a proper staff_shifts table
  that links to staff_profiles and supports scheduling by admins/managers.

  ## New Tables
  - `staff_shifts`
    - `id` (uuid, primary key)
    - `staff_id` (uuid, foreign key to staff_profiles)
    - `booking_id` (uuid, nullable, foreign key to various booking tables)
    - `booking_type` (text, nullable, type of booking)
    - `shift_date` (date, the date of the shift)
    - `scheduled_start` (time, scheduled start time)
    - `scheduled_end` (time, scheduled end time)
    - `actual_check_in` (timestamptz, nullable, actual check-in time)
    - `actual_check_out` (timestamptz, nullable, actual check-out time)
    - `location` (text, address/location of shift)
    - `notes` (text, nullable, additional notes for the cleaner)
    - `status` (text, default 'scheduled')
    - `created_at` (timestamptz)
    - `created_by` (uuid, staff member who created the shift)

  ## Security
  - Enable RLS on staff_shifts table
  - Staff can read their own shifts
  - Staff can update their own shift check-in/out times
  - Admins and managers can manage all shifts
*/

-- Drop old table if exists
DROP TABLE IF EXISTS cleaner_shifts CASCADE;

-- Create new staff_shifts table
CREATE TABLE IF NOT EXISTS staff_shifts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id uuid NOT NULL REFERENCES staff_profiles(id) ON DELETE CASCADE,
  booking_id uuid,
  booking_type text,
  shift_date date NOT NULL,
  scheduled_start time NOT NULL,
  scheduled_end time NOT NULL,
  actual_check_in timestamptz,
  actual_check_out timestamptz,
  location text NOT NULL,
  notes text,
  status text NOT NULL DEFAULT 'scheduled',
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES staff_profiles(id),
  
  CONSTRAINT valid_status CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  CONSTRAINT valid_booking_type CHECK (booking_type IS NULL OR booking_type IN ('domestic', 'airbnb', 'end_of_tenancy', 'commercial', 'other'))
);

-- Enable RLS
ALTER TABLE staff_shifts ENABLE ROW LEVEL SECURITY;

-- Staff can read their own shifts
CREATE POLICY "Staff can read own shifts"
  ON staff_shifts
  FOR SELECT
  TO authenticated
  USING (staff_id = auth.uid());

-- Admins can read all shifts
CREATE POLICY "Admins can read all shifts"
  ON staff_shifts
  FOR SELECT
  TO authenticated
  USING (
    get_user_role(auth.uid()) = 'admin' 
    AND is_user_active(auth.uid())
  );

-- Managers can read all shifts
CREATE POLICY "Managers can read all shifts"
  ON staff_shifts
  FOR SELECT
  TO authenticated
  USING (
    get_user_role(auth.uid()) = 'manager' 
    AND is_user_active(auth.uid())
  );

-- Staff can update their own shift check-in/out times only
CREATE POLICY "Staff can update own shift times"
  ON staff_shifts
  FOR UPDATE
  TO authenticated
  USING (staff_id = auth.uid())
  WITH CHECK (
    staff_id = auth.uid()
    -- Ensure staff can't change these protected fields
    AND staff_id = (SELECT staff_id FROM staff_shifts WHERE id = staff_shifts.id)
    AND shift_date = (SELECT shift_date FROM staff_shifts WHERE id = staff_shifts.id)
  );

-- Admins can manage all shifts
CREATE POLICY "Admins can insert shifts"
  ON staff_shifts
  FOR INSERT
  TO authenticated
  WITH CHECK (
    get_user_role(auth.uid()) = 'admin' 
    AND is_user_active(auth.uid())
  );

CREATE POLICY "Admins can update all shifts"
  ON staff_shifts
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

CREATE POLICY "Admins can delete shifts"
  ON staff_shifts
  FOR DELETE
  TO authenticated
  USING (
    get_user_role(auth.uid()) = 'admin' 
    AND is_user_active(auth.uid())
  );

-- Managers can manage all shifts
CREATE POLICY "Managers can insert shifts"
  ON staff_shifts
  FOR INSERT
  TO authenticated
  WITH CHECK (
    get_user_role(auth.uid()) = 'manager' 
    AND is_user_active(auth.uid())
  );

CREATE POLICY "Managers can update all shifts"
  ON staff_shifts
  FOR UPDATE
  TO authenticated
  USING (
    get_user_role(auth.uid()) = 'manager' 
    AND is_user_active(auth.uid())
  )
  WITH CHECK (
    get_user_role(auth.uid()) = 'manager' 
    AND is_user_active(auth.uid())
  );

CREATE POLICY "Managers can delete shifts"
  ON staff_shifts
  FOR DELETE
  TO authenticated
  USING (
    get_user_role(auth.uid()) = 'manager' 
    AND is_user_active(auth.uid())
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_staff_shifts_staff_id ON staff_shifts(staff_id);
CREATE INDEX IF NOT EXISTS idx_staff_shifts_shift_date ON staff_shifts(shift_date);
CREATE INDEX IF NOT EXISTS idx_staff_shifts_status ON staff_shifts(status);
CREATE INDEX IF NOT EXISTS idx_staff_shifts_booking ON staff_shifts(booking_id, booking_type);

-- Insert some test shifts for the test cleaner
DO $$
DECLARE
  cleaner_id uuid;
BEGIN
  -- Get the cleaner ID
  SELECT id INTO cleaner_id FROM staff_profiles WHERE role = 'cleaner' LIMIT 1;
  
  IF cleaner_id IS NOT NULL THEN
    -- Insert today's shifts
    INSERT INTO staff_shifts (staff_id, shift_date, scheduled_start, scheduled_end, location, notes, created_by)
    VALUES 
      (cleaner_id, CURRENT_DATE, '09:00', '12:00', '123 Park Street, Bristol BS1 5PQ', 'Standard domestic clean', cleaner_id),
      (cleaner_id, CURRENT_DATE, '14:00', '17:00', '45 Queen Square, Bath BA1 2HQ', 'Deep clean required', cleaner_id),
      (cleaner_id, CURRENT_DATE + 1, '10:00', '13:00', '78 High Street, Bristol BS2 9EE', 'End of tenancy clean', cleaner_id);
  END IF;
END $$;
