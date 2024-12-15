import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

export const useFavorites = (user: User | null) => {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .limit(5);

      if (error) {
        console.error('Error fetching favorites:', error);
        return [];
      }
      return data || [];
    },
    enabled: !!user
  });
};