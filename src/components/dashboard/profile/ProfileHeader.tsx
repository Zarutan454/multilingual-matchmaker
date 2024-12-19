import { Profile } from "@/types/profile";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Edit2, Check } from "lucide-react";
import { AchievementBadge } from "@/components/badges/AchievementBadge";

interface ProfileHeaderProps {
  profile: Profile | null;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  userId: string;
  onProfileUpdate: (updatedProfile: Profile) => void;
}

export const ProfileHeader = ({
  profile,
  isEditing,
  setIsEditing,
  userId,
  onProfileUpdate,
}: ProfileHeaderProps) => {
  const { t } = useLanguage();

  const achievements = [
    ...(profile?.is_verified ? ["verified"] : []),
    ...(profile?.messages_count >= 100 ? ["messages"] : []),
    ...(profile?.average_rating >= 4.5 ? ["ratings"] : []),
    ...(profile?.membership_level === "premium" ? ["premium"] : []),
    ...(profile?.membership_level === "vip" ? ["vip"] : []),
  ] as const;

  return (
    <div className="flex justify-between items-start mb-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">
          {profile?.full_name || t("yourProfile")}
        </h1>
        <div className="flex flex-wrap gap-2">
          {achievements.map((type) => (
            <AchievementBadge key={type} type={type} />
          ))}
        </div>
      </div>
      {userId === profile?.id && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              {t("save")}
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4 mr-2" />
              {t("edit")}
            </>
          )}
        </Button>
      )}
    </div>
  );
};