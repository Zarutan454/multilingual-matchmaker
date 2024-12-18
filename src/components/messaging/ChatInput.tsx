import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Send, Smile } from "lucide-react";
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const onEmojiClick = (emojiObject: any) => {
    setMessage(prevMessage => prevMessage + emojiObject.emoji);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t border-neutral-800">
      <div className="flex-1 flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              type="button" 
              variant="ghost" 
              size="icon"
              className="text-gray-400 hover:text-white"
              disabled={disabled}
            >
              <Smile className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            className="w-full p-0 border-neutral-800 bg-[#1A1F2C]" 
            align="start"
          >
            <EmojiPicker
              onEmojiClick={onEmojiClick}
              theme={Theme.DARK}
              width="100%"
              height="350px"
            />
          </PopoverContent>
        </Popover>
        
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t("typeMessage")}
          className="flex-1 bg-[#222222] border-neutral-700 text-white"
          disabled={disabled}
        />
      </div>
      
      <Button 
        type="submit" 
        disabled={disabled || !message.trim()}
        className="bg-[#9b87f5] hover:bg-[#7E69AB]"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};