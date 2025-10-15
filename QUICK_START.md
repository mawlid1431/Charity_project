# ⚡ QUICK START - 3 Steps to Get Running

## 📋 What You Need:

1. ✅ Supabase account (you have this)
2. ✅ Admin dashboard (already built)
3. ✅ SQL file (ready to copy)

---

## 🚀 STEP 1: Setup Database (2 minutes)

### Copy This SQL:
1. Open file: **`COPY_THIS_TO_SUPABASE.sql`**
2. Select all (Ctrl+A)
3. Copy (Ctrl+C)

### Paste in Supabase:
1. Go to: https://hohzrasvjvkmgyirxbht.supabase.co
2. Click: **SQL Editor** → **New Query**
3. Paste (Ctrl+V)
4. Click: **Run**

✅ **Done!** Tables created.

---

## 🚀 STEP 2: Start Your App (1 minute)

```bash
npm run dev
```

Open: http://localhost:5173

---

## 🚀 STEP 3: Access Admin (1 minute)

Go to: http://localhost:5173/admin

**Login with:**
- Email: `admin@example.com`
- Password: `admin123`

(Or create your own admin user)

---

## ✅ You're Ready!

Now you can:

### Manage Projects:
```
/admin → Projects tab → Add Project
```

Fill in:
- Project Name
- Location
- Date
- Description
- Image URL
- Target Amount
- Raised Amount
- Status (Active/Paused/Completed)

### View Donations:
```
/admin → Donations tab
```

See all donations with:
- Search
- Filter by status
- Export to CSV

---

## 📊 Database Tables Created:

### PROJECTS Table:
| Field | Type | Example |
|-------|------|---------|
| name | Text | "Clean Water Initiative" |
| location | Text | "Rural Villages, East Region" |
| date | Date | "2024-03-01" |
| description | Text | "Providing clean water..." |
| image | Text | "https://..." |
| target_amount | Number | 50000 |
| raised_amount | Number | 15000 |
| status | Text | "active" / "paused" / "completed" |

### DONATIONS Table:
| Field | Type | Example |
|-------|------|---------|
| donor_name | Text | "John Smith" |
| donor_email | Text | "john@example.com" |
| donor_phone | Text | "+1234567890" |
| amount | Number | 500 |
| message | Text | "Great cause!" |
| payment_status | Text | "completed" / "pending" / "failed" |
| payment_method | Text | "Credit Card" |
| project_id | UUID | Links to project |

---

## 🎯 Quick Actions:

### Add a Project:
```
1. Go to /admin
2. Click "Add Project"
3. Fill form
4. Click "Create Project"
```

### Edit a Project:
```
1. Find project card
2. Click "Edit"
3. Update fields
4. Click "Update Project"
```

### View Donations:
```
1. Go to /admin
2. Click "Donations" tab
3. Search or filter
```

---

## 📁 Important Files:

| File | Purpose |
|------|---------|
| `COPY_THIS_TO_SUPABASE.sql` | **COPY THIS TO SUPABASE** |
| `HOW_TO_SETUP_DATABASE.md` | Detailed setup guide |
| `ADMIN_DASHBOARD_GUIDE.md` | How to use admin dashboard |
| `START_HERE.md` | General overview |

---

## 🎨 Sample Data Included:

After running the SQL, you'll have:
- ✅ 4 sample projects
- ✅ 3 sample donations
- ✅ All tables configured
- ✅ Security enabled

---

## 💡 Pro Tips:

1. **Test with sample data first** - Don't delete it yet
2. **Use good images** - Unsplash has great free images
3. **Update raised amounts** - Keep them current
4. **Set realistic targets** - Make goals achievable
5. **Use status wisely** - Active → Paused → Completed

---

## 🔗 Quick Links:

- **Supabase Dashboard**: https://hohzrasvjvkmgyirxbht.supabase.co
- **SQL Editor**: Click "SQL Editor" in left sidebar
- **Table Editor**: Click "Table Editor" to view data
- **Your Admin**: http://localhost:5173/admin

---

## ✅ Checklist:

- [ ] Copy SQL from `COPY_THIS_TO_SUPABASE.sql`
- [ ] Paste in Supabase SQL Editor
- [ ] Click "Run"
- [ ] Verify tables in Table Editor
- [ ] Run `npm run dev`
- [ ] Go to `/admin`
- [ ] Login
- [ ] Add your first project!

---

## 🎉 That's It!

**3 simple steps and you're managing projects and donations!**

Need help? Check:
- `HOW_TO_SETUP_DATABASE.md` - Database setup
- `ADMIN_DASHBOARD_GUIDE.md` - Dashboard usage
- `ADMIN_PROJECTS_MANAGEMENT.md` - SQL queries

**Happy managing! 🚀**
