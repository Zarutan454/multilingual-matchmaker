import { Json } from '@/integrations/supabase/generated.types';

export type ProfileRow = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  banner_url: string | null;
  bio: string | null;
  location: string | null;
  interests: string | null;
  occupation: string | null;
  height: string | null;
  weight: string | null;
  category: string | null;
  availability_status: string | null;
  languages: string[] | null;
  service_categories: string[] | null;
  price_range: Json | null;
  availability: string[] | null;
  gallery: string[] | null;
  age: number | null;
  gender: string | null;
  user_type: string;
  last_seen: string | null;
  is_active?: boolean;
};

export interface SupabaseQueryResponse {
  data: ProfileRow[] | null;
  error: Error | null;
  count: number | null;
}