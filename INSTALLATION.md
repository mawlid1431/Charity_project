# 📦 Installation Guide - Mubarak Charity Website

Complete step-by-step installation guide for setting up the Mubarak Charity website on your local machine.

---

## Table of Contents

1. [System Requirements](#system-requirements)
2. [Installation Steps](#installation-steps)
3. [Supabase Setup](#supabase-setup)
4. [Environment Configuration](#environment-configuration)
5. [Running the Application](#running-the-application)
6. [Troubleshooting](#troubleshooting)
7. [Deployment](#deployment)

---

## System Requirements

### Minimum Requirements

- **Operating System**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 20.04+)
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 9.0.0 or higher (comes with Node.js)
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 500MB free space for dependencies

### Recommended Software

- **Code Editor**: VS Code with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript and JavaScript Language Features
- **Browser**: Chrome, Firefox, Safari, or Edge (latest version)
- **Git**: For version control

---

## Installation Steps

### Step 1: Check Prerequisites

First, verify that Node.js and npm are installed:

```bash
node --version
# Should show v18.0.0 or higher

npm --version
# Should show v9.0.0 or higher
```

If not installed, download from [nodejs.org](https://nodejs.org/)

### Step 2: Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/yourusername/mubarak-charity-website.git

# OR using SSH
git clone git@github.com:yourusername/mubarak-charity-website.git

# Navigate into the project directory
cd mubarak-charity-website
```

### Step 3: Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`. The installation may take 2-5 minutes depending on your internet speed.

**Expected output:**
```
added 245 packages, and audited 246 packages in 2m
```

### Step 4: Verify Installation

Check that all dependencies are installed correctly:

```bash
npm list --depth=0
```

You should see all the main dependencies without errors.

---

## Supabase Setup

### Step 1: Create Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub, Google, or email
4. Verify your email address

### Step 2: Create a New Project

1. Click "New Project"
2. Fill in the project details:
   - **Name**: `mubarak-charity-website`
   - **Database Password**: Create a strong password (save it securely!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier is sufficient for development
3. Click "Create new project"
4. Wait 2-3 minutes for project setup

### Step 3: Get API Keys

1. In your Supabase project dashboard, click "Settings" (gear icon)
2. Navigate to "API" section
3. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (starts with `eyJhbGc...`)
   - **service_role** key (also starts with `eyJhbGc...`)

⚠️ **Important**: Never share or commit the service_role key!

### Step 4: Database Setup

The application will automatically create the necessary database structure when you first run it. No manual SQL is needed!

---

## Environment Configuration

### Step 1: Create Environment File

In the root directory of the project, create a new file named `.env`:

```bash
# On macOS/Linux
touch .env

# On Windows (Command Prompt)
type nul > .env

# On Windows (PowerShell)
New-Item .env
```

### Step 2: Add Environment Variables

Open `.env` in your code editor and add the following:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: For development only
VITE_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

Replace the placeholder values with your actual Supabase credentials from Step 3 above.

### Step 3: Verify Environment File

Create a test file to verify environment variables are loaded:

```bash
npm run dev
```

Check the browser console - you should not see any Supabase connection errors.

---

## Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

**Expected output:**
```
VITE v6.0.1  ready in 423 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Open your browser and navigate to `http://localhost:5173`

### Build for Production

Create an optimized production build:

```bash
npm run build
```

This creates a `dist` folder with optimized files.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Linting

Check code quality:

```bash
npm run lint
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use

**Error**: `Port 5173 is already in use`

**Solution**:
```bash
# Kill the process using port 5173
# On macOS/Linux:
lsof -ti:5173 | xargs kill -9

# On Windows:
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F
```

#### 2. Dependencies Installation Failed

**Error**: `npm ERR! code ERESOLVE`

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### 3. Supabase Connection Error

**Error**: `Invalid Supabase URL`

**Solution**:
- Check `.env` file exists in root directory
- Verify URL format: `https://xxxxx.supabase.co`
- Ensure no extra spaces or quotes
- Restart development server after changing `.env`

#### 4. TypeScript Errors

**Error**: Type errors during development

**Solution**:
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Update TypeScript
npm install typescript@latest --save-dev
```

#### 5. Tailwind Styles Not Working

**Error**: Styles not applying

**Solution**:
- Check `globals.css` is imported in `App.tsx`
- Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)
- Verify Tailwind CSS v4 is installed correctly

#### 6. Image Loading Issues

**Error**: Images not displaying

**Solution**:
- Check Unsplash API is accessible
- Verify internet connection
- Check browser console for CORS errors
- Replace Unsplash URLs with local images if needed

---

## Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Add Environment Variables**:
   - Go to Vercel dashboard
   - Select your project
   - Settings → Environment Variables
   - Add all variables from `.env`

### Deploy to Netlify

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project**:
   ```bash
   npm run build
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

4. **Add Environment Variables**:
   - Go to Netlify dashboard
   - Site settings → Build & deploy → Environment
   - Add all variables from `.env`

### Deploy to Custom Server

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Copy the `dist` folder** to your server

3. **Configure your web server** (nginx, Apache, etc.) to serve the `dist` folder

4. **Set environment variables** on the server

---

## Post-Installation Checklist

After successful installation, verify:

- [ ] Application runs without errors (`npm run dev`)
- [ ] All pages load correctly
- [ ] Navigation works smoothly
- [ ] Dark mode toggle functions
- [ ] Forms submit successfully (check Supabase dashboard)
- [ ] Images load properly
- [ ] Animations play smoothly
- [ ] Mobile responsive layout works
- [ ] WhatsApp button links correctly
- [ ] No console errors in browser

---

## Updating the Application

### Update Dependencies

Check for updates:
```bash
npm outdated
```

Update all dependencies:
```bash
npm update
```

Update specific package:
```bash
npm install package-name@latest
```

### Pull Latest Changes

```bash
git pull origin main
npm install  # Install any new dependencies
```

---

## Getting Help

If you encounter issues not covered in this guide:

1. **Check the main README.md** for additional documentation
2. **Search GitHub Issues**: [Project Issues](https://github.com/yourusername/mubarak-charity-website/issues)
3. **Create a new issue** with:
   - Your operating system
   - Node.js version
   - Error messages
   - Steps to reproduce
4. **Contact support**: info@mubarakcharity.org

---

## Next Steps

After successful installation:

1. **Customize Content**:
   - Update project information
   - Add team members
   - Update contact details
   - Replace placeholder images

2. **Configure WhatsApp**:
   - Update phone number in `components/WhatsAppButton.tsx`

3. **Set Up Payment Processing**:
   - Integrate Stripe or PayPal
   - Update donation form

4. **Test Thoroughly**:
   - Test all forms
   - Check all links
   - Verify mobile responsiveness
   - Test in multiple browsers

5. **Deploy to Production**:
   - Follow deployment guide above
   - Set up custom domain
   - Configure SSL certificate

---

**Installation Complete! 🎉**

You're now ready to start developing or customizing the Mubarak Charity website.

For questions or support, reach out to the development team.

**Last Updated**: December 2024
