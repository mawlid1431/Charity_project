# 🔧 Fix Image Upload Error - Step by Step

## ❌ The Error You're Seeing:
```
StorageApiError: new row violates row-level security policy
```

This means the storage bucket policies are blocking your uploads.

---

## ✅ Solution: Run This SQL File

### Option 1: Simple Fix (Recommended for Testing)
**File:** `FIX_STORAGE_SIMPLE.sql`

This allows **anyone** to upload images (less secure, but works immediately).

### Option 2: Secure Fix (For Production)
**File:** `FIX_STORAGE_POLICIES.sql`

This only allows **authenticated admins** to upload (more secure, but requires proper login).

---

## 📋 Step-by-Step Instructions:

### 1. Open Supabase Dashboard
- Go to https://supabase.com
- Login to your account
- Select your project: `hohzrasvjvkmgyirxbht`

### 2. Open SQL Editor
- Click **"SQL Editor"** in the left sidebar
- Click **"New Query"** button

### 3. Copy & Paste SQL
**For Quick Fix (Testing):**
- Open `FIX_STORAGE_SIMPLE.sql`
- Select ALL (Ctrl+A)
- Copy (Ctrl+C)
- Paste into Supabase SQL Editor (Ctrl+V)

**OR for Secure Fix (Production):**
- Open `FIX_STORAGE_POLICIES.sql`
- Select ALL (Ctrl+A)
- Copy (Ctrl+C)
- Paste into Supabase SQL Editor (Ctrl+V)

### 4. Run the SQL
- Click **"Run"** button (or press Ctrl+Enter)
- Wait 3-5 seconds
- Look for success message

### 5. Verify Storage Buckets
- Go to **"Storage"** in left sidebar
- You should see 3 buckets:
  - `project-images`
  - `donation-images`
  - `team-images`
- Click on each bucket
- Check that they're marked as **"Public"**

### 6. Test Upload
- Go back to your website `/admin`
- Try uploading an image
- Should work now! ✅

---

## 🔍 If It Still Doesn't Work:

### Check 1: Are You Logged In?
Make sure you're logged into the admin dashboard:
- Email: `admin@mubcharity.com`
- Password: `@charityadmin.com`

### Check 2: Check Browser Console
Open browser DevTools (F12) and look for errors.

### Check 3: Verify Buckets Exist
In Supabase Dashboard → Storage:
- All 3 buckets should exist
- All should be marked "Public"
- Click "Policies" tab to see if policies are there

### Check 4: Check Supabase Logs
In Supabase Dashboard → Logs:
- Look for storage errors
- Check what's being blocked

---

## 🎯 What Each SQL File Does:

### FIX_STORAGE_SIMPLE.sql
```
✓ Removes all old policies
✓ Creates new policies that allow ANYONE to upload
✓ Good for testing/development
✓ Less secure (anyone can upload)
```

### FIX_STORAGE_POLICIES.sql
```
✓ Removes all old policies
✓ Creates new policies that only allow AUTHENTICATED users
✓ Good for production
✓ More secure (only logged-in admins can upload)
```

### COMPLETE_DATABASE_SETUP.sql
```
✓ Creates all tables
✓ Creates storage buckets
✓ Creates storage policies (authenticated only)
✓ Adds sample data
✓ Complete setup in one file
```

---

## 💡 Quick Troubleshooting:

### Error: "bucket does not exist"
**Solution:** Run `COMPLETE_DATABASE_SETUP.sql` first

### Error: "policy already exists"
**Solution:** The SQL files drop old policies first, so just run them again

### Error: "permission denied"
**Solution:** Make sure you're logged into Supabase as the project owner

### Error: Still getting 400 error
**Solution:** 
1. Run `FIX_STORAGE_SIMPLE.sql` (allows all uploads)
2. Test if upload works
3. If yes, the issue was authentication
4. If no, check Supabase logs for more details

---

## 🚀 Recommended Steps (In Order):

1. ✅ Run `FIX_STORAGE_SIMPLE.sql` (quick fix)
2. ✅ Test image upload in `/admin`
3. ✅ If it works, you're done!
4. ✅ Later, run `FIX_STORAGE_POLICIES.sql` for better security

---

## 📞 Still Having Issues?

If uploads still fail after running the SQL:

1. **Check Supabase Dashboard → Storage → Policies**
   - Should see policies for each bucket
   - Should show "Public" or "Authenticated" access

2. **Check Browser Network Tab (F12)**
   - Look at the failed request
   - Check the response body for error details

3. **Try Manual Upload in Supabase**
   - Go to Storage → project-images
   - Try uploading a file manually
   - If this fails, there's a bucket configuration issue

4. **Verify .env File**
   - Make sure `VITE_SUPABASE_URL` is correct
   - Make sure `VITE_SUPABASE_ANON_KEY` is correct
   - Restart your dev server after changing .env

---

## ✅ Success Checklist:

- [ ] Ran SQL file in Supabase
- [ ] Saw success message
- [ ] Verified 3 storage buckets exist
- [ ] Buckets are marked as "Public"
- [ ] Policies exist for each bucket
- [ ] Tested upload in `/admin`
- [ ] Image uploaded successfully
- [ ] Image displays correctly

---

**Try running `FIX_STORAGE_SIMPLE.sql` now and let me know if it works!** 🚀
