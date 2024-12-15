import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { User } from "@supabase/supabase-js";
import { useFavorites } from "@/hooks/useFavorites";

interface FavoritesCardProps {
  user: User | null;
}

export const FavoritesCard = ({ user }: FavoritesCardProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { data: favorites = [] } = useFavorites(user);

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Star className="h-5 w-5 text-secondary" />
          {t("favorites")}
        </CardTitle>
        <CardDescription className="text-gray-400">
          {t("yourFavorites")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {favorites.map((favorite: any) => (
            <div 
              key={favorite.id} 
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 cursor-pointer"
              onClick={() => navigate(`/provider/${favorite.profiles.id}`)}
            >
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                {favorite.profiles.avatar_url ? (
                  <img 
                    src={favorite.profiles.avatar_url} 
                    alt="" 
                    className="w-full h-full rounded-full object-cover" 
                  />
                ) : (
                  <Users className="h-5 w-5 text-gray-400" />
                )}
              </div>
              <div>
                <p className="text-white font-medium">{favorite.profiles.full_name}</p>
                <p className="text-sm text-gray-400">{favorite.profiles.location}</p>
              </div>
            </div>
          ))}
          {favorites.length === 0 && (
            <p className="text-gray-400 text-center py-4">Keine Favoriten vorhanden</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};