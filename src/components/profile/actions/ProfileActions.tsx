import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star, Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface ProfileActionsProps {
  profileId: string;
  initialLikeCount: number;
  onFavoriteClick: (e: React.MouseEvent) => void;
  isFavorite: boolean;
}

export const ProfileActions = ({ 
  profileId, 
  initialLikeCount,
  onFavoriteClick,
  isFavorite 
}: ProfileActionsProps) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  useEffect(() => {
    const checkIfLiked = async () => {
      if (!user) return;
      
      const { data } = await supabase
        .from('profile_likes')
        .select('id')
        .eq('user_id', user.id)
        .eq('profile_id', profileId)
        .maybeSingle();
      
      setIsLiked(!!data);
    };

    checkIfLiked();
  }, [user, profileId]);

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Bitte melden Sie sich an, um Profile zu liken");
      return;
    }

    try {
      if (isLiked) {
        const { error } = await supabase
          .from('profile_likes')
          .delete()
          .eq('user_id', user.id)
          .eq('profile_id', profileId);
        
        if (error) throw error;
        setIsLiked(false);
        setLikeCount(prev => prev - 1);
        toast.success("Like entfernt");
      } else {
        const { error } = await supabase
          .from('profile_likes')
          .insert([
            { user_id: user.id, profile_id: profileId }
          ]);
        
        if (error) throw error;
        setIsLiked(true);
        setLikeCount(prev => prev + 1);
        toast.success("Profil geliked");
      }
    } catch (error) {
      console.error('Error updating likes:', error);
      toast.error("Fehler beim Aktualisieren des Likes");
    }
  };

  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:bg-white/20"
        onClick={onFavoriteClick}
      >
        <Star className={`h-6 w-6 ${isFavorite ? 'fill-yellow-500 text-yellow-500' : ''}`} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:bg-white/20"
        onClick={handleLikeClick}
      >
        <Heart className={`h-6 w-6 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
        <span className="absolute -bottom-4 text-xs font-semibold">
          {likeCount}
        </span>
      </Button>
    </div>
  );
};