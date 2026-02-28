export interface Profile {
    id?: number | bigint;
    created_at?: string;
    name?: string;
    email?: string;
    phone_number?: string;
    user_id?: string;
    provider: string;
    provider_id: string;
    role: string;
}