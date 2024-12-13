import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  avatarUrl?: string;
}

interface ChatListProps {
  messages: Message[];
  currentUserId: string;
}

export const ChatList = ({ messages, currentUserId }: ChatListProps) => {
  const { t } = useLanguage();

  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] text-neutral-400">
        {t("noMessages")}
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px] px-4">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          content={message.content}
          sender={message.sender}
          timestamp={message.timestamp}
          isOwn={message.sender === currentUserId}
          avatarUrl={message.avatarUrl}
        />
      ))}
    </ScrollArea>
  );
};