import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { useEffect } from "react";

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
  const { data, refetch } = useQuery({
    queryKey: ['recentChats', user?.id],
    queryFn: async (): Promise<ChatMessage[]> => {
      if (!user) return [];

      // Nachrichten abrufen
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

      // Profile für Sender und Empfänger abrufen
      const userIds = messages.map(m => [m.sender, m.recipient]).flat();
      const uniqueUserIds = [...new Set(userIds)];

      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .in('id', uniqueUserIds);

      const profileMap = new Map(profiles?.map(p => [p.id, p]));

      // Ungelesene Nachrichten zählen
      const { count: unreadCount } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('recipient', user.id)
        .eq('read', false);

      // Daten transformieren
      const transformedMessages = messages.map(message => ({
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

      // Nach Konversationen gruppieren
      const conversationMap = new Map<string, ChatMessage>();
      transformedMessages.forEach(message => {
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

  // Echtzeit-Updates einrichten
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('chat_updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `recipient=eq.${user.id}`
        },
        () => {
          refetch(); // Chat-Liste bei neuen Nachrichten aktualisieren
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, refetch]);

  return { data, refetch };
};