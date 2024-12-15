import { FavoriteCard } from "./FavoriteCard";

interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  location: string | null;
}

interface FavoriteData {
  id: string;
  profile: Profile;
}

interface FavoriteListProps {
  favorites: FavoriteData[];
  onProfileClick: (profileId: string) => void;
  emptyMessage: string;
}

export const FavoriteList = ({ favorites, onProfileClick, emptyMessage }: FavoriteListProps) => {
  if (!favorites || favorites.length === 0) {
    return <p className="text-gray-400 text-center py-4">{emptyMessage}</p>;
  }

  return (
    <div className="space-y-4">
      {favorites.map((favorite) => (
        <FavoriteCard
          key={favorite.id}
          favorite={favorite}
          onProfileClick={onProfileClick}
        />
      ))}
    </div>
  );
};