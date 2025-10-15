# Vercel Deployment Guide

## Prerequisites
- A Vercel account (sign up at https://vercel.com)
- Your Supabase project set up and running
- Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Prepare Your Repository
1. Ensure all changes are committed:
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)
1. Go to https://vercel.com/new
2. Import your Git repository
3. Configure your project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Option B: Deploy via Vercel CLI
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. For production deployment:
   ```bash
   vercel --prod
   ```

## Step 3: Configure Environment Variables

In your Vercel project dashboard, go to **Settings > Environment Variables** and add:

### Required Variables:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `VITE_SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (for admin functions)
- `VITE_ADMIN_EMAIL` - Admin dashboard email
- `VITE_ADMIN_PASSWORD` - Admin dashboard password

### How to Add:
1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable for all environments (Production, Preview, Development)
4. Click **Save**

## Step 4: Redeploy
After adding environment variables, trigger a new deployment:
- Go to **Deployments** tab
- Click the three dots on the latest deployment
- Select **Redeploy**

## Step 5: Configure Custom Domain (Optional)
1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (can take up to 48 hours)

## Automatic Deployments
Vercel automatically deploys:
- **Production**: Every push to your main/master branch
- **Preview**: Every push to other branches and pull requests

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Environment Variables Not Working
- Make sure variables start with `VITE_` prefix
- Redeploy after adding/changing variables
- Check variable names match exactly (case-sensitive)

### 404 Errors on Routes
- Verify `vercel.json` rewrites configuration is present
- Check that SPA routing is properly configured

### Supabase Connection Issues
- Verify Supabase URL and keys are correct
- Check Supabase project is active
- Review Supabase RLS policies

## Performance Optimization
- Enable Vercel Analytics in project settings
- Use Vercel Speed Insights for performance monitoring
- Configure caching headers (already set in vercel.json)

## Security Checklist
- ✅ `.env` file is in `.gitignore`
- ✅ Environment variables set in Vercel dashboard
- ✅ Service role key never exposed in client code
- ✅ Supabase RLS policies properly configured
- ✅ Admin credentials are strong and secure

## Useful Commands
```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs [deployment-url]

# Remove a deployment
vercel rm [deployment-name]

# Link local project to Vercel
vercel link
```

## Support
- Vercel Documentation: https://vercel.com/docs
- Vercel Community: https://github.com/vercel/vercel/discussions
- Supabase Documentation: https://supabase.com/docs

## Post-Deployment
1. Test all functionality on the deployed site
2. Verify donation form works
3. Test admin dashboard access
4. Check all pages load correctly
5. Test on mobile devices
6. Monitor error logs in Vercel dashboard
