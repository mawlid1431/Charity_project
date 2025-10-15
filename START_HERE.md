# 🚀 START HERE - Supabase Admin Setup

## ⚡ Quick Setup (3 Steps)

### Step 1: Run SQL Schema
1. Open: https://hohzrasvjvkmgyirxbht.supabase.co
2. Click: **SQL Editor** → **New Query**
3. Open file: `supabase-complete-schema.sql`
4. Copy ALL content (Ctrl+A, Ctrl+C)
5. Paste in SQL Editor
6. Click: **Run** (or Ctrl+Enter)

✅ **Done!** Your database is ready.

---

### Step 2: Create Admin User
1. In Supabase, go to: **Authentication** → **Users**
2. Click: **Add user** → **Create new user**
3. Enter your email and password
4. Check: ✅ **Auto Confirm User**
5. Click: **Create user**
6. Copy the **User ID** (UUID)

---

### Step 3: Make User Admin
1. Go back to **SQL Editor**
2. Run this (replace `USER_ID_HERE` with your UUID):

```sql
INSERT INTO admin_users (id, full_name, email, role, is_active)
VALUES (
  'USER_ID_HERE',
  'Your Name',
  'your-email@example.com',
  'super_admin',
  true
);
```

✅ **Done!** You're now an admin.

---

## 📚 What You Can Manage

### 1️⃣ PROJECTS
- ✏️ Project Name
- 📍 Location
- 📅 Date
- 📝 Description
- 🖼️ Image
- 💰 Target Amount ($)
- 💵 Raised Amount ($)
- 🔄 Status (active / paused / completed)

### 2️⃣ DONATIONS
- 👤 Donor Name
- 📧 Donor Email
- 📱 Donor Phone
- 💵 Amount
- 🔄 Payment Status (pending / completed / failed)
- 🎯 Project
- 📝 Message

---

## 📖 Documentation Files

| File | What's Inside |
|------|---------------|
| `supabase-complete-schema.sql` | **THE SQL TO RUN** - Creates all tables |
| `QUICK_ADMIN_REFERENCE.md` | Quick copy/paste SQL commands |
| `ADMIN_PROJECTS_MANAGEMENT.md` | Detailed project & donation management |
| `ADMIN_SETUP_GUIDE.md` | Complete admin setup instructions |
| `SUPABASE_SETUP.md` | General Supabase connection guide |

---

## 🎯 Quick Commands

### Add New Project
```sql
INSERT INTO projects (title, location, start_date, description, image_url, goal_amount, current_amount, status, category)
VALUES ('Project Name', 'Location', '2024-03-01', 'Description...', 'image-url', 50000, 0, 'active', 'Education');
```

### View All Projects
```sql
SELECT title, location, goal_amount, current_amount, status FROM projects;
```

### Change Status
```sql
UPDATE projects SET status = 'completed' WHERE title = 'Project Name';
```

### View Donations
```sql
SELECT donor_name, amount, payment_status FROM donations ORDER BY created_at DESC;
```

---

## ✅ Your Database Includes

**10 Tables:**
1. projects ← **You manage this**
2. donations ← **You manage this**
3. team_members
4. contact_messages
5. admin_users
6. categories
7. blog_posts
8. media_gallery
9. site_settings
10. activity_logs

**Plus:**
- ✅ Sample data (4 projects, 4 team members, 6 categories)
- ✅ Security (Row Level Security enabled)
- ✅ Admin roles (super_admin, admin, editor, viewer)
- ✅ Activity logging
- ✅ Dashboard views

---

## 🎉 You're Ready!

1. ✅ Run `supabase-complete-schema.sql`
2. ✅ Create admin user
3. ✅ Start managing projects & donations!

**Need help?** Check the other documentation files for detailed guides.

---

## 🔗 Your Supabase Links

- **Dashboard**: https://hohzrasvjvkmgyirxbht.supabase.co
- **SQL Editor**: https://hohzrasvjvkmgyirxbht.supabase.co/project/hohzrasvjvkmgyirxbht/sql
- **Table Editor**: https://hohzrasvjvkmgyirxbht.supabase.co/project/hohzrasvjvkmgyirxbht/editor
- **Authentication**: https://hohzrasvjvkmgyirxbht.supabase.co/project/hohzrasvjvkmgyirxbht/auth/users

---

**Everything is ready! Just run that SQL file and you're good to go! 🚀**
