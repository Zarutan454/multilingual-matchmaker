import { Navbar } from "../components/Navbar";
import { SearchBar } from "../components/search/SearchBar";
import { ProfileGrid } from "../components/profile/ProfileGrid";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChatWindow } from "../components/messaging/ChatWindow";
import { Profile } from "@/types/profile";
import { ProfileRow } from "@/types/profile/supabaseTypes";
import { transformProfile } from "@/utils/transformers";

export default function Listings() {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [orientation, setOrientation] = useState("");

  const { data: profiles = [], isLoading } = useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .not('avatar_url', 'is', null);

      if (error) {
        console.error('Error fetching profiles:', error);
        throw error;
      }

      return (data as ProfileRow[]).map(profile => transformProfile(profile));
    }
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
    setCountry(country);
    setState(state);
    setOrientation(orientation);
  };

  const filteredProfiles = profiles.filter((profile: Profile) => {
    const matchesSearch = !searchTerm || 
      (profile.name && profile.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = !location || 
      (profile.location && profile.location.toLowerCase().includes(location.toLowerCase()));
    
    const matchesCategory = !category || 
      (profile.category && profile.category.toLowerCase().includes(category.toLowerCase()));
    
    const matchesCountry = !country || 
      (profile.location && profile.location.toLowerCase().includes(country.toLowerCase()));
    
    const matchesState = !state || 
      (profile.location && profile.location.toLowerCase().includes(state.toLowerCase()));
    
    const matchesOrientation = !orientation || 
      (profile.serviceCategories && profile.serviceCategories.includes(orientation));

    return matchesSearch && matchesLocation && matchesCategory && 
           matchesCountry && matchesState && matchesOrientation;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9b87f5]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-black">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="mb-12">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <ProfileGrid 
          profiles={filteredProfiles}
          onChatClick={handleChatClick}
        />
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
    </div>
  );
}