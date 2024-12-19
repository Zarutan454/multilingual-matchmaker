import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/contexts/LanguageContext";
import { Star } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface Rating {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  user: {
    full_name: string;
    avatar_url: string;
  };
}

interface RatingsListProps {
  providerId: string;
}

export const RatingsList = ({ providerId }: RatingsListProps) => {
  const { t } = useLanguage();

  const { data: ratings, isLoading } = useQuery({
    queryKey: ["ratings", providerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ratings")
        .select(`
          id,
          rating,
          comment,
          created_at,
          user:profiles!ratings_user_id_fkey (
            full_name,
            avatar_url
          )
        `)
        .eq("provider_id", providerId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      return (data || []).map((item: any) => ({
        id: item.id,
        rating: item.rating,
        comment: item.comment,
        created_at: item.created_at,
        user: {
          full_name: item.user.full_name,
          avatar_url: item.user.avatar_url
        }
      })) as Rating[];
    },
  });

  if (isLoading) {
    return <div className="animate-pulse">{t("loadingRatings")}</div>;
  }

  if (!ratings?.length) {
    return <p className="text-center text-gray-500">{t("noRatingsYet")}</p>;
  }

  return (
    <ScrollArea className="h-[400px] rounded-md border p-4">
      <div className="space-y-4">
        {ratings.map((rating, index) => (
          <div key={rating.id}>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{rating.user.full_name}</p>
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
                {new Date(rating.created_at).toLocaleDateString()}
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