import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChatList } from "./ChatList";
import { ChatInput } from "./ChatInput";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { MessageCircle, Loader2 } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  avatarUrl?: string;
}

interface ChatWindowProps {
  recipientId: string;
  recipientName: string;
}

export const ChatWindow = ({ recipientId, recipientName }: ChatWindowProps) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (!user) return;

    const loadMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .or(`sender.eq.${user.id},sender.eq.${recipientId}`)
          .or(`recipient.eq.${user.id},recipient.eq.${recipientId}`)
          .order('created_at', { ascending: true });

        if (error) throw error;

        const typedMessages: Message[] = data.map(msg => ({
          id: String(msg.id),
          content: String(msg.content),
          sender: String(msg.sender),
          timestamp: new Date(msg.created_at as string),
          avatarUrl: msg.sender === user.id ? user.user_metadata?.avatar_url : undefined
        }));

        setMessages(typedMessages);

        // Nachrichten als gelesen markieren
        if (user) {
          await supabase
            .from('messages')
            .update({ read: true })
            .eq('recipient', user.id)
            .eq('sender', recipientId);
        }
      } catch (error) {
        console.error('Error loading messages:', error);
        toast({
          title: t("error"),
          description: t("errorLoadingMessages"),
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();

    // Echtzeit-Updates für neue Nachrichten
    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `sender=eq.${recipientId},recipient=eq.${user.id}`
        },
        (payload) => {
          const newMessage = payload.new;
          setMessages(prev => [...prev, {
            id: String(newMessage.id),
            content: String(newMessage.content),
            sender: String(newMessage.sender),
            timestamp: new Date(newMessage.created_at),
            avatarUrl: newMessage.sender === user.id ? user.user_metadata?.avatar_url : undefined
          }]);

          // Neue Nachricht als gelesen markieren
          supabase
            .from('messages')
            .update({ read: true })
            .eq('id', newMessage.id);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, recipientId, t]);

  const handleSendMessage = async (content: string) => {
    if (!user) return;
    setIsSending(true);

    try {
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            content,
            sender: user.id,
            recipient: recipientId,
            created_at: new Date().toISOString(),
            read: false
          }
        ]);

      if (error) throw error;

      // Optimistische UI-Aktualisierung
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content,
        sender: user.id,
        timestamp: new Date(),
        avatarUrl: user.user_metadata?.avatar_url
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: t("error"),
        description: t("errorSendingMessage"),
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl mx-auto bg-[#1a1a1a] border-neutral-800">
        <div className="flex items-center justify-center h-[500px]">
          <Loader2 className="h-8 w-8 animate-spin text-[#9b87f5]" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-[#1a1a1a] border-neutral-800">
      <CardHeader className="border-b border-neutral-800">
        <CardTitle className="text-white flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          {recipientName}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ChatList 
          messages={messages} 
          currentUserId={user?.id || ""} 
          isLoading={isLoading}
        />
        <ChatInput 
          onSendMessage={handleSendMessage} 
          disabled={!user || isLoading || isSending}
        />
      </CardContent>
    </Card>
  );
};