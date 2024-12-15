import { Profile } from "@/types/profile";
import { ImageUploadSection } from "./ImageUploadSection";
import { ProfileEditForm } from "./ProfileEditForm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProfileSectionProps {
  profile: Profile | null;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  handleAvatarUpdate: (url: string) => Promise<void>;
  handleProfileUpdate: (updatedProfile: Profile) => void;
  userId: string;
}

export const ProfileSection = ({
  profile,
  isEditing,
  setIsEditing,
  handleAvatarUpdate,
  handleProfileUpdate,
  userId,
}: ProfileSectionProps) => {
  const { t } = useLanguage();

  return (
    <Card className="bg-black/50 backdrop-blur-sm border-neutral-800 p-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold">{t("profile")}</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Edit className="w-4 h-4 mr-2" />
          {isEditing ? t("cancel") : t("edit")}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <div className="relative group">
            <img 
              src={profile?.avatar_url || "/placeholder.svg"} 
              alt={profile?.full_name || ""}
              className="w-full aspect-square object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-lg">
              <ImageUploadSection
                userId={userId}
                onImageUploaded={handleAvatarUpdate}
                type="avatar"
              />
            </div>
          </div>
        </div>

        <div className="flex-1">
          {isEditing ? (
            <ProfileEditForm
              profile={profile}
              onProfileUpdate={handleProfileUpdate}
            />
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-2">{profile?.full_name || ""}</h1>
              <p className="text-gray-400 mb-4">{profile?.bio || ""}</p>
              {profile?.location && (
                <p className="text-gray-400">{profile.location}</p>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
};