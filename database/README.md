# 📊 Database Setup Files

This folder contains SQL scripts for setting up and maintaining your Supabase database.

## Files

### 1. `setup.sql` (formerly COPY_THIS_TO_SUPABASE.sql)
**Purpose:** Complete database setup script

**What it does:**
- Creates `projects` table with all required fields
- Sets up Row Level Security (RLS) policies
- Creates `project-images` storage bucket
- Configures upload/download permissions
- Adds sample project data for testing
- Sets up auto-update triggers

**When to run:**
- ✅ First time setup
- ✅ After database reset
- ✅ New environment (staging/production)
- ✅ Database corruption recovery

**How to run:**
1. Open [Supabase Dashboard](https://supabase.com/dashboard)
2. Go to SQL Editor (left sidebar)
3. Click "New Query"
4. Copy entire contents of `setup.sql`
5. Paste and click "Run" (or Ctrl+Enter)

---

### 2. `fix-storage.sql` (formerly FIX_STORAGE_POLICIES.sql)
**Purpose:** Fix image upload and storage issues

**What it does:**
- Repairs storage bucket permissions
- Enables public image access
- Fixes upload/update/delete policies
- Resolves "permission denied" errors

**When to run:**
- ❌ Image uploads fail
- ❌ Images don't display publicly
- ❌ "Permission denied" errors
- ❌ Storage bucket issues

**How to run:**
1. Open [Supabase Dashboard](https://supabase.com/dashboard)
2. Go to SQL Editor
3. Click "New Query"
4. Copy entire contents of `fix-storage.sql`
5. Paste and click "Run"

---

## Database Schema

### Projects Table
```sql
projects (
  id                UUID PRIMARY KEY
  name              TEXT NOT NULL
  location          TEXT NOT NULL
  date              DATE NOT NULL
  description       TEXT NOT NULL
  image             TEXT NOT NULL
  target_amount     NUMERIC(12,2) NOT NULL
  raised_amount     NUMERIC(12,2) NOT NULL
  donation_link     TEXT
  status            TEXT NOT NULL (active/paused/completed)
  created_at        TIMESTAMP
  updated_at        TIMESTAMP
)
```

### Storage Bucket
- **Name:** `project-images`
- **Public:** Yes
- **Allowed file types:** Images (JPG, PNG, GIF)
- **Max file size:** 5MB

---

## Troubleshooting

### Issue: "Table already exists"
**Solution:** The table is already created. No action needed.

### Issue: "Permission denied for storage"
**Solution:** Run `fix-storage.sql`

### Issue: "Cannot insert into projects"
**Solution:** Check RLS policies. Re-run `setup.sql`

### Issue: Images not uploading
**Solution:** 
1. Run `fix-storage.sql`
2. Check file size (max 5MB)
3. Verify file type (images only)

---

## Production Deployment

When deploying to production:

1. **Create new Supabase project** for production
2. **Run `setup.sql`** in production database
3. **Update environment variables** in `.env`:
   ```env
   VITE_SUPABASE_URL=your_production_url
   VITE_SUPABASE_ANON_KEY=your_production_key
   ```
4. **Test thoroughly** before going live
5. **Remove sample data** if not needed

---

## Backup & Recovery

### Creating a Backup
1. Go to Supabase Dashboard → Database → Backups
2. Click "Create Backup"
3. Download backup file

### Restoring from Backup
1. Delete existing tables (if needed)
2. Run `setup.sql` to recreate structure
3. Import your backup data

---

## Important Notes

⚠️ **DO NOT DELETE THESE FILES**
- They are essential for database setup
- Needed for disaster recovery
- Required for team members
- Used in production deployment

✅ **Keep these files in version control**
- They contain no sensitive data
- Document your database structure
- Help with collaboration

🔒 **Security**
- These files contain no passwords
- No API keys or secrets
- Safe to commit to Git
- Safe to share with team

---

**Last Updated:** January 2025
