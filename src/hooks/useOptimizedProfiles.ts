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
  };
}

export const useOptimizedProfiles = ({
  page,
  pageSize,
  filters
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
            user_type
          `, { count: 'exact' })
          .eq('user_type', 'provider')
          .eq('is_active', true)
          .range(page * pageSize, (page + 1) * pageSize - 1)
          .order('created_at', { ascending: false });

        if (filters?.searchTerm) {
          query = query.ilike('full_name', `%${filters.searchTerm}%`);
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

        const { data, error, count } = await query;

        if (error) throw error;

        return {
          profiles: data,
          total: count || 0
        };
      } catch (error) {
        console.error('Error fetching profiles:', error);
        toast.error('Fehler beim Laden der Profile');
        throw error;
      }
    },
    staleTime: 30000, // Cache for 30 seconds
    gcTime: 300000,   // Keep unused data for 5 minutes
  });
};