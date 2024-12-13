import { useState } from "react";
import { Star } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";

interface RatingInputProps {
  providerId: string;
  onRatingSubmit: (rating: number, comment: string) => void;
}

export const RatingInput = ({ providerId, onRatingSubmit }: RatingInputProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const { t } = useLanguage();

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error(t("pleaseSelectRating"));
      return;
    }
    onRatingSubmit(rating, comment);
    setRating(0);
    setComment("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-6 h-6 cursor-pointer ${
              star <= (hoveredRating || rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
          />
        ))}
      </div>
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder={t("ratingComment")}
        className="h-24"
      />
      <Button onClick={handleSubmit} className="w-full">
        {t("submitRating")}
      </Button>
    </div>
  );
};