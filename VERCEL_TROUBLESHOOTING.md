# Vercel Deployment Troubleshooting

## Admin Login Not Working - "Not Available" Error

### Problem
Admin login shows "not available" or environment variables are undefined.

### Solution
Environment variables must be added in Vercel Dashboard:

1. Go to your Vercel project
2. Navigate to **Settings** → **Environment Variables**
3. Add ALL these variables:

```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_SUPABASE_SERVICE_ROLE_KEY
VITE_ADMIN_EMAIL
VITE_ADMIN_PASSWORD
```

4. Select all environments (Production, Preview, Development)
5. Save and **Redeploy**

### Important Notes
- Environment variables are NOT automatically copied from your local `.env` file
- You must manually add them in Vercel Dashboard
- After adding/changing variables, you MUST redeploy
- Variable names are case-sensitive and must start with `VITE_`

## Sentry Error (ERR_BLOCKED_BY_CLIENT)

### Problem
Console shows Sentry errors: `POST https://lucid.thereadme.com/api/39/envelope/`

### Solution
This is usually caused by browser ad blockers blocking Sentry. This is harmless and doesn't affect functionality.

To fix:
1. Disable ad blocker for your site
2. Or remove Sentry integration if not needed

## Environment Variables Not Loading

### Check List
✅ Variables start with `VITE_` prefix
✅ Variables added in Vercel Dashboard (not just local .env)
✅ All environments selected when adding variables
✅ Redeployed after adding variables
✅ No typos in variable names
✅ Values don't have extra spaces

### Test Environment Variables
Add this temporarily to your code to debug:

```typescript
console.log('Admin Email:', import.meta.env.VITE_ADMIN_EMAIL);
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
```

If these show `undefined`, variables aren't set in Vercel.

## Build Fails

### Common Causes
1. Missing dependencies in package.json
2. TypeScript errors
3. Import path issues
4. Node version mismatch

### Solution
Check build logs in Vercel Dashboard → Deployments → [Your Deployment] → Build Logs

## 404 Errors on Page Refresh

### Problem
Direct URLs or page refresh shows 404

### Solution
Ensure `vercel.json` has proper rewrites (already configured):

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Supabase Connection Issues

### Check List
✅ Supabase project is active
✅ Supabase URL is correct
✅ Supabase keys are correct
✅ RLS policies are configured
✅ Tables exist in database

### Test Connection
```typescript
import { supabase } from './utils/supabase/client';

// Test connection
const { data, error } = await supabase.from('donations').select('count');
console.log('Connection test:', { data, error });
```

## Admin Credentials

### Default Credentials (from .env)
- Email: `admin@mubcharity.com`
- Password: `@charityadmin.com`

### Security Recommendations
1. Change default credentials in production
2. Use strong passwords
3. Consider implementing proper authentication (OAuth, JWT)
4. Never commit .env file to git
5. Rotate credentials regularly

## Quick Deployment Checklist

Before deploying:
- [ ] All code committed and pushed to Git
- [ ] Environment variables ready
- [ ] Build works locally (`npm run build`)
- [ ] No TypeScript errors
- [ ] Supabase database configured
- [ ] SQL schema applied (COPY_THIS_TO_SUPABASE.sql)

After deploying:
- [ ] Add environment variables in Vercel
- [ ] Redeploy after adding variables
- [ ] Test admin login
- [ ] Test donation form
- [ ] Test all pages
- [ ] Check browser console for errors

## Getting Help

If issues persist:
1. Check Vercel build logs
2. Check browser console for errors
3. Verify environment variables are set
4. Test locally with `npm run build && npm run preview`
5. Check Supabase logs for database errors

## Useful Commands

```bash
# Test build locally
npm run build

# Preview production build
npm run preview

# Check for TypeScript errors
npx tsc --noEmit

# Deploy to Vercel (if using CLI)
vercel --prod
```
