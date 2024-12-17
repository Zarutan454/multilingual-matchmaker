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
        console.log('Fetching profiles...');
        let query = supabase
          .from('profiles')
          .select('*')
          .not('avatar_url', 'is', null)
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
          console.error('Supabase error:', error);
          throw error;
        }

        console.log('Profiles fetched successfully:', data?.length);
        return data.map((profile: any): Profile => ({
          id: profile.id,
          name: profile.full_name || 'Anonymous',
          image: profile.avatar_url,
          category: profile.service_categories?.[0] || 'VIP Begleitung',
          location: profile.location || 'Unknown',
          coordinates: { lat: 0, lng: 0 },
          status: profile.availability_status || 'offline',
          rating: 4.8,
          reviews: 0,
          spokenLanguages: profile.languages || ['Deutsch'],
          age: profile.age || 25,
          serviceCategories: profile.service_categories || [],
          priceRange: profile.price_range || { min: 0, max: 0 }
        }));
      } catch (err) {
        console.error('Error fetching profiles:', err);
        throw err;
      }
    },
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 30000,
    gcTime: 300000,
  });
};