import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { RatingInput } from "../ratings/RatingInput";
import { RatingsList } from "../ratings/RatingsList";
import { RatingsSummary } from "../ratings/RatingsSummary";
import { toast } from "sonner";

interface ProviderRatingsProps {
  providerId: string;
}

export const ProviderRatings = ({ providerId }: ProviderRatingsProps) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("summary");

  const handleRatingSubmit = (rating: number, comment: string) => {
    console.log("Rating submitted:", { rating, comment, providerId });
    toast.success(t("ratingSubmitted"));
    setActiveTab("list");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("ratings")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="summary">{t("summary")}</TabsTrigger>
            <TabsTrigger value="list">{t("allRatings")}</TabsTrigger>
            <TabsTrigger value="rate" disabled={!user}>
              {t("rateProvider")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="summary">
            <RatingsSummary providerId={providerId} />
          </TabsContent>
          <TabsContent value="list">
            <RatingsList providerId={providerId} />
          </TabsContent>
          <TabsContent value="rate">
            <RatingInput providerId={providerId} onRatingSubmit={handleRatingSubmit} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};