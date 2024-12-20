import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Profile } from "@/types/profile/types";
import { toast } from "sonner";

interface UseProfilesProps {
  page: number;
  pageSize: number;
  filters?: {
    searchTerm?: string;
    location?: string;
    category?: string;
    orientation?: string;
    membershipLevel?: string;
  };
  enabled?: boolean;
}

interface ProfilesResponse {
  profiles: Profile[];
  total: number;
}

const CACHE_TIME = 1000 * 60 * 5; // 5 Minuten
const STALE_TIME = 1000 * 30; // 30 Sekunden

export const useOptimizedProfiles = ({
  page,
  pageSize,
  filters,
  enabled = true
}: UseProfilesProps) => {
  return useQuery<ProfilesResponse>({
    queryKey: ['optimized-profiles', page, pageSize, filters],
    queryFn: async () => {
      try {
        let query = supabase
          .from('profiles')
          .select('*', { count: 'exact' })
          .eq('user_type', 'provider')
          .eq('is_active', true)
          .range(page * pageSize, (page + 1) * pageSize - 1);

        if (filters?.searchTerm) {
          query = query.ilike('full_name', `%${filters.searchTerm}%`);
        }

        if (filters?.location) {
          query = query.ilike('location', `%${filters.location}%`);
        }

        if (filters?.category) {
          query = query.contains('service_categories', [filters.category]);
        }

        const { data, error, count } = await query;

        if (error) throw error;

        return {
          profiles: (data || []).map((profile): Profile => ({
            id: profile.id,
            full_name: profile.full_name || '',
            bio: profile.bio || '',
            avatar_url: profile.avatar_url || '',
            banner_url: profile.banner_url || '',
            location: profile.location || '',
            interests: profile.interests || '',
            occupation: profile.occupation || '',
            height: profile.height || '',
            weight: profile.weight || '',
            availability: profile.availability || [],
            service_categories: profile.service_categories || [],
            price_range: profile.price_range ? {
              min: typeof profile.price_range === 'object' ? (profile.price_range as any).min || 0 : 0,
              max: typeof profile.price_range === 'object' ? (profile.price_range as any).max || 0 : 0
            } : null,
            availability_status: (profile.availability_status as 'online' | 'offline' | 'busy') || 'offline',
            gallery: profile.gallery || [],
            languages: profile.languages || [],
            contact_info: profile.contact_info || {},
            service_info: {
              services: [],
              working_hours: {},
              rates: {}
            },
            last_seen: profile.last_seen,
            user_type: (profile.user_type as 'customer' | 'provider') || 'customer',
            is_verified: false,
            verification_status: 'pending'
          })),
          total: count || 0
        };
      } catch (error) {
        console.error('Fehler beim Laden der Profile:', error);
        toast.error('Fehler beim Laden der Profile');
        throw error;
      }
    },
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    enabled,
    meta: {
      errorMessage: 'Fehler beim Laden der Profile'
    }
  });
};