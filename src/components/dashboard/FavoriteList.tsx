import { FavoriteCard } from "./FavoriteCard";
import { Profile } from "@/types/favorites";
import { useState } from "react";

interface FavoriteData {
  id: string;
  profile: Profile;
}

interface FavoriteListProps {
  favorites: FavoriteData[];
  onProfileClick: (profileId: string) => void;
  emptyMessage: string;
}

export const FavoriteList = ({ favorites: initialFavorites, onProfileClick, emptyMessage }: FavoriteListProps) => {
  const [favorites, setFavorites] = useState(initialFavorites);

  const handleRemove = (favoriteId: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== favoriteId));
  };

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
          onRemove={handleRemove}
        />
      ))}
    </div>
  );
};