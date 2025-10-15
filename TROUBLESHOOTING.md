# 🔧 Troubleshooting Guide

## ✅ Fixed: Toaster Component Added

The app wasn't showing toast notifications because the Toaster component was missing. This has been fixed!

---

## 🚀 How to Run Your App:

### Step 1: Make Sure SQL is Run
```
1. Go to Supabase: https://hohzrasvjvkmgyirxbht.supabase.co
2. Click "SQL Editor"
3. Run COPY_THIS_TO_SUPABASE.sql
4. Verify tables exist in "Table Editor"
```

### Step 2: Start the App
```bash
npm run dev
```

### Step 3: Open in Browser
```
Your app is running on: http://localhost:5174
(Port 5173 was in use, so it's using 5174)
```

---

## 🔍 Common Issues & Solutions:

### Issue 1: "Can't see anything" / Blank Page

**Possible Causes:**
1. JavaScript errors in console
2. Missing environment variables
3. Database not set up
4. Build errors

**Solutions:**

**A. Check Browser Console:**
```
1. Open browser (Chrome/Firefox)
2. Press F12 to open DevTools
3. Click "Console" tab
4. Look for red errors
5. Share the errors if you see any
```

**B. Verify .env File:**
```bash
# Check if .env exists
cat .env

# Should show:
VITE_SUPABASE_URL=https://hohzrasvjvkmgyirxbht.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

**C. Restart Dev Server:**
```bash
# Stop the server (Ctrl+C)
# Start again
npm run dev
```

**D. Clear Cache:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
npm run dev
```

---

### Issue 2: "No projects showing"

**Possible Causes:**
1. SQL not run in Supabase
2. No data in database
3. RLS policies blocking access

**Solutions:**

**A. Check Database:**
```
1. Go to Supabase Dashboard
2. Click "Table Editor"
3. Click "projects" table
4. Should see sample projects
```

**B. Run SQL Again:**
```
1. Go to SQL Editor
2. Copy COPY_THIS_TO_SUPABASE.sql
3. Paste and Run
4. Check for errors
```

**C. Check Browser Console:**
```
Look for errors like:
- "Failed to fetch"
- "Network error"
- "Permission denied"
```

---

### Issue 3: "Donations not saving"

**Possible Causes:**
1. RLS policies too strict
2. Missing fields
3. Network error

**Solutions:**

**A. Check Console:**
```
Open DevTools → Console
Look for errors when clicking "Donate Now"
```

**B. Test in Supabase:**
```sql
-- Try inserting directly in SQL Editor
INSERT INTO donations (donor_name, donor_email, amount, payment_status, payment_method)
VALUES ('Test User', 'test@example.com', 100, 'completed', 'online');
```

**C. Check RLS Policies:**
```sql
-- Verify policy exists
SELECT * FROM pg_policies WHERE tablename = 'donations';
```

---

### Issue 4: "Images not uploading"

**Possible Causes:**
1. Storage bucket not created
2. File too large
3. Wrong file type

**Solutions:**

**A. Check Storage Bucket:**
```
1. Go to Supabase → Storage
2. Should see "project-images" bucket
3. If not, run SQL again
```

**B. Check File Size:**
```
Max size: 5MB
Supported: JPG, PNG, GIF
```

**C. Check Console:**
```
Look for upload errors in DevTools
```

---

### Issue 5: "Admin can't login"

**Possible Causes:**
1. No admin user created
2. Wrong credentials
3. localStorage issue

**Solutions:**

**A. Create Admin User:**
```
1. Go to Supabase → Authentication → Users
2. Click "Add user"
3. Enter email and password
4. Check "Auto Confirm User"
5. Click "Create user"
```

**B. Clear localStorage:**
```javascript
// In browser console
localStorage.clear();
// Then try logging in again
```

---

### Issue 6: Port Already in Use

**Error:**
```
Port 5173 is in use, trying another one...
```

**Solution:**
```
This is normal! The app will use port 5174 instead.
Just go to: http://localhost:5174
```

**Or kill the process:**
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5173 | xargs kill -9
```

---

## 🔍 Debugging Steps:

### Step 1: Check if App is Running
```bash
npm run dev

# Should see:
✓ VITE ready in XXX ms
➜ Local: http://localhost:5174/
```

### Step 2: Open Browser
```
Go to: http://localhost:5174
```

### Step 3: Open DevTools
```
Press F12
Check Console tab for errors
Check Network tab for failed requests
```

### Step 4: Check Database
```
1. Go to Supabase Dashboard
2. Table Editor → projects
3. Should see data
```

### Step 5: Test Each Page
```
✓ Homepage: http://localhost:5174/
✓ Projects: http://localhost:5174/projects
✓ Donate: http://localhost:5174/donate
✓ Admin: http://localhost:5174/admin
```

---

## 📊 What to Check:

### Files:
- [ ] `.env` exists with correct values
- [ ] `node_modules` installed
- [ ] No TypeScript errors
- [ ] No build errors

### Database:
- [ ] SQL file run in Supabase
- [ ] Tables exist (projects, donations)
- [ ] Sample data inserted
- [ ] Storage bucket created

### Browser:
- [ ] No console errors
- [ ] Network requests succeed
- [ ] Pages load correctly
- [ ] Images display

---

## 🆘 Still Not Working?

### Collect Information:

**1. Browser Console Errors:**
```
F12 → Console → Copy any red errors
```

**2. Network Errors:**
```
F12 → Network → Look for failed requests (red)
```

**3. Terminal Output:**
```
Copy the output from npm run dev
```

**4. Database Status:**
```
Check if tables exist in Supabase
```

### Share This Info:
- Browser console errors
- Network tab errors
- Terminal output
- Which page is not working
- What you see (blank page, error message, etc.)

---

## ✅ Quick Fixes:

### Fix 1: Restart Everything
```bash
# Stop server (Ctrl+C)
# Clear cache
rm -rf node_modules .vite
# Reinstall
npm install
# Start again
npm run dev
```

### Fix 2: Check Environment
```bash
# Verify .env
cat .env

# Should have:
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

### Fix 3: Rebuild
```bash
npm run build
npm run preview
```

### Fix 4: Check Supabase
```
1. Go to Supabase Dashboard
2. Check if project is active
3. Check if tables exist
4. Check if RLS is enabled
```

---

## 📝 Checklist:

Before asking for help, verify:

- [ ] Ran `npm install`
- [ ] Ran `npm run dev`
- [ ] `.env` file exists
- [ ] SQL file run in Supabase
- [ ] Tables exist in database
- [ ] Browser console checked
- [ ] Network tab checked
- [ ] Tried different browser
- [ ] Cleared cache
- [ ] Restarted dev server

---

## 🎯 Expected Behavior:

### Homepage Should Show:
- ✅ Hero section with images
- ✅ 3 featured projects
- ✅ Progress bars
- ✅ Statistics
- ✅ Categories

### Projects Page Should Show:
- ✅ Grid of all projects
- ✅ Project cards with images
- ✅ Progress bars
- ✅ Click to view details

### Donate Page Should Show:
- ✅ Donation form
- ✅ Preset amounts
- ✅ Custom amount field
- ✅ Name and email fields
- ✅ Submit button

### Admin Page Should Show:
- ✅ Login form (if not logged in)
- ✅ Dashboard with stats
- ✅ Projects tab
- ✅ Donations tab
- ✅ Add/Edit/Delete buttons

---

## 🔧 Advanced Debugging:

### Check Vite Config:
```bash
cat vite.config.ts
```

### Check TypeScript:
```bash
npx tsc --noEmit
```

### Check Build:
```bash
npm run build
# Should complete without errors
```

### Check Dependencies:
```bash
npm list
# Look for missing or conflicting packages
```

---

## 💡 Tips:

1. **Always check browser console first**
2. **Verify database has data**
3. **Test in incognito mode** (rules out cache issues)
4. **Try different browser** (rules out browser-specific issues)
5. **Check Supabase status** (supabase.com/status)

---

**If you're still having issues, share:**
1. Browser console errors (screenshot)
2. What you see on the page
3. Which page is not working
4. Terminal output from `npm run dev`

I'll help you fix it! 🚀
