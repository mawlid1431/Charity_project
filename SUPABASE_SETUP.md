# Supabase Setup Guide

## ✅ Configuration Complete

Your Supabase database is now connected to your project!

## 📋 What Was Set Up

1. **Environment Variables** (`.env` file)
   - Supabase URL
   - Anon/Public Key
   - Service Role Key (for admin operations)

2. **Supabase Client** (`utils/supabase/client.ts`)
   - Configured and ready to use

3. **TypeScript Types** (`utils/supabase/types.ts`)
   - Database schema types for type safety

4. **Helper Functions** (`utils/supabase/helpers.ts`)
   - Pre-built functions for common operations

5. **Database Schema** (`supabase-schema.sql`)
   - SQL file to create your database tables

## 🚀 Next Steps

### 1. Create Database Tables

Go to your Supabase dashboard:
1. Navigate to: https://hohzrasvjvkmgyirxbht.supabase.co
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"
4. Copy and paste the contents of `supabase-schema.sql`
5. Click "Run" to execute the SQL

This will create:
- `projects` table
- `donations` table
- `team_members` table
- `contact_messages` table
- Indexes for performance
- Row Level Security policies
- Sample data

### 2. Verify Tables

After running the SQL:
1. Go to "Table Editor" in your Supabase dashboard
2. You should see all 4 tables listed
3. Check that sample data was inserted

### 3. Test the Connection

You can now use the Supabase client in your components:

```typescript
import { supabase } from '@/utils/supabase/client';
import { getProjects, createDonation } from '@/utils/supabase/helpers';

// Example: Fetch projects
const projects = await getProjects();

// Example: Create a donation
const donation = await createDonation({
  project_id: 'some-uuid',
  donor_name: 'John Doe',
  donor_email: 'john@example.com',
  amount: 100,
  message: 'Great cause!',
  payment_status: 'completed'
});
```

## 🔐 Security Notes

### Important: Service Role Key
- The service role key in `.env` bypasses Row Level Security
- **NEVER** use it in client-side code
- Only use it for admin operations or server-side functions
- The `.env` file is already in `.gitignore` to prevent accidental commits

### Row Level Security (RLS)
Your database has RLS enabled with these policies:
- **Projects**: Public read, authenticated write
- **Donations**: Public insert, authenticated read
- **Team Members**: Public read, authenticated write
- **Contact Messages**: Public insert, authenticated read/update

## 📁 File Structure

```
utils/supabase/
├── client.ts       # Supabase client instance
├── types.ts        # TypeScript database types
├── helpers.ts      # Helper functions for CRUD operations
├── info.tsx        # Project info (reference only)
└── index.ts        # Exports for easy imports
```

## 🔧 Usage Examples

### Fetch All Projects
```typescript
import { getProjects } from '@/utils/supabase/helpers';

const projects = await getProjects();
```

### Create a Donation
```typescript
import { createDonation } from '@/utils/supabase/helpers';

const donation = await createDonation({
  project_id: projectId,
  donor_name: name,
  donor_email: email,
  amount: amount,
  payment_status: 'completed'
});
```

### Submit Contact Form
```typescript
import { createContactMessage } from '@/utils/supabase/helpers';

const message = await createContactMessage({
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'Question',
  message: 'Hello!',
  status: 'new'
});
```

## 🐛 Troubleshooting

### Connection Issues
- Verify your `.env` file exists and has the correct values
- Restart your dev server after creating `.env`
- Check that environment variables start with `VITE_`

### Database Errors
- Ensure you ran the SQL schema in Supabase
- Check RLS policies if you get permission errors
- Verify table names match the schema

### Type Errors
- Make sure TypeScript types in `types.ts` match your actual database schema
- Run `npm run build` to check for type errors

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

## ✨ Your Credentials

- **Project URL**: https://hohzrasvjvkmgyirxbht.supabase.co
- **Project ID**: hohzrasvjvkmgyirxbht
- **Anon Key**: Stored in `.env`
- **Service Role Key**: Stored in `.env` (keep secret!)

---

**Ready to go!** Your Supabase database is configured and ready to use. Run the SQL schema and start building! 🎉
