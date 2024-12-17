import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChatWindow } from "../messaging/ChatWindow";
import { SearchBar } from "../search/SearchBar";
import { ProfileGrid } from "../profile/ProfileGrid";
import { Profile } from "../profile/types";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { usePresence } from "@/hooks/usePresence";

export const FeaturedProfiles = () => {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [orientation, setOrientation] = useState("");

  usePresence();

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

      return data.map((profile: any): Profile => ({
        id: profile.id,
        name: profile.full_name || 'Anonymous',
        image: profile.avatar_url,
        category: profile.service_categories?.[0] || 'VIP Begleitung',
        location: profile.location || 'Unknown',
        coordinates: { lat: 0, lng: 0 },
        status: profile.availability_status || 'offline',
        rating: 4.8,
        reviews: 0,
        spokenLanguages: profile.languages || ['Deutsch'],
        age: profile.age || 25,
        serviceCategories: profile.service_categories || [],
        priceRange: profile.price_range || { min: 0, max: 0 }
      }));
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
    
    // Wenn Orientierung ausgewählt wurde, prüfe ob das Profil diese Orientierung hat
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
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="-mt-16 mb-12">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          UNSERE <span className="text-[#9b87f5]">PREMIUM</span> BEGLEITUNG
        </h2>

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
    </section>
  );
};