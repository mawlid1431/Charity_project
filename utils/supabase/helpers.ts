import { supabase } from './client';
import type { Database } from './types';

type Project = Database['public']['Tables']['projects']['Row'];

// Projects
export async function getProjects() {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Project[];
}

export async function getActiveProjects() {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Project[];
}

export async function getProjectById(id: string) {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data as Project;
}

export async function createProject(project: Database['public']['Tables']['projects']['Insert']) {
    const { data, error } = await supabase
        .from('projects')
        .insert(project)
        .select()
        .single();

    if (error) throw error;
    return data as Project;
}

export async function updateProject(id: string, updates: Database['public']['Tables']['projects']['Update']) {
    const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data as Project;
}

export async function deleteProject(id: string) {
    const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

    if (error) throw error;
}

// Team Members
export async function getTeamMembers() {
    const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('display_order', { ascending: true });

    if (error) throw error;
    return data.map(member => ({
        id: member.id,
        name: member.name,
        role: member.role,
        image: member.image,
        displayOrder: member.display_order,
        linkedinUrl: member.linkedin_url,
        email: member.email
    }));
}

export async function createTeamMember(member: {
    name: string;
    role: string;
    image: string;
    displayOrder: number;
    linkedinUrl?: string;
    email?: string;
}) {
    const { data, error } = await supabase
        .from('team_members')
        .insert({
            name: member.name,
            role: member.role,
            image: member.image,
            display_order: member.displayOrder,
            linkedin_url: member.linkedinUrl,
            email: member.email
        })
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function updateTeamMember(id: string, member: {
    name: string;
    role: string;
    image: string;
    displayOrder: number;
    linkedinUrl?: string;
    email?: string;
}) {
    const { data, error } = await supabase
        .from('team_members')
        .update({
            name: member.name,
            role: member.role,
            image: member.image,
            display_order: member.displayOrder,
            linkedin_url: member.linkedinUrl,
            email: member.email
        })
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function deleteTeamMember(id: string) {
    const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);

    if (error) throw error;
}

// Testimonials
export async function getTestimonials() {
    const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
}

export async function getTestimonialById(id: string) {
    const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
}

export async function createTestimonial(testimonial: Database['public']['Tables']['testimonials']['Insert']) {
    const { data, error } = await supabase
        .from('testimonials')
        .insert(testimonial)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function updateTestimonial(id: string, updates: Database['public']['Tables']['testimonials']['Update']) {
    const { data, error } = await supabase
        .from('testimonials')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function deleteTestimonial(id: string) {
    const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

    if (error) throw error;
}

// Success Stories
export async function getSuccessStories() {
    const { data, error } = await supabase
        .from('success_stories')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
}

export async function getSuccessStoryById(id: string) {
    const { data, error } = await supabase
        .from('success_stories')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
}

export async function createSuccessStory(story: Database['public']['Tables']['success_stories']['Insert']) {
    const { data, error } = await supabase
        .from('success_stories')
        .insert(story)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function updateSuccessStory(id: string, updates: Database['public']['Tables']['success_stories']['Update']) {
    const { data, error } = await supabase
        .from('success_stories')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function deleteSuccessStory(id: string) {
    const { error } = await supabase
        .from('success_stories')
        .delete()
        .eq('id', id);

    if (error) throw error;
}

// Dashboard Stats
export async function getDashboardStats() {
    const { data: projects } = await supabase
        .from('projects')
        .select('*');

    const activeProjects = projects?.length || 0;

    return {
        activeProjects,
        totalProjects: projects?.length || 0
    };
}
