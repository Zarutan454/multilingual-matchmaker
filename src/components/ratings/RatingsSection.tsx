import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { CreateRating } from "./CreateRating";
import { RatingsList } from "./RatingsList";
import { RatingsSummary } from "./RatingsSummary";

interface RatingsSectionProps {
  providerId: string;
}

export const RatingsSection = ({ providerId }: RatingsSectionProps) => {
  const { t } = useLanguage();

  return (
    <Card className="p-6">
      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList>
          <TabsTrigger value="summary">{t("summary")}</TabsTrigger>
          <TabsTrigger value="list">{t("allReviews")}</TabsTrigger>
          <TabsTrigger value="create">{t("writeReview")}</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <RatingsSummary providerId={providerId} />
        </TabsContent>

        <TabsContent value="list">
          <RatingsList providerId={providerId} />
        </TabsContent>

        <TabsContent value="create">
          <CreateRating 
            providerId={providerId}
            onRatingCreated={() => {
              // Invalidate queries to refresh the data
              window.location.reload();
            }}
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
};