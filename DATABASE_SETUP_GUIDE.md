# 🗄️ Database Setup Guide

## Quick Start - Recreate Your Database

Since you deleted your previous tables, follow these steps to recreate your database:

---

## 📋 Step 1: Run Main Database Schema

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard
   - Select your project

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Copy & Run the SQL**
   - Open the file: `COPY_THIS_TO_SUPABASE.sql` (in your project root)
   - Copy ALL the content
   - Paste it into the Supabase SQL Editor
   - Click "Run" or press `Ctrl+Enter`

4. **Verify Success**
   - You should see a success message
   - Check the "Table Editor" to see your new tables:
     - ✅ `projects` table
     - ✅ `donations` table

---

## 🖼️ Step 2: Fix Storage Policies (If Needed)

**Only run this if you have issues uploading project images!**

1. Open SQL Editor again
2. Open the file: `FIX_STORAGE_POLICIES.sql`
3. Copy and paste the content
4. Click "Run"

---

## 📊 What Gets Created

### Tables

#### 1. **projects** table
Stores all charity projects with:
- Project name, location, date
- Description and image URL
- Target amount and raised amount
- Status (active, paused, completed)
- Timestamps

#### 2. **donations** table
Tracks all donations with:
- Donor information (name, email, phone)
- Donation amount
- Payment method and status
- Transaction ID
- Link to project
- Timestamps

### Storage

#### **project-images** bucket
- Stores project images
- Public access enabled
- Upload/update/delete permissions configured

### Security

- **Row Level Security (RLS)** enabled on all tables
- Public can view active projects
- Public can create donations
- Authenticated users (admin) can manage everything

### Automation

- **Auto-update triggers**:
  - Updates `updated_at` timestamp on project changes
  - Automatically adds donation amounts to project `raised_amount`

### Sample Data

The SQL includes sample data:
- 4 sample projects (Clean Water, Education, Medical Aid, Food Relief)
- 3 sample donations

**To remove sample data**: Delete the "SAMPLE DATA" section from the SQL file before running.

---

## 🔐 Admin Access

After setting up the database:

1. Go to `/admin` on your website
2. Login with:
   - Username: `admin`
   - Password: `admin123`

3. You can now:
   - ✅ Manage projects (create, edit, delete)
   - ✅ Upload project images
   - ✅ View donations (click "View Donations" button)
   - ✅ See dashboard statistics

---

## 🆘 Troubleshooting

### Issue: "relation 'projects' does not exist"
**Solution**: You haven't run the main SQL file yet. Run `COPY_THIS_TO_SUPABASE.sql`

### Issue: "Cannot upload images"
**Solution**: Run `FIX_STORAGE_POLICIES.sql` to fix storage permissions

### Issue: "Permission denied"
**Solution**: Make sure you're logged in to Supabase and have access to the project

### Issue: "Sample data not showing"
**Solution**: 
- Check if the SQL ran successfully
- Refresh your admin dashboard
- Check the Table Editor in Supabase to verify data exists

---

## 📝 Database Schema Diagram

```
┌─────────────────┐         ┌──────────────────┐
│    projects     │         │    donations     │
├─────────────────┤         ├──────────────────┤
│ id (UUID)       │◄────────│ project_id       │
│ name            │         │ donor_name       │
│ location        │         │ donor_email      │
│ date            │         │ amount           │
│ description     │         │ payment_status   │
│ image           │         │ created_at       │
│ target_amount   │         └──────────────────┘
│ raised_amount   │
│ status          │
│ created_at      │
│ updated_at      │
└─────────────────┘
```

---

## 🎯 Next Steps

After database setup:

1. ✅ Test creating a new project in admin dashboard
2. ✅ Test uploading an image
3. ✅ Check if projects appear on the homepage
4. ✅ Test the donation flow
5. ✅ Verify donations are tracked in Supabase

---

## 📞 Need Help?

If you encounter any issues:
1. Check the browser console for errors
2. Check Supabase logs in the dashboard
3. Verify your Supabase connection in `utils/supabase/client.ts`
4. Make sure your `.env` file has the correct Supabase credentials

---

**Happy Coding! 🚀**
