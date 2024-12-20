import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Profile } from "./types";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChatWindow } from "@/components/messaging/ChatWindow";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { usePresence } from "@/hooks/usePresence";
import { ProfileAvatar } from "./card/ProfileAvatar";
import { ProfileInfo } from "./card/ProfileInfo";
import { ProfileActions } from "./card/ProfileActions";

interface ProfileCardProps {
  profile: Profile;
  onChatClick?: (e: React.MouseEvent, profileId: string) => void;
}

export const ProfileCard = ({ profile, onChatClick }: ProfileCardProps) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isOnline, setIsOnline] = useState(profile.status === "online");
  const [lastSeen, setLastSeen] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  usePresence();

  const handleFavoriteClick = async () => {
    try {
      if (isFavorite) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('profile_id', profile.id);
        
        if (error) throw error;
        setIsFavorite(false);
        toast.success("Von Favoriten entfernt");
      } else {
        const { error } = await supabase
          .from('favorites')
          .insert([{ profile_id: profile.id }]);
        
        if (error) throw error;
        setIsFavorite(true);
        toast.success("Zu Favoriten hinzugefügt");
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
      toast.error("Fehler beim Aktualisieren der Favoriten");
    }
  };

  return (
    <>
      <div 
        className="group relative overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-105 bg-gray-900/50 backdrop-blur-sm"
        onClick={() => navigate(`/provider/${profile.id}`)}
      >
        <div className="aspect-[3/4] relative">
          <img 
            src={profile.image} 
            alt={profile.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-dark opacity-60" />

          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
            <div className="flex items-center gap-4 mb-4">
              <ProfileAvatar 
                avatarUrl={profile.image} 
                fullName={profile.name} 
              />
              <ProfileInfo
                name={profile.name}
                age={profile.age}
                location={profile.location}
                spokenLanguages={profile.spokenLanguages}
                isOnline={isOnline}
                lastSeen={lastSeen}
              />
            </div>

            <ProfileActions
              profileId={profile.id}
              onChatClick={() => setIsChatOpen(true)}
              onFavoriteClick={handleFavoriteClick}
              isFavorite={isFavorite}
            />
          </div>
        </div>
      </div>

      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {profile.id && (
            <ChatWindow
              recipientId={profile.id}
              recipientName={profile.name}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};