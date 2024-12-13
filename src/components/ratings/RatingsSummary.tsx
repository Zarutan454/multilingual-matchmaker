import { Star } from "lucide-react";
import { Progress } from "../ui/progress";

interface RatingsSummaryProps {
  averageRating: number;
  totalRatings: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

export const RatingsSummary = ({
  averageRating,
  totalRatings,
  ratingDistribution,
}: RatingsSummaryProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold">{averageRating.toFixed(1)}</div>
          <div className="flex items-center justify-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= Math.round(averageRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-gray-500">
            {totalRatings} {totalRatings === 1 ? "rating" : "ratings"}
          </div>
        </div>
        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center gap-2">
              <span className="text-sm w-3">{stars}</span>
              <Progress
                value={
                  totalRatings > 0
                    ? (ratingDistribution[stars as keyof typeof ratingDistribution] /
                        totalRatings) *
                      100
                    : 0
                }
                className="h-2"
              />
              <span className="text-sm w-8">
                {ratingDistribution[stars as keyof typeof ratingDistribution]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};