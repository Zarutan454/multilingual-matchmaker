import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChatList } from "./ChatList";
import { ChatInput } from "./ChatInput";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ChatWindowProps {
  recipientId: string;
  recipientName: string;
}

export const ChatWindow = ({ recipientId, recipientName }: ChatWindowProps) => {
  const { user } = useAuth();
  const { t } = useLanguage();

  // Beispiel-Nachrichten (später durch echte Daten ersetzen)
  const messages = [
    {
      id: "1",
      content: "Hallo, wie geht es dir?",
      sender: user?.id || "",
      timestamp: new Date(),
      avatarUrl: user?.user_metadata?.avatar_url,
    },
    {
      id: "2",
      content: "Mir geht es gut, danke!",
      sender: recipientId,
      timestamp: new Date(),
    },
  ];

  const handleSendMessage = (message: string) => {
    console.log("Sending message:", message);
    // Hier später die echte Messaging-Logik implementieren
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-[#1a1a1a] border-neutral-800">
      <CardHeader className="border-b border-neutral-800">
        <CardTitle className="text-white">{recipientName}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ChatList messages={messages} currentUserId={user?.id || ""} />
        <ChatInput onSendMessage={handleSendMessage} />
      </CardContent>
    </Card>
  );
};