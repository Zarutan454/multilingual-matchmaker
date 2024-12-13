import { Star } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

interface Rating {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  userName: string;
}

interface RatingsListProps {
  ratings: Rating[];
}

export const RatingsList = ({ ratings }: RatingsListProps) => {
  const { t } = useLanguage();

  if (ratings.length === 0) {
    return <p className="text-center text-gray-500">{t("noRatingsYet")}</p>;
  }

  return (
    <ScrollArea className="h-[400px] rounded-md border p-4">
      <div className="space-y-4">
        {ratings.map((rating, index) => (
          <div key={rating.id}>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{rating.userName}</p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= rating.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(rating.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="mt-2 text-gray-600">{rating.comment}</p>
            {index < ratings.length - 1 && (
              <Separator className="my-4" />
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};