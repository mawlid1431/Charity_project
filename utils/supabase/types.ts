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
            testimonials: {
                Row: {
                    id: string;
                    name: string;
                    role: string;
                    location: string;
                    image: string;
                    rating: number;
                    feedback: string;
                    project: string;
                    date: string;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database['public']['Tables']['testimonials']['Row'], 'id' | 'created_at' | 'updated_at'>;
                Update: Partial<Database['public']['Tables']['testimonials']['Insert']>;
            };
            success_stories: {
                Row: {
                    id: string;
                    name: string;
                    age: number;
                    location: string;
                    project: string;
                    image: string;
                    story: string;
                    impact: string;
                    date: string;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database['public']['Tables']['success_stories']['Row'], 'id' | 'created_at' | 'updated_at'>;
                Update: Partial<Database['public']['Tables']['success_stories']['Insert']>;
            };
        };
    };
}
