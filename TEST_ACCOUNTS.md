# Test Account Credentials

Three test accounts have been created for development and testing purposes.

## Login Pages
- **Staff Login**: `/cleaner-login` (All staff members login here)
- **Admin/Manager Portal**: `/admin-portal` (Automatically redirected after login)
- **Cleaner Portal**: `/cleaner-portal` (Automatically redirected after login)

---

## Admin Account
- **Email**: `admin@cleanlogic.com`
- **Password**: `Admin123!`
- **Name**: Admin User
- **Role**: Admin
- **Portal**: `/admin-portal`
- **Permissions**:
  - View and manage all staff members
  - Create, edit, and delete shifts for any staff
  - Access all shift history and data
  - Manage staff profiles

---

## Manager Account
- **Email**: `manager@cleanlogic.com`
- **Password**: `Manager123!`
- **Name**: Mike Manager
- **Role**: Manager
- **Portal**: `/admin-portal`
- **Permissions**:
  - View all staff members
  - Create, edit, and delete shifts for any staff
  - Access all shift history and data

---

## Cleaner Account
- **Email**: `cleaner@cleanlogic.com`
- **Password**: `Cleaner123!`
- **Name**: Jane Cleaner
- **Role**: Cleaner
- **Portal**: `/cleaner-portal`
- **Permissions**:
  - View own scheduled shifts
  - Check in and check out of shifts
  - Upload photo evidence
  - View shift notes from managers

---

## Testing Tips

1. **Test Login Flow**
   - Visit `/cleaner-login`
   - Use any of the above credentials
   - Verify proper authentication and redirect to correct portal

2. **Test Admin/Manager Portal**
   - Login as admin or manager
   - View all staff members on the "Staff" tab
   - Create new shifts on the "Shifts" tab
   - Delete existing shifts
   - Verify cleaners see the shifts you create

3. **Test Cleaner Portal**
   - Login as cleaner
   - View your assigned shifts
   - Check in to a shift
   - Upload photos (required before checkout)
   - Check out to complete the shift
   - Verify shift status updates

4. **Test Role Permissions**
   - Admin/Manager can create and manage all shifts
   - Admin/Manager can view all staff
   - Cleaner can only see their own shifts
   - Cleaner cannot access admin portal (will be redirected)
   - Admin/Manager redirect to admin portal (not cleaner portal)

5. **Test Security**
   - Inactive accounts cannot login
   - Staff cannot access other staff data
   - Logout properly clears session
   - RLS policies prevent unauthorized data access

---

## Account Management

To deactivate a test account:
```sql
UPDATE staff_profiles
SET is_active = false
WHERE id = 'user-uuid-here';
```

To reset a password, use Supabase Dashboard:
- Authentication → Users → Select user → Send password reset

---

## Security Notes

- These are test accounts for development only
- Change passwords before production deployment
- Delete test accounts in production
- Use strong passwords for real staff accounts
