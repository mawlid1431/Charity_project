# 🔐 Admin Setup Guide

## Step 1: Run the SQL Schema

1. Go to your Supabase dashboard: https://hohzrasvjvkmgyirxbht.supabase.co
2. Click **"SQL Editor"** in the left sidebar
3. Click **"New Query"**
4. Open the file `supabase-complete-schema.sql`
5. Copy ALL the content (Ctrl+A, Ctrl+C)
6. Paste it into the SQL Editor
7. Click **"Run"** (or press Ctrl+Enter)

✅ This will create:
- 10 tables (projects, donations, team_members, contact_messages, admin_users, categories, blog_posts, media_gallery, site_settings, activity_logs)
- All indexes for performance
- Row Level Security policies
- Triggers for automatic updates
- Sample data (projects, team members, categories)
- Admin dashboard views

## Step 2: Create Your First Admin User

### Option A: Using Supabase Dashboard (Recommended)

1. Go to **"Authentication"** → **"Users"** in Supabase
2. Click **"Add user"** → **"Create new user"**
3. Enter:
   - Email: `your-admin-email@example.com`
   - Password: `your-secure-password`
   - Auto Confirm User: ✅ (check this)
4. Click **"Create user"**
5. Copy the User ID (UUID) that appears

### Option B: Using SQL

```sql
-- This will be done automatically when you sign up through your app
-- But you can also create users via SQL if needed
```

## Step 3: Make User an Admin

After creating the user, run this SQL to make them an admin:

```sql
-- Replace 'USER_ID_HERE' with the actual UUID from Step 2
INSERT INTO admin_users (id, full_name, email, role, is_active)
VALUES (
  'USER_ID_HERE',  -- Replace with your user UUID
  'Your Full Name',
  'your-admin-email@example.com',
  'super_admin',  -- Options: super_admin, admin, editor, viewer
  true
);
```

### Admin Roles Explained:

- **super_admin**: Full access, can manage other admins
- **admin**: Can manage all content (projects, donations, etc.)
- **editor**: Can edit content but not delete
- **viewer**: Read-only access

## Step 4: Test Admin Login

1. Go to your website
2. Navigate to `/admin` or `/login`
3. Sign in with the email and password you created
4. You should now have admin access!

## Step 5: Verify Everything Works

Run this SQL to check your setup:

```sql
-- Check if tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Check sample data
SELECT COUNT(*) as project_count FROM projects;
SELECT COUNT(*) as category_count FROM categories;
SELECT COUNT(*) as team_count FROM team_members;

-- Check your admin user
SELECT * FROM admin_users;

-- View dashboard stats
SELECT * FROM dashboard_stats;
```

## What You Can Manage as Admin:

### 1. **Projects** 📊
- Create, edit, delete projects
- Set goal amounts and track progress
- Mark projects as featured
- Change project status (active, completed, paused)

### 2. **Donations** 💰
- View all donations
- Update payment status
- Track donation history
- Export donation reports

### 3. **Team Members** 👥
- Add/remove team members
- Update bios and photos
- Reorder team display
- Activate/deactivate members

### 4. **Contact Messages** 📧
- View all messages
- Mark as read/replied
- Set priority levels
- Assign to team members

### 5. **Categories** 🏷️
- Manage project categories
- Set category colors and icons
- Reorder categories

### 6. **Blog Posts** 📝
- Create and publish blog posts
- Add featured images
- Manage drafts
- Track views

### 7. **Media Gallery** 🖼️
- Upload images and videos
- Organize media by project
- Set featured media

### 8. **Site Settings** ⚙️
- Update site information
- Configure donation settings
- Manage display options

### 9. **Activity Logs** 📋
- View all admin actions
- Track changes
- Audit trail

### 10. **Admin Users** 👨‍💼
- Manage admin accounts (super_admin only)
- Set roles and permissions
- Activate/deactivate admins

## Database Tables Overview:

| Table | Purpose | Public Access |
|-------|---------|---------------|
| `projects` | Charity projects | ✅ Read only |
| `donations` | Donation records | ❌ Admin only |
| `team_members` | Team profiles | ✅ Read only |
| `contact_messages` | Contact form submissions | ❌ Admin only |
| `admin_users` | Admin accounts | ❌ Admin only |
| `categories` | Project categories | ✅ Read only |
| `blog_posts` | Blog/news articles | ✅ Published only |
| `media_gallery` | Images/videos | ✅ Read only |
| `site_settings` | Site configuration | ✅ Read only |
| `activity_logs` | Admin action logs | ❌ Admin only |

## Security Features:

✅ **Row Level Security (RLS)** enabled on all tables
✅ **Admin-only access** for sensitive data
✅ **Activity logging** for all admin actions
✅ **Role-based permissions** (super_admin, admin, editor, viewer)
✅ **Automatic timestamps** for all records
✅ **Secure password hashing** via Supabase Auth

## Common Admin Tasks:

### Add a New Project
```sql
INSERT INTO projects (title, description, image_url, goal_amount, category, status, location, featured)
VALUES (
  'New Project Title',
  'Detailed description of the project...',
  'https://example.com/image.jpg',
  25000,
  'Education',
  'active',
  'Project Location',
  false
);
```

### Update Donation Status
```sql
UPDATE donations 
SET payment_status = 'completed'
WHERE id = 'donation-uuid-here';
```

### Mark Message as Read
```sql
UPDATE contact_messages 
SET status = 'read'
WHERE id = 'message-uuid-here';
```

### View Recent Activity
```sql
SELECT * FROM activity_logs 
ORDER BY created_at DESC 
LIMIT 20;
```

## Troubleshooting:

### Can't log in as admin?
- Make sure you created the user in Supabase Authentication
- Verify the user was added to `admin_users` table
- Check that `is_active = true`

### Getting permission errors?
- Verify RLS policies are enabled
- Check your admin role in `admin_users` table
- Make sure you're authenticated

### Tables not created?
- Check for SQL errors in the query result
- Make sure you ran the entire schema file
- Try running it in smaller sections

## Next Steps:

1. ✅ Run the SQL schema
2. ✅ Create your admin user
3. ✅ Test admin login
4. 📱 Build your admin dashboard UI
5. 🎨 Customize the admin interface
6. 📊 Start managing your charity!

## Support:

If you encounter any issues:
1. Check the Supabase logs
2. Verify your RLS policies
3. Review the activity logs
4. Check the SQL Editor for errors

---

**🎉 You're all set!** Your admin system is ready to manage your charity website.
