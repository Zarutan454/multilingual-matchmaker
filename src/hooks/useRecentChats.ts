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
      
      // First get all messages
      const { data: messages, error: messagesError } = await supabase
        .from('messages')
        .select(`
          id,
          content,
          sender,
          recipient,
          created_at,
          read,
          profiles!messages_sender_fkey (
            full_name,
            avatar_url
          ),
          profiles!messages_recipient_fkey (
            full_name,
            avatar_url
          )
        `)
        .or(`sender.eq.${user.id},recipient.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (messagesError) {
        console.error('Error fetching messages:', messagesError);
        return [];
      }

      // Get unread message count
      const { data: unreadCounts, error: unreadError } = await supabase
        .from('messages')
        .select('sender', { count: 'exact', head: false })
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
        sender_name: message.profiles?.full_name,
        recipient_name: message.profiles?.full_name,
        avatar_url: message.sender === user.id 
          ? message.profiles?.avatar_url 
          : message.profiles?.avatar_url,
        unread: !message.read && message.recipient === user.id,
        unread_count: unreadCounts?.length || 0
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