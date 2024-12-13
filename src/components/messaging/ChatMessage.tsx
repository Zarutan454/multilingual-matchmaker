import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  content: string;
  sender: string;
  timestamp: Date;
  isOwn: boolean;
  avatarUrl?: string;
}

export const ChatMessage = ({ content, sender, timestamp, isOwn, avatarUrl }: ChatMessageProps) => {
  return (
    <div className={cn(
      "flex gap-3 mb-4",
      isOwn ? "flex-row-reverse" : "flex-row"
    )}>
      <Avatar className="h-8 w-8">
        <AvatarImage src={avatarUrl} />
        <AvatarFallback>{sender[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className={cn(
        "max-w-[70%] rounded-lg p-3",
        isOwn ? "bg-[#9b87f5] text-white" : "bg-[#222222] text-white"
      )}>
        <p className="text-sm">{content}</p>
        <span className="text-xs opacity-70">
          {new Date(timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};