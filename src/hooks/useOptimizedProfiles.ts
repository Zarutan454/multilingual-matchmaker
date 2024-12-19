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

export const useOptimizedProfiles = ({
  page,
  pageSize,
  filters,
  enabled = true
}: UseProfilesProps) => {
  return useQuery({
    queryKey: ['optimized-profiles', page, pageSize, filters],
    queryFn: async () => {
      try {
        let query = supabase
          .from('profiles')
          .select(`
            id,
            full_name,
            avatar_url,
            location,
            category,
            availability_status,
            languages,
            age,
            service_categories,
            price_range,
            last_seen,
            role,
            likes_count,
            user_type
          `, { count: 'exact' })
          .eq('user_type', 'provider')
          .eq('is_active', true)
          .order('last_seen', { ascending: false });

        if (filters?.searchTerm) {
          query = query.textSearch('full_name', filters.searchTerm, {
            type: 'websearch',
            config: 'german'
          });
        }

        if (filters?.location) {
          query = query.ilike('location', `%${filters.location}%`);
        }

        if (filters?.category) {
          query = query.contains('service_categories', [filters.category]);
        }

        if (filters?.orientation) {
          query = query.contains('service_categories', [filters.orientation]);
        }

        if (filters?.membershipLevel) {
          query = query.eq('role', filters.membershipLevel);
        }

        const from = page * pageSize;
        const to = from + pageSize - 1;
        query = query.range(from, to);

        const { data, error, count } = await query;

        if (error) throw error;

        return {
          profiles: data.map((profile: any): Profile => ({
            id: profile.id,
            full_name: profile.full_name || 'Anonymous',
            bio: null,
            avatar_url: profile.avatar_url || '/placeholder.svg',
            banner_url: null,
            location: profile.location || 'Unknown',
            interests: null,
            occupation: null,
            height: null,
            weight: null,
            availability: null,
            service_categories: profile.service_categories || [],
            price_range: profile.price_range || { min: 0, max: 0 },
            availability_status: profile.availability_status || 'offline',
            gallery: null,
            languages: profile.languages || ['Deutsch'],
            contact_info: {},
            service_info: {
              services: [],
              working_hours: {},
              rates: {}
            },
            age: profile.age || null,
            gender: null,
            last_seen: profile.last_seen,
            user_type: profile.user_type || 'customer',
            is_verified: false,
            verification_status: 'pending',
            likes_count: profile.likes_count || 0
          })),
          total: count || 0
        };
      } catch (error) {
        console.error('Error fetching profiles:', error);
        toast.error('Fehler beim Laden der Profile');
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    gcTime: 1000 * 60 * 30, // 30 minutes garbage collection
    enabled,
    meta: {
      errorMessage: 'Fehler beim Laden der Profile'
    }
  });
};