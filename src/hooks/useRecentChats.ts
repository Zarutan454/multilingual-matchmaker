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
      
      // First get all messages with profile information
      const { data: messages, error: messagesError } = await supabase
        .from('messages')
        .select(`
          id,
          content,
          sender,
          recipient,
          created_at,
          read,
          sender_profile:profiles!sender(full_name, avatar_url),
          recipient_profile:profiles!recipient(full_name, avatar_url)
        `)
        .or(`sender.eq.${user.id},recipient.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (messagesError) {
        console.error('Error fetching messages:', messagesError);
        return [];
      }

      // Get unread message counts
      const { count: unreadCount, error: unreadError } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('recipient', user.id)
        .eq('read', false);

      if (unreadError) {
        console.error('Error fetching unread counts:', unreadError);
        return [];
      }

      // Transform the data
      const transformedData = messages?.map(message => ({
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
        unread_count: unreadCount || 0
      })) || [];

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