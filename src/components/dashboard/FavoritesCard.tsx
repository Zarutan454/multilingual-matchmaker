import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Star, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { User } from "@supabase/supabase-js";
import { useFavorites } from "@/hooks/useFavorites";
import { toast } from "sonner";

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

interface FavoritesCardProps {
  user: User | null;
}

export const FavoritesCard = ({ user }: FavoritesCardProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { data: favorites = [], isLoading, error } = useFavorites(user);

  const handleProfileClick = (profileId: string) => {
    try {
      navigate(`/provider/${profileId}`);
    } catch (error) {
      console.error("Navigation error:", error);
      toast.error(t("errorNavigating"));
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Star className="h-5 w-5 text-secondary" />
            {t("favorites")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-secondary" />
          </div>
        </CardContent>
      </Card>
    );
  }

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
          {!favorites || favorites.length === 0 ? (
            <p className="text-gray-400 text-center py-4">{t("noFavoritesSelected")}</p>
          ) : (
            favorites.map((favorite: FavoriteData) => (
              <div 
                key={favorite.id} 
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors duration-200"
                onClick={() => handleProfileClick(favorite.profile.id)}
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
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};