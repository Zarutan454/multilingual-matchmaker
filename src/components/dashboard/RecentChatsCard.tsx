import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { User } from "@supabase/supabase-js";
import { useRecentChats } from "@/hooks/useRecentChats";

interface RecentChatsCardProps {
  user: User | null;
}

export const RecentChatsCard = ({ user }: RecentChatsCardProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { data: recentChats = [] } = useRecentChats(user);

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-secondary" />
          {t("messages")}
        </CardTitle>
        <CardDescription className="text-gray-400">
          {t("recentMessages")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentChats.map((chat: any) => (
            <div 
              key={chat.id} 
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 cursor-pointer"
              onClick={() => navigate(`/messages/${chat.sender === user?.id ? chat.recipient : chat.sender}`)}
            >
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-gray-400" />
              </div>
              <div>
                <p className="text-white font-medium">
                  {chat.sender === user?.id ? chat.recipient : chat.sender}
                </p>
                <p className="text-sm text-gray-400 truncate">{chat.content}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};