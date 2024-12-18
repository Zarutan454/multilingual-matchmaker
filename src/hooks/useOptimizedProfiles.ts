import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Profile } from "@/types/profile";
import { toast } from "sonner";

interface UseOptimizedProfilesProps {
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
}: UseOptimizedProfilesProps) => {
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
            user_type,
            membership_level
          `, { count: 'exact' })
          .eq('user_type', 'provider')
          .eq('is_active', true)
          .order('membership_level', { ascending: false })
          .order('last_seen', { ascending: false });

        if (filters) {
          if (filters.searchTerm) {
            query = query.ilike('full_name', `%${filters.searchTerm}%`);
          }
          if (filters.location) {
            query = query.ilike('location', `%${filters.location}%`);
          }
          if (filters.category) {
            query = query.contains('service_categories', [filters.category]);
          }
          if (filters.orientation) {
            query = query.contains('service_categories', [filters.orientation]);
          }
          if (filters.membershipLevel) {
            query = query.eq('membership_level', filters.membershipLevel);
          }
        }

        query = query.range(page * pageSize, (page + 1) * pageSize - 1);

        const { data, error, count } = await query;

        if (error) throw error;

        return {
          profiles: data.map((profile: any): Profile => ({
            id: profile.id,
            full_name: profile.full_name || 'Anonymous',
            avatar_url: profile.avatar_url || '/placeholder.svg',
            location: profile.location || 'Unknown',
            bio: null,
            nickname: null,
            banner_url: null,
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
            user_type: 'provider',
            is_verified: false,
            verification_status: 'pending',
            last_seen: profile.last_seen
          })),
          total: count || 0
        };
      } catch (error) {
        console.error('Error fetching profiles:', error);
        toast.error('Fehler beim Laden der Profile');
        throw error;
      }
    },
    staleTime: 30000,
    gcTime: 300000,
    enabled,
    meta: {
      errorMessage: 'Fehler beim Laden der Profile'
    }
  });
};