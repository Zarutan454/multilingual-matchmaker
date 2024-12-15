import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

interface ChatMessage {
  id: string;
  sender: string;
  recipient: string;
  content: string;
  created_at: string;
  sender_name: string | null;
  recipient_name: string | null;
  avatar_url: string | null;
  unread: boolean;
  unread_count: number;
}

export const useRecentChats = (user: User | null) => {
  return useQuery({
    queryKey: ['recentChats', user?.id],
    queryFn: async (): Promise<ChatMessage[]> => {
      if (!user) return [];

      // First get messages
      const { data: messages, error: messagesError } = await supabase
        .from('messages')
        .select(`
          id,
          content,
          sender,
          recipient,
          created_at,
          read
        `)
        .or(`sender.eq.${user.id},recipient.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (messagesError) {
        console.error('Error fetching messages:', messagesError);
        return [];
      }

      // Get profiles for senders and recipients
      const userIds = messages.map(m => [m.sender, m.recipient]).flat();
      const uniqueUserIds = [...new Set(userIds)];

      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .in('id', uniqueUserIds);

      const profileMap = new Map(profiles?.map(p => [p.id, p]));

      // Get unread message counts
      const { count: unreadCount } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('recipient', user.id)
        .eq('read', false);

      // Transform the data
      return messages.map(message => ({
        id: message.id,
        sender: message.sender,
        recipient: message.recipient,
        content: message.content,
        created_at: message.created_at,
        sender_name: profileMap.get(message.sender)?.full_name || null,
        recipient_name: profileMap.get(message.recipient)?.full_name || null,
        avatar_url: message.sender === user.id 
          ? profileMap.get(message.recipient)?.avatar_url 
          : profileMap.get(message.sender)?.avatar_url,
        unread: !message.read && message.recipient === user.id,
        unread_count: unreadCount || 0
      }));
    },
    enabled: !!user
  });
};