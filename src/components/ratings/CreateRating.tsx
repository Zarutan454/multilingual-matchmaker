import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface CreateRatingProps {
  providerId: string;
  onRatingCreated: () => void;
}

export const CreateRating = ({ providerId, onRatingCreated }: CreateRatingProps) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!user) {
      toast.error(t("pleaseLoginToRate"));
      return;
    }

    if (rating === 0) {
      toast.error(t("pleaseSelectRating"));
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("ratings").insert([
        {
          provider_id: providerId,
          user_id: user.id,
          rating,
          comment,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      toast.success(t("ratingSubmitted"));
      setRating(0);
      setComment("");
      onRatingCreated();
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast.error(t("errorSubmittingRating"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 p-4 bg-black/20 rounded-lg">
      <h3 className="text-lg font-semibold">{t("writeReview")}</h3>
      
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-8 h-8 cursor-pointer transition-colors ${
              star <= (hoveredRating || rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-400"
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
        placeholder={t("writeYourReview")}
        className="min-h-[100px]"
      />

      <Button 
        onClick={handleSubmit} 
        disabled={isSubmitting || rating === 0}
        className="w-full"
      >
        {t("submitReview")}
      </Button>
    </div>
  );
};