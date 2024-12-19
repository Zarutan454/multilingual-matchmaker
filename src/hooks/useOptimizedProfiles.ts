import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Profile } from "@/types/profile";
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

        // Optimierte Filterlogik
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

        // Pagination mit Limit und Offset
        const from = page * pageSize;
        const to = from + pageSize - 1;
        query = query.range(from, to);

        const { data, error, count } = await query;

        if (error) throw error;

        return {
          profiles: data.map((profile: any): Profile => ({
            id: profile.id,
            name: profile.full_name || 'Anonymous',
            image: profile.avatar_url || '/placeholder.svg',
            category: profile.category || 'VIP Begleitung',
            location: profile.location || 'Unknown',
            coordinates: { lat: 0, lng: 0 },
            status: profile.availability_status || 'offline',
            rating: 4.8,
            reviews: 0,
            spokenLanguages: profile.languages || ['Deutsch'],
            age: profile.age || null,
            serviceCategories: profile.service_categories || [],
            priceRange: profile.price_range || { min: 0, max: 0 },
            last_seen: profile.last_seen,
            membership_level: profile.role === 'vip' ? 'vip' : 'bronze',
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
    staleTime: 1000 * 60 * 5, // 5 Minuten Cache
    gcTime: 1000 * 60 * 30, // 30 Minuten Garbage Collection
    enabled,
    meta: {
      errorMessage: 'Fehler beim Laden der Profile'
    }
  });
};