# Supabase Usage Examples

Quick reference for using Supabase in your React components.

## Import Options

```typescript
// Option 1: Import helpers (recommended)
import { getProjects, createDonation } from '@/utils/supabase/helpers';

// Option 2: Import client directly
import { supabase } from '@/utils/supabase/client';

// Option 3: Import from index
import { supabase } from '@/utils/supabase';
```

## Projects

### Fetch All Projects
```typescript
import { getProjects } from '@/utils/supabase/helpers';
import { useEffect, useState } from 'react';

function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {projects.map(project => (
        <div key={project.id}>{project.title}</div>
      ))}
    </div>
  );
}
```

### Get Single Project
```typescript
import { getProjectById } from '@/utils/supabase/helpers';

const project = await getProjectById('project-uuid-here');
```

### Create Project (Admin)
```typescript
import { createProject } from '@/utils/supabase/helpers';

const newProject = await createProject({
  title: 'New Project',
  description: 'Project description',
  image_url: 'https://example.com/image.jpg',
  goal_amount: 10000,
  current_amount: 0,
  category: 'Education',
  status: 'active'
});
```

### Update Project (Admin)
```typescript
import { updateProject } from '@/utils/supabase/helpers';

const updated = await updateProject('project-uuid', {
  current_amount: 5000,
  status: 'active'
});
```

## Donations

### Create Donation
```typescript
import { createDonation } from '@/utils/supabase/helpers';

async function handleDonation(formData) {
  try {
    const donation = await createDonation({
      project_id: formData.projectId || null,
      donor_name: formData.name,
      donor_email: formData.email,
      amount: parseFloat(formData.amount),
      message: formData.message || null,
      payment_status: 'completed'
    });
    
    console.log('Donation created:', donation);
    // Show success message
  } catch (error) {
    console.error('Error creating donation:', error);
    // Show error message
  }
}
```

### Get Donations for a Project
```typescript
import { getDonationsByProject } from '@/utils/supabase/helpers';

const donations = await getDonationsByProject('project-uuid');
const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);
```

## Team Members

### Fetch Team Members
```typescript
import { getTeamMembers } from '@/utils/supabase/helpers';

function TeamSection() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    async function fetchTeam() {
      const members = await getTeamMembers();
      setTeam(members);
    }
    fetchTeam();
  }, []);

  return (
    <div>
      {team.map(member => (
        <div key={member.id}>
          <h3>{member.name}</h3>
          <p>{member.role}</p>
        </div>
      ))}
    </div>
  );
}
```

## Contact Messages

### Submit Contact Form
```typescript
import { createContactMessage } from '@/utils/supabase/helpers';

async function handleContactSubmit(e) {
  e.preventDefault();
  
  try {
    await createContactMessage({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      status: 'new'
    });
    
    // Show success message
    alert('Message sent successfully!');
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to send message');
  }
}
```

## Real-time Subscriptions

### Listen for New Donations
```typescript
import { supabase } from '@/utils/supabase/client';
import { useEffect } from 'react';

function DonationTracker() {
  useEffect(() => {
    const subscription = supabase
      .channel('donations')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'donations' },
        (payload) => {
          console.log('New donation:', payload.new);
          // Update UI with new donation
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return <div>Listening for donations...</div>;
}
```

## Error Handling

### With Try-Catch
```typescript
try {
  const projects = await getProjects();
  setProjects(projects);
} catch (error) {
  console.error('Error:', error);
  setError('Failed to load projects');
}
```

### With Toast Notifications
```typescript
import { toast } from 'sonner';

try {
  await createDonation(donationData);
  toast.success('Thank you for your donation!');
} catch (error) {
  toast.error('Failed to process donation');
  console.error(error);
}
```

## Direct Supabase Client Usage

If you need more control, use the client directly:

```typescript
import { supabase } from '@/utils/supabase/client';

// Custom query
const { data, error } = await supabase
  .from('projects')
  .select('*')
  .eq('status', 'active')
  .gte('goal_amount', 10000)
  .order('created_at', { ascending: false })
  .limit(10);

if (error) {
  console.error('Error:', error);
} else {
  console.log('Projects:', data);
}
```

## Storage (for images)

```typescript
import { supabase } from '@/utils/supabase/client';

// Upload image
async function uploadImage(file: File) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `projects/${fileName}`;

  const { data, error } = await supabase.storage
    .from('images')
    .upload(filePath, file);

  if (error) throw error;

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('images')
    .getPublicUrl(filePath);

  return publicUrl;
}
```

## Tips

1. **Always handle errors** - Supabase operations can fail
2. **Use TypeScript types** - Import from `@/utils/supabase/types`
3. **Check RLS policies** - If queries fail, verify Row Level Security
4. **Use helpers** - They include proper error handling and types
5. **Real-time is optional** - Only use subscriptions when needed
6. **Cache data** - Use React Query or SWR for better performance

## Common Patterns

### Loading State
```typescript
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  async function fetchData() {
    try {
      const result = await getProjects();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  fetchData();
}, []);
```

### Form Submission
```typescript
const [submitting, setSubmitting] = useState(false);

async function handleSubmit(e) {
  e.preventDefault();
  setSubmitting(true);
  
  try {
    await createContactMessage(formData);
    // Reset form
    setFormData({});
    toast.success('Sent!');
  } catch (error) {
    toast.error('Failed');
  } finally {
    setSubmitting(false);
  }
}
```
