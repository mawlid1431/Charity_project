// Database types for Supabase - Complete Schema
export interface Database {
    public: {
        Tables: {
            projects: {
                Row: {
                    id: string;
                    name: string;
                    date: string;
                    description: string;
                    image: string;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'created_at' | 'updated_at'>;
                Update: Partial<Database['public']['Tables']['projects']['Insert']>;
            };
            donation_campaigns: {
                Row: {
                    id: string;
                    project_donation_name: string;
                    description: string;
                    location: string;
                    date: string;
                    image: string;
                    target_amount: number;
                    raised_amount: number;
                    donation_link: string | null;
                    status: 'active' | 'completed' | 'paused';
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database['public']['Tables']['donation_campaigns']['Row'], 'id' | 'created_at' | 'updated_at'>;
                Update: Partial<Database['public']['Tables']['donation_campaigns']['Insert']>;
            };
            donations: {
                Row: {
                    id: string;
                    project_id: string | null;
                    campaign_id: string | null;
                    donor_name: string;
                    donor_email: string;
                    amount: number;
                    payment_status: 'pending' | 'completed' | 'failed';
                    payment_method: string | null;
                    stripe_payment_intent_id: string | null;
                    message: string | null;
                    anonymous: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database['public']['Tables']['donations']['Row'], 'id' | 'created_at' | 'updated_at'>;
                Update: Partial<Database['public']['Tables']['donations']['Insert']>;
            };
            team_members: {
                Row: {
                    id: string;
                    name: string;
                    role: string;
                    image: string;
                    display_order: number;
                    linkedin_url: string | null;
                    email: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database['public']['Tables']['team_members']['Row'], 'id' | 'created_at' | 'updated_at'>;
                Update: Partial<Database['public']['Tables']['team_members']['Insert']>;
            };
        };
    };
}
