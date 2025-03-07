import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFavorites } from "@/hooks/useFavorites";
import { toast } from "sonner";
import { Loader } from "./Loader";
import { FavoriteList } from "./FavoriteList";

export const FavoritesCard = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { data: favorites = [], isLoading, error } = useFavorites();

  const handleProfileClick = (profileId: string) => {
    if (!profileId) {
      console.error("No profile ID provided");
      return;
    }

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

  if (error) {
    console.error("Error fetching favorites:", error);
    return (
      <Card className="bg-gray-900 border-gray-800">
        <CardContent>
          <p className="text-red-500 text-center py-4">{t("errorLoadingFavorites")}</p>
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
        <FavoriteList
          favorites={favorites}
          onProfileClick={handleProfileClick}
          emptyMessage={t("noFavoritesSelected")}
        />
      </CardContent>
    </Card>
  );
};