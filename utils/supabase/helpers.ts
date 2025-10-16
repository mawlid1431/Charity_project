import { supabase } from './client';
import type { Database } from './types';

type Project = Database['public']['Tables']['projects']['Row'];
type Donation = Database['public']['Tables']['donations']['Row'];
type DonationCampaign = Database['public']['Tables']['donation_campaigns']['Row'];

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

// Donations
export async function createDonation(donation: Database['public']['Tables']['donations']['Insert']) {
    const { data, error } = await supabase
        .from('donations')
        .insert(donation)
        .select()
        .single();

    if (error) throw error;
    return data as Donation;
}

export async function getDonations() {
    const { data, error } = await supabase
        .from('donations')
        .select(`
            *,
            projects (
                name
            )
        `)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
}

export async function getDonationsByProject(projectId: string) {
    const { data, error } = await supabase
        .from('donations')
        .select('*')
        .eq('project_id', projectId)
        .eq('payment_status', 'completed')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Donation[];
}

export async function updateDonationStatus(id: string, status: 'pending' | 'completed' | 'failed') {
    const { data, error } = await supabase
        .from('donations')
        .update({ payment_status: status })
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data as Donation;
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

// Donation Campaigns
export async function getDonationCampaigns() {
    const { data, error } = await supabase
        .from('donation_campaigns')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data as DonationCampaign[];
}

export async function getActiveDonationCampaigns() {
    const { data, error } = await supabase
        .from('donation_campaigns')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data as DonationCampaign[];
}

export async function getDonationCampaignById(id: string) {
    const { data, error } = await supabase
        .from('donation_campaigns')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data as DonationCampaign;
}

export async function createDonationCampaign(campaign: Database['public']['Tables']['donation_campaigns']['Insert']) {
    const { data, error } = await supabase
        .from('donation_campaigns')
        .insert(campaign)
        .select()
        .single();

    if (error) throw error;
    return data as DonationCampaign;
}

export async function updateDonationCampaign(id: string, updates: Database['public']['Tables']['donation_campaigns']['Update']) {
    const { data, error } = await supabase
        .from('donation_campaigns')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data as DonationCampaign;
}

export async function deleteDonationCampaign(id: string) {
    const { error } = await supabase
        .from('donation_campaigns')
        .delete()
        .eq('id', id);

    if (error) throw error;
}

// Dashboard Stats
export async function getDashboardStats() {
    const { data: projects } = await supabase
        .from('projects')
        .select('*');

    const { data: campaigns } = await supabase
        .from('donation_campaigns')
        .select('*');

    const { data: donations } = await supabase
        .from('donations')
        .select('amount, payment_status');

    const activeProjects = projects?.length || 0;
    const activeCampaigns = campaigns?.filter(c => c.status === 'active').length || 0;
    const totalRaised = campaigns?.reduce((sum, c) => sum + (c.raised_amount || 0), 0) || 0;
    const totalDonations = donations?.filter(d => d.payment_status === 'completed').length || 0;

    return {
        activeProjects,
        activeCampaigns,
        totalRaised,
        totalDonations,
        successRate: campaigns?.length ? Math.round((campaigns.filter(c => c.status === 'completed').length / campaigns.length) * 100) : 0
    };
}
