import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { de } from "date-fns/locale";

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
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarImage src={avatarUrl} />
        <AvatarFallback>{sender[0]?.toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className={cn(
        "max-w-[70%] rounded-lg p-3",
        isOwn 
          ? "bg-[#9b87f5] text-white" 
          : "bg-[#222222] text-white"
      )}>
        <p className="text-sm break-words">{content}</p>
        <span className="text-xs opacity-70 mt-1 block">
          {format(timestamp, "HH:mm", { locale: de })}
        </span>
      </div>
    </div>
  );
};