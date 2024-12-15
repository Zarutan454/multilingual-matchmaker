import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

interface ChatMessage {
  id: string;
  sender: string;
  recipient: string;
  content: string;
  created_at: string;
  sender_name: string;
  recipient_name: string;
  avatar_url: string | null;
  unread: boolean;
  unread_count: number;
}

export const useRecentChats = (user: User | null) => {
  return useQuery({
    queryKey: ['recentChats', user?.id],
    queryFn: async (): Promise<ChatMessage[]> => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('messages')
        .select(`
          id,
          content,
          sender,
          recipient,
          created_at,
          read,
          sender_profile:profiles!messages_sender_fkey (
            full_name,
            avatar_url
          ),
          recipient_profile:profiles!messages_recipient_fkey (
            full_name,
            avatar_url
          )
        `)
        .or(`sender.eq.${user.id},recipient.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching messages:', error);
        return [];
      }

      // Get unread message counts
      const { data: unreadCounts } = await supabase
        .from('messages')
        .select('sender', { count: 'exact' })
        .eq('recipient', user.id)
        .eq('read', false)
        .group('sender');

      // Transform the data
      const transformedData = data.map(message => ({
        id: message.id,
        sender: message.sender,
        recipient: message.recipient,
        content: message.content,
        created_at: message.created_at,
        sender_name: message.sender_profile?.full_name,
        recipient_name: message.recipient_profile?.full_name,
        avatar_url: message.sender === user.id 
          ? message.recipient_profile?.avatar_url 
          : message.sender_profile?.avatar_url,
        unread: !message.read && message.recipient === user.id,
        unread_count: unreadCounts?.find(count => 
          count.sender === (message.sender === user.id ? message.recipient : message.sender)
        )?.count || 0
      }));

      // Group by conversation and get latest message
      const conversationMap = new Map<string, ChatMessage>();
      transformedData.forEach(message => {
        const partnerId = message.sender === user.id ? message.recipient : message.sender;
        if (!conversationMap.has(partnerId) || 
            new Date(message.created_at) > new Date(conversationMap.get(partnerId)!.created_at)) {
          conversationMap.set(partnerId, message);
        }
      });

      return Array.from(conversationMap.values());
    },
    enabled: !!user
  });
};