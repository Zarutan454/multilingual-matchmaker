import { Profile } from "@/types/profile/types";
import { ImageUploadSection } from "./ImageUploadSection";
import { Card } from "@/components/ui/card";
import { ProfileHeader } from "./profile/ProfileHeader";
import { ProfileDisplay } from "./profile/ProfileDisplay";
import { ProfileForm } from "./profile/ProfileForm";

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
  return (
    <Card className="bg-black/50 backdrop-blur-sm border-neutral-800 p-6">
      <ProfileHeader
        profile={profile}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        userId={userId}
        onProfileUpdate={handleProfileUpdate}
      />

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
            <ProfileForm
              profile={profile}
              userId={userId}
              onProfileUpdate={handleProfileUpdate}
            />
          ) : (
            <ProfileDisplay profile={profile} />
          )}
        </div>
      </div>
    </Card>
  );
};