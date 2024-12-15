import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Profile } from "@/types/favorites";

interface FavoriteCardProps {
  favorite: {
    id: string;
    profile: Profile;
  };
  onProfileClick: (profileId: string) => void;
}

export const FavoriteCard = ({ favorite, onProfileClick }: FavoriteCardProps) => {
  return (
    <div 
      className="flex items-center gap-4 p-4 rounded-lg bg-black/50 backdrop-blur-sm border border-neutral-800 cursor-pointer hover:bg-black/70 transition-colors"
      onClick={() => onProfileClick(favorite.profile.id)}
    >
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
  );
};