# 🚀 How to Setup Your Database (3 Easy Steps)

## Step 1: Open Supabase SQL Editor

1. Go to: **https://hohzrasvjvkmgyirxbht.supabase.co**
2. Click **"SQL Editor"** in the left sidebar
3. Click **"New Query"** button

## Step 2: Copy and Paste the SQL

1. Open the file: **`COPY_THIS_TO_SUPABASE.sql`**
2. Select ALL the content (Ctrl+A or Cmd+A)
3. Copy it (Ctrl+C or Cmd+C)
4. Go back to Supabase SQL Editor
5. Paste it (Ctrl+V or Cmd+V)

## Step 3: Run the SQL

1. Click the **"Run"** button (or press Ctrl+Enter)
2. Wait a few seconds
3. You should see: ✅ "Success. No rows returned"

---

## ✅ What This Creates:

### 1. PROJECTS Table
Fields you can manage:
- **name** - Project name
- **location** - Project location
- **date** - Project start date
- **description** - Project description
- **image** - Image URL
- **target_amount** - Target amount ($)
- **raised_amount** - Raised amount ($)
- **status** - active / paused / completed

### 2. DONATIONS Table
Fields you can see:
- **donor_name** - Donor's name
- **donor_email** - Donor's email
- **donor_phone** - Donor's phone (optional)
- **amount** - Donation amount
- **message** - Donor's message (optional)
- **payment_status** - pending / completed / failed
- **payment_method** - Payment method
- **project_id** - Which project (optional)

---

## 🎯 Bonus Features Included:

✅ **Auto-update timestamps** - Automatically tracks when projects are updated
✅ **Auto-update raised amounts** - When a donation is marked "completed", it automatically adds to the project's raised_amount
✅ **Security (RLS)** - Row Level Security enabled for data protection
✅ **Sample data** - 4 sample projects and 3 sample donations to get you started
✅ **Indexes** - Fast database queries

---

## 🔍 Verify It Worked:

After running the SQL, check if tables were created:

1. In Supabase, click **"Table Editor"** (left sidebar)
2. You should see:
   - ✅ **projects** table
   - ✅ **donations** table
3. Click on each table to see the sample data

---

## 📊 View Your Data:

### View Projects:
```sql
SELECT * FROM projects;
```

### View Donations:
```sql
SELECT * FROM donations;
```

### View Projects with Total Donations:
```sql
SELECT 
  p.name,
  p.location,
  p.target_amount,
  p.raised_amount,
  p.status,
  COUNT(d.id) as donation_count
FROM projects p
LEFT JOIN donations d ON p.id = d.project_id
GROUP BY p.id, p.name, p.location, p.target_amount, p.raised_amount, p.status;
```

---

## 🎨 Sample Data Included:

### Projects:
1. Clean Water Initiative - $15,000 / $50,000
2. Education for All - $45,000 / $100,000
3. Medical Aid Program - $30,000 / $75,000
4. Emergency Food Relief - $12,000 / $40,000

### Donations:
1. John Smith - $500 to Clean Water Initiative
2. Sarah Johnson - $1,000 to Education for All
3. Mike Wilson - $250 to Medical Aid Program

---

## 🔄 If You Need to Start Over:

If you want to delete everything and start fresh:

```sql
-- Delete all data
DROP TABLE IF EXISTS donations CASCADE;
DROP TABLE IF EXISTS projects CASCADE;

-- Then run COPY_THIS_TO_SUPABASE.sql again
```

---

## ✅ Next Steps:

1. ✅ Run the SQL (you just did this!)
2. ✅ Verify tables exist in Table Editor
3. ✅ Go to your admin dashboard: `http://localhost:5173/admin`
4. ✅ Start managing projects and donations!

---

## 💡 Tips:

- **Don't delete sample data yet** - Use it to test your admin dashboard first
- **Backup before changes** - Export your data before making big changes
- **Test with sample data** - Make sure everything works before adding real data

---

## 🆘 Troubleshooting:

### Error: "relation already exists"
- Tables already exist. Either:
  - Skip this step (tables are already created)
  - Or delete tables first (see "If You Need to Start Over" above)

### Error: "permission denied"
- Make sure you're logged into Supabase
- Check that you're in the correct project

### No sample data showing
- Sample data might have been skipped
- You can add projects manually through the admin dashboard

---

## 🎉 You're Done!

Your database is ready! Now you can:
- ✅ Manage projects in admin dashboard
- ✅ View donations
- ✅ Add new projects
- ✅ Update project status
- ✅ Track fundraising progress

**Go to `/admin` and start managing! 🚀**
