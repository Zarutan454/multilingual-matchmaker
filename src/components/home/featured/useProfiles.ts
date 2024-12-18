import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Profile } from "@/components/profile/types";
import { toast } from "sonner";

interface UseProfilesProps {
  page: number;
  searchTerm: string;
  location: string;
  category: string;
  orientation: string;
  itemsPerPage: number;
}

export const useProfiles = ({
  page,
  searchTerm,
  location,
  category,
  orientation,
  itemsPerPage
}: UseProfilesProps) => {
  return useQuery({
    queryKey: ['profiles', page, searchTerm, location, category, orientation],
    queryFn: async () => {
      try {
        console.log('Fetching profiles with params:', {
          page,
          searchTerm,
          location,
          category,
          orientation,
          itemsPerPage
        });

        // Debug query to check active providers
        const { data: activeProviders, error: debugError } = await supabase
          .from('profiles')
          .select('id, full_name, user_type, is_active')
          .eq('user_type', 'provider')
          .eq('is_active', true);

        console.log('Active providers found:', activeProviders);

        if (debugError) {
          console.error('Debug query error:', debugError);
        }

        // Hauptabfrage mit Filtern
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
          `)
          .eq('user_type', 'provider')
          .eq('is_active', true)
          .range(page * itemsPerPage, (page + 1) * itemsPerPage - 1)
          .order('created_at', { ascending: false });

        if (searchTerm) {
          query = query.ilike('full_name', `%${searchTerm}%`);
        }
        if (location) {
          query = query.ilike('location', `%${location}%`);
        }
        if (category) {
          query = query.contains('service_categories', [category]);
        }
        if (orientation) {
          query = query.contains('service_categories', [orientation]);
        }

        const { data, error } = await query;

        if (error) {
          console.error('Error fetching profiles:', error);
          toast.error('Fehler beim Laden der Profile');
          throw error;
        }

        console.log('Filtered provider profiles:', {
          total: data?.length,
          profiles: data
        });

        return data.map((profile: any): Profile => ({
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
          age: profile.age || 25,
          serviceCategories: profile.service_categories || [],
          priceRange: profile.price_range || { min: 0, max: 0 },
          last_seen: profile.last_seen,
          membership_level: profile.role === 'vip' ? 'vip' : 'bronze',
          likes_count: profile.likes_count || 0
        }));
      } catch (error: any) {
        console.error('Error in useProfiles:', error);
        toast.error('Fehler beim Laden der Profile');
        throw error;
      }
    },
    retry: 3,
    retryDelay: 1000,
    staleTime: 30000,
    gcTime: 300000,
    meta: {
      errorMessage: 'Fehler beim Laden der Profile'
    }
  });
};