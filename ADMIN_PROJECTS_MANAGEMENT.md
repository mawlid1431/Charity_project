# 📊 Admin Projects Management Guide

## ✅ Projects Table - What You Can Manage

Your projects table includes ALL the fields you need:

### Project Fields You Can Manage:

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| **Project Name** | `title` | Project title | "Clean Water Initiative" |
| **Location** | `location` | Where the project is | "Rural Villages, East Region" |
| **Date** | `start_date`, `end_date` | Project timeline | "2024-01-15" to "2024-12-31" |
| **Description** | `description` | Full project details | "Providing clean water access..." |
| **Image** | `image_url` | Project image URL | "https://example.com/image.jpg" |
| **Target Amount** | `goal_amount` | Fundraising goal | 50000 |
| **Raised Amount** | `current_amount` | Amount raised so far | 15000 |
| **Status** | `status` | Project status | "active", "paused", "completed" |

### Additional Fields (Bonus):
- **Category** - Type of project (Water, Education, Healthcare, etc.)
- **Featured** - Show on homepage (true/false)
- **Created By** - Admin who created it
- **Created At** - When it was created
- **Updated At** - Last update time

---

## 🎯 Project Status Options

Your projects can have these statuses:

1. **active** ✅ - Project is currently accepting donations
2. **paused** ⏸️ - Temporarily stopped
3. **completed** ✔️ - Project finished successfully
4. **pending** ⏳ - Not yet started (also available)

---

## 📝 How to Manage Projects (SQL Examples)

### 1. Add a New Project

```sql
INSERT INTO projects (
  title,              -- Project Name
  location,           -- Location
  start_date,         -- Start Date
  end_date,           -- End Date (optional)
  description,        -- Description
  image_url,          -- Image URL
  goal_amount,        -- Target Amount
  current_amount,     -- Raised Amount (usually starts at 0)
  status,             -- Status
  category,           -- Category
  featured            -- Featured on homepage?
) VALUES (
  'Build School in Village',
  'Northern Region, District 5',
  '2024-02-01',
  '2024-12-31',
  'Building a new school to provide education for 500 children in underserved communities.',
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
  75000,
  0,
  'active',
  'Education',
  true
);
```

### 2. Update Project Status

```sql
-- Pause a project
UPDATE projects 
SET status = 'paused'
WHERE id = 'project-uuid-here';

-- Mark as completed
UPDATE projects 
SET status = 'completed'
WHERE id = 'project-uuid-here';

-- Reactivate a project
UPDATE projects 
SET status = 'active'
WHERE id = 'project-uuid-here';
```

### 3. Update Raised Amount

```sql
UPDATE projects 
SET current_amount = 25000
WHERE id = 'project-uuid-here';
```

### 4. Update Project Details

```sql
UPDATE projects 
SET 
  title = 'Updated Project Name',
  location = 'New Location',
  description = 'Updated description...',
  goal_amount = 100000
WHERE id = 'project-uuid-here';
```

### 5. View All Projects

```sql
SELECT 
  id,
  title as "Project Name",
  location as "Location",
  start_date as "Start Date",
  description as "Description",
  goal_amount as "Target Amount",
  current_amount as "Raised Amount",
  status as "Status",
  ROUND((current_amount / NULLIF(goal_amount, 0) * 100)::numeric, 2) as "Progress %"
FROM projects
ORDER BY created_at DESC;
```

### 6. View Only Active Projects

```sql
SELECT * FROM projects 
WHERE status = 'active'
ORDER BY created_at DESC;
```

### 7. View Completed Projects

```sql
SELECT * FROM projects 
WHERE status = 'completed'
ORDER BY created_at DESC;
```

### 8. Delete a Project

```sql
DELETE FROM projects 
WHERE id = 'project-uuid-here';
```

---

## 💰 Donations Management

Your donations table includes:

| Field | Description |
|-------|-------------|
| **Donor Name** | Who donated |
| **Donor Email** | Contact email |
| **Donor Phone** | Contact phone (optional) |
| **Amount** | Donation amount |
| **Currency** | USD, EUR, etc. |
| **Message** | Donor's message |
| **Payment Method** | online, cash, bank transfer |
| **Payment Status** | pending, completed, failed, refunded |
| **Transaction ID** | Payment reference |
| **Is Anonymous** | Hide donor name? |
| **Project ID** | Which project (or general donation) |

### View All Donations

```sql
SELECT 
  d.id,
  d.donor_name as "Donor",
  d.donor_email as "Email",
  d.amount as "Amount",
  d.payment_status as "Status",
  d.created_at as "Date",
  p.title as "Project"
FROM donations d
LEFT JOIN projects p ON d.project_id = p.id
ORDER BY d.created_at DESC;
```

### View Donations for Specific Project

```sql
SELECT 
  donor_name,
  amount,
  payment_status,
  created_at
FROM donations
WHERE project_id = 'project-uuid-here'
ORDER BY created_at DESC;
```

### Total Raised for a Project

```sql
SELECT 
  p.title,
  p.goal_amount,
  SUM(d.amount) as total_raised,
  COUNT(d.id) as donation_count
FROM projects p
LEFT JOIN donations d ON p.id = d.project_id 
  AND d.payment_status = 'completed'
WHERE p.id = 'project-uuid-here'
GROUP BY p.id, p.title, p.goal_amount;
```

### Update Donation Status

```sql
-- Mark as completed
UPDATE donations 
SET payment_status = 'completed'
WHERE id = 'donation-uuid-here';

-- Mark as failed
UPDATE donations 
SET payment_status = 'failed'
WHERE id = 'donation-uuid-here';
```

---

## 🎨 Quick Admin Dashboard Queries

### 1. Dashboard Overview

```sql
SELECT * FROM dashboard_stats;
```

Returns:
- Active projects count
- Total donations count
- Total amount raised
- Unread messages count
- Team members count

### 2. Project Progress Report

```sql
SELECT * FROM project_stats
ORDER BY completion_percentage DESC;
```

Shows all projects with:
- Goal amount
- Current amount
- Completion percentage
- Number of donations

### 3. Recent Donations

```sql
SELECT * FROM recent_donations
LIMIT 10;
```

Shows last 10 donations with project names.

### 4. Projects Needing Attention

```sql
SELECT 
  title,
  status,
  goal_amount,
  current_amount,
  ROUND((current_amount / NULLIF(goal_amount, 0) * 100)::numeric, 2) as progress
FROM projects
WHERE status = 'active' 
  AND current_amount < goal_amount * 0.5
ORDER BY progress ASC;
```

Shows active projects that are less than 50% funded.

---

## 🔍 Finding Project IDs

To update or delete a project, you need its UUID. Here's how to find it:

```sql
-- Find by name
SELECT id, title, status 
FROM projects 
WHERE title LIKE '%Water%';

-- List all with IDs
SELECT id, title, status, created_at 
FROM projects 
ORDER BY created_at DESC;
```

---

## 📊 Example: Complete Project Management Flow

### Step 1: Create a New Project
```sql
INSERT INTO projects (title, location, start_date, description, image_url, goal_amount, current_amount, status, category, featured)
VALUES (
  'Emergency Food Relief',
  'Disaster Affected Areas',
  '2024-03-01',
  'Providing food packages to 1000 families affected by recent floods.',
  'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800',
  40000,
  0,
  'active',
  'Food',
  true
)
RETURNING id, title;
```

### Step 2: Check Progress
```sql
SELECT 
  title,
  goal_amount,
  current_amount,
  ROUND((current_amount / goal_amount * 100)::numeric, 2) as progress,
  status
FROM projects
WHERE title = 'Emergency Food Relief';
```

### Step 3: Update When Goal Reached
```sql
UPDATE projects 
SET status = 'completed'
WHERE title = 'Emergency Food Relief' 
  AND current_amount >= goal_amount;
```

---

## ✅ Summary

**You can manage these fields for Projects:**
- ✅ Project Name (title)
- ✅ Location
- ✅ Date (start_date, end_date)
- ✅ Description
- ✅ Image (image_url)
- ✅ Target Amount (goal_amount)
- ✅ Raised Amount (current_amount)
- ✅ Status (active, paused, completed, pending)

**You can manage these fields for Donations:**
- ✅ Donor Name
- ✅ Donor Email
- ✅ Donor Phone
- ✅ Amount
- ✅ Payment Status (pending, completed, failed, refunded)
- ✅ Project (which project the donation is for)
- ✅ Message
- ✅ Transaction ID

**Everything is ready in your SQL schema!** Just run the `supabase-complete-schema.sql` file and you'll have full admin control over projects and donations.

---

## 🚀 Next Steps

1. ✅ Run `supabase-complete-schema.sql` in Supabase SQL Editor
2. ✅ Create your admin user (see `ADMIN_SETUP_GUIDE.md`)
3. ✅ Start managing projects and donations!
4. 📱 Build admin UI (optional - or use SQL directly)

All the fields you need are already in the database schema! 🎉
