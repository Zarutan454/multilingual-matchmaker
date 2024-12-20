import { Button } from "@/components/ui/button";
import { MessageCircle, Heart } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface ProfileActionsProps {
  profileId: string;
  userId?: string;
  onChatClick: () => void;
  onFavoriteClick: () => void;
  isFavorite: boolean;
}

export const ProfileActions = ({
  profileId,
  userId,
  onChatClick,
  onFavoriteClick,
  isFavorite
}: ProfileActionsProps) => {
  const { user } = useAuth();

  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Bitte melden Sie sich an, um zu chatten");
      return;
    }
    if (user.id === profileId) {
      toast.error("Sie können nicht mit sich selbst chatten");
      return;
    }
    onChatClick();
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Bitte melden Sie sich an, um Profile zu favorisieren");
      return;
    }
    onFavoriteClick();
  };

  return (
    <div className="space-y-2">
      <Button
        onClick={handleChatClick}
        variant="secondary"
        size="sm"
        className="w-full bg-[#9b87f5] hover:bg-[#7a68c3] text-white"
      >
        <MessageCircle className="w-4 h-4 mr-2" />
        Chat starten
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="w-full text-white hover:bg-white/20"
        onClick={handleFavoriteClick}
      >
        <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
      </Button>
    </div>
  );
};