import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

interface FavoriteProfile {
  id: string;
  profile_id: number;
  user_id: string;
  created_at: string;
}

export const useFavorites = (user: User | null) => {
  return useQuery({
    queryKey: ['favorites', user?.id],
    queryFn: async () => {
      if (!user) return [];

      // First get the favorites
      const { data: favorites, error: favoritesError } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id);

      if (favoritesError) {
        console.error('Error fetching favorites:', favoritesError);
        throw favoritesError;
      }

      // If we have favorites, fetch the corresponding profiles
      if (favorites && favorites.length > 0) {
        const profileIds = favorites.map(fav => fav.profile_id);
        
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url, location')
          .in('id', profileIds);

        if (profilesError) {
          console.error('Error fetching profiles:', profilesError);
          throw profilesError;
        }

        // Combine the data
        return favorites.map(favorite => ({
          ...favorite,
          profiles: profiles?.find(profile => profile.id === favorite.profile_id) || null
        }));
      }

      return [];
    },
    enabled: !!user,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: true,
  });
};