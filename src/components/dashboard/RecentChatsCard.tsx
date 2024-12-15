import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { User } from "@supabase/supabase-js";
import { useRecentChats } from "@/hooks/useRecentChats";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface RecentChatsCardProps {
  user: User | null;
}

export const RecentChatsCard = ({ user }: RecentChatsCardProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { data: recentChats = [], refetch } = useRecentChats(user);

  useEffect(() => {
    if (!user) return;

    // Subscribe to new messages
    const channel = supabase
      .channel('new_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `recipient=eq.${user.id}`
        },
        (payload) => {
          console.log('New message received:', payload);
          refetch(); // Refresh the chat list when new message arrives
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, refetch]);

  const handleChatClick = async (recipientId: string) => {
    if (!user) return;

    try {
      // Mark messages as read when clicking on the chat
      await supabase.rpc('mark_messages_as_read', {
        p_recipient_id: user.id,
        p_sender_id: recipientId
      });
      
      // Navigate to the chat
      navigate(`/messages/${recipientId}`);
      
      // Refresh the chat list to update unread status
      refetch();
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  return (
    <Card className="bg-black/50 backdrop-blur-sm border-[#9b87f5]/30 shadow-[0_0_15px_rgba(155,135,245,0.3)]">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-[#9b87f5]" />
          {t("messages")}
        </CardTitle>
        <CardDescription className="text-gray-400">
          {t("recentMessages")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentChats.map((chat) => (
            <Button
              key={chat.id}
              variant="ghost"
              className="w-full flex items-center gap-3 p-4 hover:bg-[#9b87f5]/10"
              onClick={() => handleChatClick(chat.sender === user?.id ? chat.recipient : chat.sender)}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={chat.avatar_url} />
                <AvatarFallback>
                  {chat.sender === user?.id 
                    ? chat.recipient_name?.[0]?.toUpperCase() 
                    : chat.sender_name?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="font-medium text-white">
                  {chat.sender === user?.id ? chat.recipient_name : chat.sender_name}
                </p>
                <p className="text-sm text-gray-400 truncate">{chat.content}</p>
              </div>
              {chat.unread && chat.sender !== user?.id && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#9b87f5]">
                    {chat.unread_count}
                  </span>
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                </div>
              )}
            </Button>
          ))}
          {recentChats.length === 0 && (
            <p className="text-center text-gray-400 py-4">{t("noMessages")}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};