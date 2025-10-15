# 🎛️ Admin Dashboard Guide

## Overview

Your admin dashboard has been updated with a cleaner structure focused on project management and easy database access.

---

## 🔑 Access the Admin Dashboard

1. Navigate to: `http://localhost:5173/admin` (or your domain + `/admin`)
2. Login credentials:
   - **Username**: `admin`
   - **Password**: `admin123`

---

## 📊 Dashboard Features

### 1. **Statistics Cards**
At the top of the dashboard, you'll see 4 key metrics:
- **Active Projects** - Number of currently active projects
- **Total Raised** - Total amount raised across all projects
- **Total Donations** - Number of donations received
- **Success Rate** - Percentage of projects that reached their goals

### 2. **Navigation Tabs**

#### 📁 Projects Tab (Default)
Manage all your charity projects:
- ✅ View all projects in a grid layout
- ✅ Create new projects with the "+ New Project" button
- ✅ Edit existing projects (click Edit icon)
- ✅ Delete projects (click Trash icon)
- ✅ Upload project images
- ✅ Set target amounts and track raised amounts
- ✅ Change project status (active, paused, completed)

**Project Information:**
- Name
- Location
- Date
- Description
- Image (uploaded to Supabase Storage)
- Target Amount
- Raised Amount (auto-updated from donations)
- Status

#### 💻 SQL Editor Tab
View database setup instructions:
- 📄 Information about `COPY_THIS_TO_SUPABASE.sql`
- 🔧 Information about `FIX_STORAGE_POLICIES.sql`
- 📝 Step-by-step setup instructions
- 🔗 Quick link to open Supabase dashboard

### 3. **View Donations Button**
Located in the top right of the tabs section:
- 💰 Click to open Supabase dashboard
- 📊 View all donations in the database
- 🔍 Filter and search donations
- 📥 Export donation data

---

## 🎨 Features

### Dark Mode Toggle
- Click the Sun/Moon icon in the top right
- Switches between light and dark themes
- Preference is saved

### Back to Site
- Returns to the main charity website
- Keeps you logged in to admin

### Logout
- Safely logs you out of the admin dashboard
- Clears authentication token

---

## 📝 How to Manage Projects

### Create a New Project

1. Click the **"+ New Project"** button
2. Fill in the form:
   - **Project Name**: e.g., "Clean Water Initiative"
   - **Location**: e.g., "Rural Villages, East Region"
   - **Date**: Project start date
   - **Description**: Detailed description of the project
   - **Target Amount**: Fundraising goal (e.g., 50000)
   - **Image**: Upload a project image or provide URL
   - **Status**: Choose active, paused, or completed
3. Click **"Create Project"**
4. Project appears on the website immediately!

### Edit a Project

1. Find the project card
2. Click the **Edit** icon (pencil)
3. Update any fields
4. Click **"Update Project"**
5. Changes are reflected immediately

### Delete a Project

1. Find the project card
2. Click the **Trash** icon
3. Confirm deletion
4. Project is removed from database

---

## 🖼️ Image Upload

### Option 1: Upload from Computer
1. Click "Choose File" in the project form
2. Select an image (JPG, PNG, GIF)
3. Image is uploaded to Supabase Storage
4. URL is automatically saved

### Option 2: Use Image URL
1. Paste an image URL directly
2. Image is displayed from the URL

**Supported formats**: JPG, PNG, GIF, WebP
**Max size**: 5MB (recommended)

---

## 💰 View Donations

### From Admin Dashboard
1. Click **"View Donations"** button (top right)
2. Opens Supabase dashboard in new tab
3. Navigate to Table Editor → donations

### Donation Information
Each donation includes:
- Donor name and email
- Donation amount
- Project linked to
- Payment method
- Payment status (pending, completed, failed)
- Transaction ID
- Timestamp

### Auto-Update Feature
When a donation is marked as "completed":
- The project's `raised_amount` is automatically updated
- No manual calculation needed!

---

## 🔄 Database Structure

### Projects Table
```
id              UUID (auto-generated)
name            Text
location        Text
date            Date
description     Text
image           Text (URL)
target_amount   Number
raised_amount   Number (auto-updated)
status          active | paused | completed
created_at      Timestamp
updated_at      Timestamp (auto-updated)
```

### Donations Table
```
id              UUID (auto-generated)
project_id      UUID (links to project)
donor_name      Text
donor_email     Text
donor_phone     Text (optional)
amount          Number
message         Text (optional)
payment_method  Text
payment_status  pending | completed | failed
transaction_id  Text
created_at      Timestamp
```

---

## 🚨 Troubleshooting

### Issue: Can't login to admin
**Solution**: 
- Username: `admin`
- Password: `admin123`
- Check browser console for errors

### Issue: Projects not showing
**Solution**:
- Make sure you ran `COPY_THIS_TO_SUPABASE.sql`
- Check Supabase connection in `.env` file
- Refresh the page

### Issue: Can't upload images
**Solution**:
- Run `FIX_STORAGE_POLICIES.sql` in Supabase
- Check if `project-images` bucket exists
- Verify file size is under 5MB

### Issue: Raised amount not updating
**Solution**:
- Check if donation `payment_status` is "completed"
- Verify the trigger is created in database
- Check Supabase logs for errors

### Issue: Stats showing 0
**Solution**:
- Create some projects first
- Add some donations
- Refresh the dashboard

---

## 🔐 Security Notes

### Row Level Security (RLS)
- ✅ Enabled on all tables
- ✅ Public can view active projects
- ✅ Public can create donations
- ✅ Only authenticated users can manage projects

### Admin Authentication
- Currently uses simple localStorage token
- For production, implement proper authentication:
  - Supabase Auth
  - JWT tokens
  - Role-based access control

---

## 📱 Responsive Design

The admin dashboard works on:
- 💻 Desktop (best experience)
- 📱 Tablet
- 📱 Mobile (limited functionality)

---

## 🎯 Best Practices

1. **Regular Backups**: Export your data regularly from Supabase
2. **Image Optimization**: Compress images before uploading
3. **Clear Descriptions**: Write detailed project descriptions
4. **Update Status**: Keep project status current
5. **Monitor Donations**: Check donations regularly in Supabase

---

## 📞 Need Help?

If you encounter issues:
1. Check the `DATABASE_SETUP_GUIDE.md` file
2. Review browser console for errors
3. Check Supabase dashboard logs
4. Verify `.env` configuration

---

**Happy Managing! 🚀**
