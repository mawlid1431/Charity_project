// Database types for Supabase - Simplified Schema
export interface Database {
    public: {
        Tables: {
            projects: {
                Row: {
                    id: string;
                    name: string;
                    location: string;
                    date: string;
                    description: string;
                    image: string;
                    target_amount: number;
                    raised_amount: number;
                    status: 'active' | 'paused' | 'completed';
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'created_at' | 'updated_at'>;
                Update: Partial<Database['public']['Tables']['projects']['Insert']>;
            };
            donations: {
                Row: {
                    id: string;
                    project_id: string | null;
                    donor_name: string;
                    donor_email: string;
                    donor_phone: string | null;
                    amount: number;
                    message: string | null;
                    payment_method: string;
                    payment_status: 'pending' | 'completed' | 'failed';
                    transaction_id: string | null;
                    created_at: string;
                };
                Insert: Omit<Database['public']['Tables']['donations']['Row'], 'id' | 'created_at'>;
                Update: Partial<Database['public']['Tables']['donations']['Insert']>;
            };
        };
    };
}
