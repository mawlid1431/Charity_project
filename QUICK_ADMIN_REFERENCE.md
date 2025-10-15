# 🎯 Quick Admin Reference - Projects & Donations

## 📋 PROJECTS - What You Can Manage

```
┌─────────────────────────────────────────────────────────┐
│                    PROJECT FIELDS                        │
├─────────────────────────────────────────────────────────┤
│ ✏️  Project Name        → title                         │
│ 📍 Location             → location                       │
│ 📅 Date                 → start_date, end_date          │
│ 📝 Description          → description                    │
│ 🖼️  Image               → image_url                     │
│ 💰 Target Amount ($)    → goal_amount                   │
│ 💵 Raised Amount ($)    → current_amount                │
│ 🔄 Status               → active / paused / completed   │
└─────────────────────────────────────────────────────────┘
```

---

## ✅ ADD NEW PROJECT (Copy & Paste to SQL Editor)

```sql
INSERT INTO projects (
  title,              -- Project Name
  location,           -- Location
  start_date,         -- Date
  description,        -- Description
  image_url,          -- Image URL
  goal_amount,        -- Target Amount
  current_amount,     -- Raised Amount (start with 0)
  status,             -- active / paused / completed
  category            -- Category
) VALUES (
  'Your Project Name Here',
  'Project Location Here',
  '2024-03-01',
  'Your project description here...',
  'https://images.unsplash.com/photo-1234567890?w=800',
  50000,
  0,
  'active',
  'Education'
);
```

---

## 🔄 CHANGE PROJECT STATUS

```sql
-- Make Active
UPDATE projects SET status = 'active' WHERE title = 'Your Project Name';

-- Pause Project
UPDATE projects SET status = 'paused' WHERE title = 'Your Project Name';

-- Mark Completed
UPDATE projects SET status = 'completed' WHERE title = 'Your Project Name';
```

---

## 📊 VIEW ALL PROJECTS

```sql
SELECT 
  title as "Project Name",
  location as "Location",
  start_date as "Date",
  goal_amount as "Target ($)",
  current_amount as "Raised ($)",
  status as "Status"
FROM projects
ORDER BY created_at DESC;
```

---

## 💰 DONATIONS - What You Can Manage

```
┌─────────────────────────────────────────────────────────┐
│                   DONATION FIELDS                        │
├─────────────────────────────────────────────────────────┤
│ 👤 Donor Name           → donor_name                    │
│ 📧 Donor Email          → donor_email                   │
│ 📱 Donor Phone          → donor_phone                   │
│ 💵 Amount               → amount                        │
│ 📝 Message              → message                       │
│ 🔄 Payment Status       → pending / completed / failed  │
│ 🎯 Project              → project_id                    │
│ 💳 Transaction ID       → transaction_id                │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 VIEW ALL DONATIONS

```sql
SELECT 
  donor_name as "Donor",
  donor_email as "Email",
  amount as "Amount ($)",
  payment_status as "Status",
  created_at as "Date",
  p.title as "Project"
FROM donations d
LEFT JOIN projects p ON d.project_id = p.id
ORDER BY d.created_at DESC;
```

---

## ✅ UPDATE DONATION STATUS

```sql
-- Mark as Completed
UPDATE donations 
SET payment_status = 'completed' 
WHERE donor_email = 'donor@example.com';

-- Mark as Failed
UPDATE donations 
SET payment_status = 'failed' 
WHERE id = 'donation-id-here';
```

---

## 🎯 QUICK ACTIONS

### See Active Projects Only
```sql
SELECT * FROM projects WHERE status = 'active';
```

### See Completed Donations Only
```sql
SELECT * FROM donations WHERE payment_status = 'completed';
```

### Total Raised for All Projects
```sql
SELECT SUM(amount) as "Total Raised ($)" 
FROM donations 
WHERE payment_status = 'completed';
```

### Donations for Specific Project
```sql
SELECT donor_name, amount, created_at
FROM donations
WHERE project_id = (SELECT id FROM projects WHERE title = 'Your Project Name')
ORDER BY created_at DESC;
```

---

## 🚀 READY TO USE!

1. Open Supabase: https://hohzrasvjvkmgyirxbht.supabase.co
2. Go to **SQL Editor**
3. Copy the SQL from `supabase-complete-schema.sql`
4. Click **Run**
5. Start managing projects and donations!

**All fields you need are ready! ✅**
