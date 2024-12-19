import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/contexts/LanguageContext";
import { Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface RatingsSummaryProps {
  providerId: string;
}

export const RatingsSummary = ({ providerId }: RatingsSummaryProps) => {
  const { t } = useLanguage();

  const { data: summary } = useQuery({
    queryKey: ["ratings-summary", providerId],
    queryFn: async () => {
      const { data: ratings, error } = await supabase
        .from("ratings")
        .select("rating")
        .eq("provider_id", providerId);

      if (error) throw error;

      const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      let total = 0;
      let sum = 0;

      ratings.forEach((r) => {
        distribution[r.rating as keyof typeof distribution]++;
        total++;
        sum += r.rating;
      });

      return {
        averageRating: total > 0 ? sum / total : 0,
        totalRatings: total,
        distribution,
      };
    },
  });

  if (!summary) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold">
            {summary.averageRating.toFixed(1)}
          </div>
          <div className="flex items-center justify-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= Math.round(summary.averageRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-gray-500">
            {summary.totalRatings} {t("reviews")}
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center gap-2">
              <span className="text-sm w-3">{stars}</span>
              <Progress
                value={
                  summary.totalRatings > 0
                    ? (summary.distribution[stars as keyof typeof summary.distribution] /
                        summary.totalRatings) *
                      100
                    : 0
                }
                className="h-2"
              />
              <span className="text-sm w-8">
                {summary.distribution[stars as keyof typeof summary.distribution]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};