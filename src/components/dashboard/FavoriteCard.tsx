import { Users } from "lucide-react";
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
      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors duration-200"
      onClick={() => onProfileClick(favorite.profile.id)}
    >
      <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
        {favorite.profile.avatar_url ? (
          <img
            src={favorite.profile.avatar_url}
            alt={favorite.profile.full_name || ''}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <Users className="h-5 w-5 text-gray-400" />
        )}
      </div>
      <div>
        <p className="text-white font-medium">{favorite.profile.full_name}</p>
        <p className="text-sm text-gray-400">{favorite.profile.location}</p>
      </div>
    </div>
  );
};