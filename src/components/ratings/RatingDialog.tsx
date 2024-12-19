import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

interface RatingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  providerId: string;
  serviceId: string;
}

export const RatingDialog = ({ isOpen, onClose, providerId, serviceId }: RatingDialogProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error(t("pleaseSelectRating"));
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('ratings')
        .insert([
          {
            provider_id: providerId,
            service_id: serviceId,
            rating,
            comment,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      toast.success(t("ratingSubmitted"));
      onClose();
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast.error(t("errorSubmittingRating"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("rateService")}</DialogTitle>
          <DialogDescription>
            {t("shareYourExperience")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center justify-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-8 h-8 cursor-pointer transition-colors ${
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
            placeholder={t("writeYourReview")}
            className="min-h-[100px]"
          />

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              {t("cancel")}
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting || rating === 0}
            >
              {t("submit")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};