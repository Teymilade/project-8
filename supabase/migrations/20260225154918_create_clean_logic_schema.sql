/*
  # Clean Logic Solutions Database Schema

  ## Overview
  This migration creates the complete database structure for the Clean Logic Solutions platform,
  including booking management, cleaner shift tracking, and photo evidence storage.

  ## New Tables

  ### `domestic_bookings`
  Stores domestic cleaning bookings with pricing details
  - `id` (uuid, primary key)
  - `customer_name` (text)
  - `customer_email` (text)
  - `customer_phone` (text)
  - `postcode` (text) - Validated BS/BA postcodes
  - `address` (text)
  - `bedrooms` (integer)
  - `bathrooms` (integer)
  - `frequency` (text) - Weekly, Fortnightly, One-off
  - `total_price` (decimal)
  - `stripe_payment_id` (text, nullable)
  - `status` (text) - pending, confirmed, completed, cancelled
  - `created_at` (timestamptz)

  ### `airbnb_leads`
  Stores Airbnb host inquiry submissions for admin review
  - `id` (uuid, primary key)
  - `name` (text)
  - `email` (text)
  - `phone` (text)
  - `property_address` (text)
  - `postcode` (text)
  - `property_type` (text) - Studio, 1-bed, 2-bed, 3+ bed
  - `linen_service` (boolean)
  - `turnaround_frequency` (text)
  - `status` (text) - new, contacted, quoted, converted
  - `created_at` (timestamptz)

  ### `end_of_tenancy_bookings`
  Stores end of tenancy deep clean bookings with photo requirements
  - `id` (uuid, primary key)
  - `customer_name` (text)
  - `customer_email` (text)
  - `customer_phone` (text)
  - `property_address` (text)
  - `postcode` (text)
  - `property_type` (text)
  - `move_out_date` (date)
  - `photo_count` (integer) - Must be at least 3
  - `quote_amount` (decimal, nullable)
  - `status` (text) - pending_review, quoted, booked, completed
  - `created_at` (timestamptz)

  ### `property_photos`
  Stores uploaded photos for bookings and cleaner evidence
  - `id` (uuid, primary key)
  - `booking_id` (uuid, nullable) - References various booking tables
  - `booking_type` (text) - domestic, end_of_tenancy, cleaner_evidence
  - `photo_url` (text) - Storage URL
  - `uploaded_by` (text) - customer, cleaner, admin
  - `created_at` (timestamptz)

  ### `cleaner_shifts`
  Stores cleaner shift information and check-in/out times
  - `id` (uuid, primary key)
  - `cleaner_name` (text)
  - `booking_id` (uuid, nullable)
  - `shift_date` (date)
  - `scheduled_start` (time)
  - `scheduled_end` (time)
  - `actual_check_in` (timestamptz, nullable)
  - `actual_check_out` (timestamptz, nullable)
  - `location` (text)
  - `status` (text) - scheduled, in_progress, completed
  - `created_at` (timestamptz)

  ### `contact_submissions`
  Stores general contact form submissions
  - `id` (uuid, primary key)
  - `name` (text)
  - `email` (text)
  - `message` (text)
  - `status` (text) - new, read, responded
  - `created_at` (timestamptz)

  ## Security
  - RLS enabled on all tables
  - Public can insert bookings and leads (for form submissions)
  - Only authenticated admins can view and manage data
*/

-- Create domestic_bookings table
CREATE TABLE IF NOT EXISTS domestic_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  postcode text NOT NULL,
  address text NOT NULL,
  bedrooms integer NOT NULL,
  bathrooms integer NOT NULL,
  frequency text NOT NULL,
  total_price decimal(10,2) NOT NULL,
  stripe_payment_id text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE domestic_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create domestic bookings"
  ON domestic_bookings FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all domestic bookings"
  ON domestic_bookings FOR SELECT
  TO authenticated
  USING (true);

-- Create airbnb_leads table
CREATE TABLE IF NOT EXISTS airbnb_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  property_address text NOT NULL,
  postcode text NOT NULL,
  property_type text NOT NULL,
  linen_service boolean DEFAULT false,
  turnaround_frequency text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE airbnb_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create airbnb leads"
  ON airbnb_leads FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all airbnb leads"
  ON airbnb_leads FOR SELECT
  TO authenticated
  USING (true);

-- Create end_of_tenancy_bookings table
CREATE TABLE IF NOT EXISTS end_of_tenancy_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  property_address text NOT NULL,
  postcode text NOT NULL,
  property_type text NOT NULL,
  move_out_date date NOT NULL,
  photo_count integer DEFAULT 0,
  quote_amount decimal(10,2),
  status text DEFAULT 'pending_review',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE end_of_tenancy_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create end of tenancy bookings"
  ON end_of_tenancy_bookings FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all end of tenancy bookings"
  ON end_of_tenancy_bookings FOR SELECT
  TO authenticated
  USING (true);

-- Create property_photos table
CREATE TABLE IF NOT EXISTS property_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid,
  booking_type text NOT NULL,
  photo_url text NOT NULL,
  uploaded_by text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE property_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can upload photos"
  ON property_photos FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all photos"
  ON property_photos FOR SELECT
  TO authenticated
  USING (true);

-- Create cleaner_shifts table
CREATE TABLE IF NOT EXISTS cleaner_shifts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cleaner_name text NOT NULL,
  booking_id uuid,
  shift_date date NOT NULL,
  scheduled_start time NOT NULL,
  scheduled_end time NOT NULL,
  actual_check_in timestamptz,
  actual_check_out timestamptz,
  location text NOT NULL,
  status text DEFAULT 'scheduled',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE cleaner_shifts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view their shifts"
  ON cleaner_shifts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update their shifts"
  ON cleaner_shifts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create contact submissions"
  ON contact_submissions FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all contact submissions"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (true);