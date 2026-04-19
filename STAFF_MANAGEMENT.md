# Staff Management Guide

This guide explains how to add and manage staff members in the Clean Logic Solutions portal.

## Overview

The staff authentication system uses **Supabase Auth** with email/password authentication. Each staff member has:
- Unique email address
- Secure password
- Profile with role (cleaner, manager, or admin)
- Individual access tracking

## Adding New Staff Members

### Method 1: Using Supabase Dashboard (Recommended for Admins)

1. **Go to Supabase Dashboard**
   - Navigate to: https://supabase.com/dashboard
   - Select your project
   - Go to "Authentication" → "Users"

2. **Create New User**
   - Click "Add user" → "Create new user"
   - Enter email: `staff.email@cleanlogic.com`
   - Enter password (or let them set it via email)
   - Click "Create user"
   - Copy the user's UUID (you'll need this)

3. **Add Staff Profile**
   - Go to "Table Editor" → "staff_profiles"
   - Click "Insert row"
   - Fill in:
     - `id`: Paste the UUID from step 2
     - `full_name`: "John Smith"
     - `role`: Select "cleaner", "manager", or "admin"
     - `phone`: Optional phone number
     - `is_active`: true
   - Click "Save"

### Method 2: Using SQL (For Bulk Imports)

Run this SQL in Supabase SQL Editor:

```sql
-- First, create the auth user (Supabase will generate UUID)
-- This must be done via Supabase Auth API or Dashboard

-- Then, insert the profile (replace the UUID with the actual user UUID)
INSERT INTO staff_profiles (id, full_name, role, phone, is_active)
VALUES
  ('user-uuid-here', 'John Smith', 'cleaner', '07700900000', true);
```

## Staff Roles

### Cleaner
- Can view and manage their own shifts
- Can check in/out of shifts
- Can upload photo evidence
- **Basic portal access only**

### Manager
- All cleaner permissions
- Can view all staff profiles
- Can view all shifts and schedules
- **Can create, edit, and delete shifts for all staff**
- Access to Admin Portal at `/admin-portal`

### Admin
- Full system access
- Can add/edit/remove staff members
- Can view all data and schedules
- Can create, edit, and delete shifts for all staff
- Can change user roles
- **Full management capabilities**
- Access to Admin Portal at `/admin-portal`

## Example Staff Accounts

Here are example credentials you can use for testing:

### Create Test Admin
```sql
-- After creating auth user with email: admin@cleanlogic.com
INSERT INTO staff_profiles (id, full_name, role, is_active)
VALUES
  ('admin-uuid', 'Admin User', 'admin', true);
```

### Create Test Cleaner
```sql
-- After creating auth user with email: cleaner@cleanlogic.com
INSERT INTO staff_profiles (id, full_name, role, phone, is_active)
VALUES
  ('cleaner-uuid', 'Jane Cleaner', 'cleaner', '07700900001', true);
```

## Shift Management

### Creating Shifts (Admin/Manager Only)

1. **Login** to the admin portal at `/cleaner-login`
2. Navigate to the **Shifts** tab
3. Click **Create Shift** button
4. Fill in the shift details:
   - Select a staff member (cleaners only)
   - Choose the date
   - Set start and end times
   - Enter the location/address
   - Add optional notes or instructions
5. Click **Create Shift**

The shift will immediately appear in the cleaner's portal.

### Shift Statuses

- **Scheduled** - Shift created, awaiting check-in
- **In Progress** - Cleaner has checked in
- **Completed** - Cleaner has checked out with photos
- **Cancelled** - Shift cancelled by admin/manager

### Cleaner Check-In Process

1. Cleaner logs in at `/cleaner-login`
2. Views assigned shifts in their portal
3. Clicks **Check In** when arriving at location
4. Uploads photos during or after work
5. Clicks **Check Out** to complete (requires at least 1 photo)

## Deactivating Staff

To deactivate a staff member (they cannot log in but data is preserved):

```sql
UPDATE staff_profiles
SET is_active = false
WHERE id = 'user-uuid-here';
```

## Resetting Passwords

Staff members can request password resets through their manager. Managers/admins can:

1. Go to Supabase Dashboard → Authentication → Users
2. Find the user
3. Click "..." → "Send password reset email"

## Security Notes

- ✅ Each staff member has unique credentials
- ✅ Passwords are securely hashed by Supabase Auth
- ✅ Row Level Security (RLS) prevents unauthorized access
- ✅ Staff can only view their own profile unless they're admin
- ✅ Inactive accounts are automatically blocked from login

## Quick Start for First Admin

1. Create your first admin account in Supabase Dashboard
2. Get the UUID from the auth.users table
3. Insert into staff_profiles with role='admin'
4. Log in at: https://yoursite.com/cleaner-login
5. Use the admin account to manage other staff

## API Integration (Advanced)

For programmatic staff creation, use the Supabase Admin API:

```typescript
import { supabase } from '@/lib/supabase';

// Create user with Supabase Auth
const { data: authData, error: authError } = await supabase.auth.admin.createUser({
  email: 'new.staff@cleanlogic.com',
  password: 'secure-password-123',
  email_confirm: true
});

// Create staff profile
if (authData.user) {
  const { error: profileError } = await supabase
    .from('staff_profiles')
    .insert({
      id: authData.user.id,
      full_name: 'New Staff Member',
      role: 'cleaner',
      phone: '07700900002',
      is_active: true
    });
}
```

## Troubleshooting

### "Invalid login credentials"
- Check email is correct
- Verify password
- Ensure user exists in auth.users table
- Check if staff_profiles entry exists

### "Account Inactive"
- Staff profile has `is_active = false`
- Contact admin to reactivate

### "Access Denied"
- User exists but no staff_profiles entry
- Create profile entry with correct UUID

## Support

For issues with staff management, contact your system administrator or refer to the Supabase documentation at https://supabase.com/docs
