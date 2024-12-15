import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";

interface FavoriteProfile {
  id: string;
  profile_id: number;
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
          profiles:profile_id (
            id,
            full_name,
            avatar_url,
            location
          )
        `)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching favorites:', error);
        throw new Error(error.message);
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