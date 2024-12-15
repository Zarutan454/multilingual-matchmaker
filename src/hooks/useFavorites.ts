import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

interface FavoriteProfile {
  id: string;
  profile_id: number;
  user_id: string;
  profiles: {
    id: number;
    full_name: string;
    avatar_url: string | null;
    location: string;
  };
}

export const useFavorites = (user: User | null) => {
  return useQuery<FavoriteProfile[], Error>({
    queryKey: ['favorites', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('favorites')
        .select(`
          id,
          profile_id,
          user_id,
          profiles!profile_id(
            id,
            full_name,
            avatar_url,
            location
          )
        `)
        .eq('user_id', user.id)
        .returns<FavoriteProfile[]>();

      if (error) {
        console.error('Error fetching favorites:', error);
        throw error;
      }
      
      return data || [];
    },
    enabled: !!user,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: true,
  });
};