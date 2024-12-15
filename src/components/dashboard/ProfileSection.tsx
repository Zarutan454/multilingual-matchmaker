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
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{profile?.full_name || ""}</h1>
                <p className="text-gray-400 mb-4">{profile?.bio || ""}</p>
                {profile?.location && (
                  <p className="text-gray-400">{profile.location}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {profile?.age && (
                  <div>
                    <span className="text-gray-400">{t("age")}: </span>
                    <span>{profile.age} {t("years")}</span>
                  </div>
                )}
                {profile?.gender && (
                  <div>
                    <span className="text-gray-400">{t("gender")}: </span>
                    <span>{profile.gender}</span>
                  </div>
                )}
                {profile?.height && (
                  <div>
                    <span className="text-gray-400">{t("height")}: </span>
                    <span>{profile.height}</span>
                  </div>
                )}
                {profile?.bust_size && (
                  <div>
                    <span className="text-gray-400">{t("bustSize")}: </span>
                    <span>{profile.bust_size}</span>
                  </div>
                )}
                {profile?.body_type && (
                  <div>
                    <span className="text-gray-400">{t("bodyType")}: </span>
                    <span>{profile.body_type}</span>
                  </div>
                )}
                {profile?.dress_size && (
                  <div>
                    <span className="text-gray-400">{t("dressSize")}: </span>
                    <span>{profile.dress_size}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{t("appearance")}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {profile?.hair_color && profile?.hair_length && profile?.hair_type && (
                    <div>
                      <span className="text-gray-400">{t("hair")}: </span>
                      <span>{`${profile.hair_color}, ${profile.hair_length}, ${profile.hair_type}`}</span>
                    </div>
                  )}
                  {profile?.eye_color && (
                    <div>
                      <span className="text-gray-400">{t("eyeColor")}: </span>
                      <span>{profile.eye_color}</span>
                    </div>
                  )}
                  {profile?.skin_tone && (
                    <div>
                      <span className="text-gray-400">{t("skinTone")}: </span>
                      <span>{profile.skin_tone}</span>
                    </div>
                  )}
                  {profile?.grooming && (
                    <div>
                      <span className="text-gray-400">{t("grooming")}: </span>
                      <span>{profile.grooming}</span>
                    </div>
                  )}
                </div>
              </div>

              {profile?.languages && profile.languages.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">{t("languages")}</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.languages.map((language, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-800 rounded-full text-sm">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};