import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileAvatarProps {
  avatarUrl?: string;
  fullName: string;
}

export const ProfileAvatar = ({ avatarUrl, fullName }: ProfileAvatarProps) => {
  return (
    <Avatar>
      <AvatarImage src={avatarUrl || undefined} />
      <AvatarFallback>
        {fullName?.[0] || "?"}
      </AvatarFallback>
    </Avatar>
  );
};