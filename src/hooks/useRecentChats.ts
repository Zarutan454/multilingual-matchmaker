import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

export const useRecentChats = (user: User | null) => {
  return useQuery({
    queryKey: ['recentChats'],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender.eq.${user.id},recipient.eq.${user.id}`)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error fetching messages:', error);
        return [];
      }
      return data || [];
    },
    enabled: !!user
  });
};