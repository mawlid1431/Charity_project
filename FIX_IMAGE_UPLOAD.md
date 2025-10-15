# 🔧 Fix Image Upload Issue

## ✅ Issue Found: Row Level Security Policy

The error `new row violates row-level security policy` means the storage bucket policies are too strict.

---

## 🚀 Quick Fix (2 Steps):

### Step 1: Run This SQL

Go to Supabase SQL Editor and run:

```sql
-- Drop existing policies
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete images" ON storage.objects;

-- Create new policies that allow anyone to upload
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'project-images' );

CREATE POLICY "Anyone can upload images"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'project-images' );

CREATE POLICY "Anyone can update images"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'project-images' );

CREATE POLICY "Anyone can delete images"
ON storage.objects FOR DELETE
USING ( bucket_id = 'project-images' );
```

**OR** just copy and run: `FIX_STORAGE_POLICIES.sql`

### Step 2: Try Uploading Again

1. Go to your admin dashboard
2. Click "Add Project"
3. Upload an image
4. Should work now! ✅

---

## 📊 What This Does:

**Before:**
- Only authenticated users could upload
- You weren't logged in via Supabase Auth
- Upload failed with RLS error

**After:**
- Anyone can upload to project-images bucket
- Upload works without authentication
- You can add proper auth later

---

## 🔐 Security Note:

**Current Setup:**
- ✅ Anyone can upload images
- ⚠️ No authentication required
- ⚠️ Anyone could upload if they know the bucket name

**For Production:**
You should add proper authentication:
1. Set up Supabase Auth
2. Require login for admin
3. Update policies to check `auth.uid()`

**For Now:**
This is fine for development and testing!

---

## ✅ Verify It Works:

### Test Upload:
```
1. Go to /admin
2. Click "Add Project"
3. Click upload area
4. Select an image
5. Fill other fields
6. Click "Create Project"
7. Should upload successfully!
```

### Check Storage:
```
1. Go to Supabase Dashboard
2. Click "Storage"
3. Click "project-images" bucket
4. Should see your uploaded image
```

---

## 🆘 Still Not Working?

### Check These:

**1. Bucket Exists:**
```sql
SELECT * FROM storage.buckets WHERE id = 'project-images';
-- Should return 1 row
```

**2. Policies Applied:**
```sql
SELECT * FROM pg_policies WHERE tablename = 'objects';
-- Should show 4 policies for project-images
```

**3. Browser Console:**
```
F12 → Console
Should not show RLS error anymore
```

---

## 🎯 Alternative: Use Image URLs

If you don't want to fix storage policies right now, you can:

1. Upload images to Unsplash, Imgur, or any image host
2. Copy the image URL
3. Use URL instead of uploading

**Good free image sources:**
- Unsplash: https://unsplash.com
- Pexels: https://pexels.com
- Pixabay: https://pixabay.com

---

## 📝 Summary:

**Problem:** Storage RLS policies too strict
**Solution:** Run `FIX_STORAGE_POLICIES.sql`
**Result:** Image upload works! ✅

**Run the SQL and try uploading again! 🚀**
