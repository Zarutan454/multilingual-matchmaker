import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

export const useFavorites = (user: User | null) => {
  return useQuery({
    queryKey: ['favorites', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data: favorites, error } = await supabase
        .from('favorites')
        .select(`
          id,
          profile_id,
          profiles:profile_id (
            id,
            full_name,
            avatar_url,
            location
          )
        `)
        .eq('user_id', user.id)
        .limit(5);

      if (error) {
        console.error('Error fetching favorites:', error);
        return [];
      }
      return favorites || [];
    },
    enabled: !!user
  });
};