import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChatWindow } from "../messaging/ChatWindow";
import { ProfileGrid } from "../profile/ProfileGrid";
import { usePresence } from "@/hooks/usePresence";
import { ProfileFilters } from "./featured/ProfileFilters";
import { ProfilePagination } from "./featured/ProfilePagination";
import { useProfiles } from "./featured/useProfiles";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 12;

export const FeaturedProfiles = () => {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [orientation, setOrientation] = useState("");
  const [page, setPage] = useState(0);

  usePresence();

  const { data: profiles = [], isLoading, error } = useProfiles({
    page,
    searchTerm,
    location,
    category,
    orientation,
    itemsPerPage: ITEMS_PER_PAGE
  });

  const handleChatClick = (e: React.MouseEvent, profileId: string) => {
    e.stopPropagation();
    setSelectedProfile(profileId);
    setIsChatOpen(true);
  };

  const handleSearch = (
    searchTerm: string,
    location: string,
    category: string,
    country: string,
    state: string,
    orientation: string
  ) => {
    setSearchTerm(searchTerm);
    setLocation(location);
    setCategory(category);
    setOrientation(orientation);
    setPage(0);
  };

  if (error) {
    console.error('Error in FeaturedProfiles:', error);
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-red-500 space-y-4">
        <p>Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-[#9b87f5] text-white rounded hover:bg-[#7a68c3]"
        >
          Erneut versuchen
        </button>
      </div>
    );
  }

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      <div className="container mx-auto px-4 relative z-10">
        <ProfileFilters onSearch={handleSearch} />
        
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          UNSERE <span className="text-[#9b87f5]">PREMIUM</span> BEGLEITUNG
        </h2>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9b87f5]"></div>
          </div>
        ) : (
          <>
            <ProfileGrid 
              profiles={profiles}
              onChatClick={handleChatClick}
            />

            <ProfilePagination 
              page={page}
              setPage={setPage}
              hasMore={profiles.length >= ITEMS_PER_PAGE}
            />
          </>
        )}
      </div>

      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="sm:max-w-[500px] bg-[#1A1F2C]/95 backdrop-blur-md border-[#9b87f5]/30">
          {selectedProfile && (
            <ChatWindow
              recipientId={selectedProfile}
              recipientName={profiles.find(p => p.id === selectedProfile)?.name || ""}
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};