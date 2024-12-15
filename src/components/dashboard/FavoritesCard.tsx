import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { User } from "@supabase/supabase-js";
import { useFavorites } from "@/hooks/useFavorites";
import { toast } from "sonner";
import { Loader } from "./Loader";
import { FavoriteList } from "./FavoriteList";
import { FavoriteData } from "@/types/favorites";

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
    return <Loader />;
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
        <FavoriteList
          favorites={favorites as FavoriteData[]}
          onProfileClick={handleProfileClick}
          emptyMessage={t("noFavoritesSelected")}
        />
      </CardContent>
    </Card>
  );
};