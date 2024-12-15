import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  location: string | null;
}

interface FavoriteData {
  id: string;
  profile: Profile;
}

export const useFavorites = (user: User | null) => {
  return useQuery({
    queryKey: ['favorites', user?.id],
    queryFn: async (): Promise<FavoriteData[]> => {
      if (!user) return [];

      const { data: favorites, error } = await supabase
        .from('favorites')
        .select(`
          id,
          profile:profile_id (
            id,
            full_name,
            avatar_url,
            location
          )
        `)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching favorites:', error);
        throw error;
      }

      return favorites.map(favorite => ({
        id: favorite.id,
        profile: favorite.profile as Profile
      }));
    },
    enabled: !!user
  });
};