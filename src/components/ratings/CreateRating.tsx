import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RatingCriteria } from "@/types/ratings";

interface CreateRatingProps {
  providerId: string;
  onRatingCreated: () => void;
}

export const CreateRating = ({ providerId, onRatingCreated }: CreateRatingProps) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [overallRating, setOverallRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [criteria, setCriteria] = useState<RatingCriteria>({
    communication: 0,
    professionalism: 0,
    cleanliness: 0,
    location: 0,
    value: 0,
  });

  const handleCriteriaChange = (category: keyof RatingCriteria, value: number[]) => {
    setCriteria(prev => ({
      ...prev,
      [category]: value[0]
    }));
  };

  const calculateOverallRating = () => {
    const values = Object.values(criteria);
    return values.reduce((a, b) => a + b, 0) / values.length;
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error(t("pleaseLoginToRate"));
      return;
    }

    const calculatedOverallRating = calculateOverallRating();
    if (calculatedOverallRating === 0) {
      toast.error(t("pleaseRateAllCriteria"));
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("ratings").insert([
        {
          provider_id: providerId,
          user_id: user.id,
          overall_rating: calculatedOverallRating,
          criteria,
          comment,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      toast.success(t("ratingSubmitted"));
      setOverallRating(0);
      setComment("");
      setCriteria({
        communication: 0,
        professionalism: 0,
        cleanliness: 0,
        location: 0,
        value: 0,
      });
      onRatingCreated();
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast.error(t("errorSubmittingRating"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const criteriaLabels: Record<keyof RatingCriteria, string> = {
    communication: t("communicationRating"),
    professionalism: t("professionalismRating"),
    cleanliness: t("cleanlinessRating"),
    location: t("locationRating"),
    value: t("valueRating"),
  };

  return (
    <Card className="space-y-4 bg-black/20">
      <CardHeader>
        <CardTitle>{t("writeReview")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(criteriaLabels).map(([key, label]) => (
          <div key={key} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{label}</span>
              <span className="text-sm text-muted-foreground">
                {criteria[key as keyof RatingCriteria]}/5
              </span>
            </div>
            <Slider
              value={[criteria[key as keyof RatingCriteria]]}
              onValueChange={(value) => handleCriteriaChange(key as keyof RatingCriteria, value)}
              max={5}
              step={0.5}
              className="w-full"
            />
          </div>
        ))}

        <div className="space-y-2">
          <label className="text-sm font-medium">{t("comment")}</label>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t("writeYourReview")}
            className="min-h-[100px]"
          />
        </div>

        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting || calculateOverallRating() === 0}
          className="w-full"
        >
          {t("submitReview")}
        </Button>
      </CardContent>
    </Card>
  );
};