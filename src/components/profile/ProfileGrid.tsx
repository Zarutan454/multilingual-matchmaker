import { Profile } from "./types";
import { ProfileCard } from "./ProfileCard";

interface ProfileGridProps {
  profiles: Profile[];
  onChatClick: (e: React.MouseEvent, profileId: number) => void;
}

export const ProfileGrid = ({ profiles, onChatClick }: ProfileGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          onChatClick={onChatClick}
        />
      ))}
    </div>
  );
};