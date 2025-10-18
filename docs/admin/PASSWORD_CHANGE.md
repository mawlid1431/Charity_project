 Admin Password Change Guide

## Overview
The admin dashboard now includes a secure password change feature that allows you to update your admin password with proper validation.

## How to Change Your Password
### Step 1: Access Settings
1. Log in to the admin dashboard
2. Click on the **Settings** tab in the navigation menu
3. You'll see the "Change Password" form

### Step 2: Fill in the Form
The password change form requires three fields:

1. **Current Password**: Enter your existing admin password
   - This verifies that you are authorized to make the change
   
2. **New Password**: Enter your desired new password
   - Must be at least 8 characters long
   - Should include a mix of letters, numbers, and symbols for security
   
3. **Confirm New Password**: Re-enter your new password
   - Must match the new password exactly

### Step 3: Submit the Change
1. Click the **Change Password** button
2. The system will validate:
   - Current password is correct
   - New password meets minimum requirements (8+ characters)
   - New password matches confirmation
   - New password is different from current password

### Step 4: Update Environment File
After successful validation, you'll receive a success message with your new password. You must then:

1. Open your `.env` file in the project root
2. Find the line: `VITE_ADMIN_PASSWORD=your_old_password`
3. Replace it with: `VITE_ADMIN_PASSWORD=your_new_password`
4. Save the file
5. Restart your development server if it's running

### Step 5: Test the New Password
1. Log out of the admin dashboard
2. Log back in using your new password
3. Verify that you can access the dashboard

## Security Features

### Validation Checks
- ✅ Current password verification
- ✅ Minimum password length (8 characters)
- ✅ Password confirmation matching
- ✅ New password must differ from current password
- ✅ Show/hide password toggle for all fields

### Security Best Practices
- 🔒 Use strong passwords with letters, numbers, and symbols
- 🔒 Don't reuse passwords from other accounts
- 🔒 Change your password regularly (every 3-6 months)
- 🔒 Never share your password with anyone
- 🔒 Keep your `.env` file secure and never commit it to version control

## Troubleshooting

### "Current password is incorrect"
- Double-check that you're entering the correct current password
- Make sure Caps Lock is not enabled
- Use the eye icon to reveal the password and verify

### "New passwords do not match"
- Ensure both new password fields contain exactly the same text
- Check for extra spaces or typos

### "New password must be at least 8 characters long"
- Your password needs to be longer
- Consider using a passphrase for better security

### "New password must be different from current password"
- Choose a different password than your current one
- This prevents accidental "changes" to the same password

## Important Notes

⚠️ **Manual Environment Update Required**
Currently, the password change requires manual update of the `.env` file. This is by design for security reasons, as environment variables cannot be modified at runtime in a client-side application.

⚠️ **Production Considerations**
For production environments, consider implementing:
- Server-side password management
- Encrypted password storage
- Password reset via email
- Two-factor authentication (2FA)
- OAuth integration

## Future Enhancements

Potential improvements for production:
- Automatic password update via backend API
- Password strength meter
- Password history to prevent reuse
- Account lockout after failed attempts
- Email notifications on password change
- Session invalidation on password change
