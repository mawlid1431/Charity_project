# 🌟 Mubarak Charity Website

A modern, professional charity website built with React, TypeScript, Tailwind CSS, and Supabase.

## ✨ Features

- 🎨 Modern, responsive design with dark mode
- 📊 Real-time project tracking with progress bars
- 💰 Donation management system
- 🎛️ Admin dashboard for managing projects and donations
- 📸 Image upload to Supabase Storage
- 🔐 Row Level Security (RLS) for data protection
- ⚡ Fast and optimized with Vite

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Supabase account

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd mubarak-charity-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
# Copy .env.example to .env
cp .env.example .env

# Edit .env with your Supabase credentials
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Setup database**
```bash
# Go to Supabase Dashboard → SQL Editor
# Copy and run: COPY_THIS_TO_SUPABASE.sql
# Then run: FIX_STORAGE_POLICIES.sql
```

5. **Start development server**
```bash
npm run dev
```

6. **Open in browser**
```
http://localhost:5173
```

## 📊 Database Setup

### Step 1: Run Main Schema
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click **SQL Editor** → **New Query**
3. Copy contents of `COPY_THIS_TO_SUPABASE.sql`
4. Click **Run**

### Step 2: Fix Storage Policies
1. In SQL Editor, create **New Query**
2. Copy contents of `FIX_STORAGE_POLICIES.sql`
3. Click **Run**

This creates:
- ✅ `projects` table
- ✅ `donations` table
- ✅ `project-images` storage bucket
- ✅ Sample data
- ✅ RLS policies

## 🎛️ Admin Dashboard

Access the admin dashboard at `/admin`

**Features:**
- Create, edit, and delete projects
- Upload project images
- View all donations
- Search and filter donations
- Live statistics dashboard

## 📁 Project Structure

```
mubarak-charity-website/
├── components/          # React components
│   ├── admin/          # Admin dashboard components
│   ├── DonationForm.tsx
│   ├── ProjectCard.tsx
│   └── ...
├── pages/              # Page components
│   ├── HomePage.tsx
│   ├── ProjectsPage.tsx
│   ├── DonatePage.tsx
│   └── AdminPage.tsx
├── utils/              # Utility functions
│   └── supabase/       # Supabase client and helpers
├── styles/             # Global styles
├── .env                # Environment variables (not in git)
├── .env.example        # Environment template
├── COPY_THIS_TO_SUPABASE.sql  # Database schema
└── FIX_STORAGE_POLICIES.sql   # Storage policies fix
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Build
npm run build        # Build for production
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint
```

## 🌐 Pages

- **/** - Homepage with featured projects
- **/projects** - All active projects
- **/donate** - Donation form
- **/about** - About the charity
- **/contact** - Contact form
- **/admin** - Admin dashboard

## 🔐 Environment Variables

Required variables in `.env`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 🗄️ Database Schema

### Projects Table
- `id` - UUID (Primary Key)
- `name` - Project name
- `location` - Project location
- `date` - Start date
- `description` - Project description
- `image` - Image URL
- `target_amount` - Fundraising goal
- `raised_amount` - Amount raised
- `status` - active | paused | completed

### Donations Table
- `id` - UUID (Primary Key)
- `project_id` - Foreign key to projects
- `donor_name` - Donor's name
- `donor_email` - Donor's email
- `amount` - Donation amount
- `payment_status` - pending | completed | failed
- `created_at` - Timestamp

## 🎨 Tech Stack

- **Frontend:** React 18, TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage
- **Build Tool:** Vite
- **Notifications:** Sonner

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Environment variables for sensitive data
- Secure image upload to Supabase Storage
- Input validation on forms

## 🐛 Troubleshooting

### App not loading?
1. Check browser console (F12) for errors
2. Verify `.env` file exists with correct values
3. Ensure database schema is run in Supabase
4. Try clearing cache: `rm -rf node_modules .vite && npm install`

### Images not uploading?
1. Run `FIX_STORAGE_POLICIES.sql` in Supabase
2. Verify `project-images` bucket exists
3. Check file size (max 5MB)
4. Check file type (JPG, PNG, GIF only)

### No projects showing?
1. Verify SQL schema was run
2. Check Supabase Table Editor for data
3. Check browser console for API errors
4. Verify RLS policies allow public read

## 📝 License

MIT License - feel free to use this project for your own charity!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ for making a difference**
