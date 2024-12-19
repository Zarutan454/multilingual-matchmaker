import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Profile } from "@/types/favorites";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

interface FavoriteCardProps {
  favorite: {
    id: string;
    profile: Profile;
  };
  onProfileClick: (profileId: string) => void;
  onRemove?: (favoriteId: string) => void;
}

export const FavoriteCard = ({ favorite, onProfileClick, onRemove }: FavoriteCardProps) => {
  const { user } = useAuth();

  const handleRemove = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Bitte melden Sie sich an");
      return;
    }

    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('id', favorite.id);

      if (error) throw error;

      onRemove?.(favorite.id);
      toast.success("Von Favoriten entfernt");
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast.error("Fehler beim Entfernen des Favoriten");
    }
  };

  if (!favorite?.profile) {
    return null;
  }

  return (
    <div 
      className="flex items-center justify-between gap-4 p-4 rounded-lg bg-black/50 backdrop-blur-sm border border-neutral-800 cursor-pointer hover:bg-black/70 transition-colors"
      onClick={() => onProfileClick(favorite.profile.id)}
    >
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={favorite.profile.avatar_url || undefined} />
          <AvatarFallback>
            {favorite.profile.full_name?.[0] || "?"}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium text-white">
            {favorite.profile.full_name || "Unnamed"}
          </h3>
          {favorite.profile.location && (
            <p className="text-sm text-gray-400">{favorite.profile.location}</p>
          )}
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:bg-white/20"
        onClick={handleRemove}
      >
        <Heart className="h-5 w-5 fill-red-500 text-red-500" />
      </Button>
    </div>
  );
};