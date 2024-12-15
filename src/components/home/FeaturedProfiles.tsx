import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChatWindow } from "../messaging/ChatWindow";
import { SearchBar } from "../search/SearchBar";
import { ProfileGrid } from "../profile/ProfileGrid";
import { Profile } from "../profile/types";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const FeaturedProfiles = () => {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

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

  const handleSearch = (searchTerm: string, location: string, category: string) => {
    setSearchTerm(searchTerm);
    setLocation(location);
    setCategory(category);
  };

  const filteredProfiles = profiles.filter((profile: Profile) => {
    const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = location === "" || profile.location.toLowerCase().includes(location.toLowerCase());
    const matchesCategory = category === "" || profile.category.toLowerCase().includes(category.toLowerCase());
    return matchesSearch && matchesLocation && matchesCategory;
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading profiles...</div>;
  }

  return (
    <section id="featured" className="py-8 bg-gradient-dark">
      <div className="container mx-auto px-4">
        <div className="-mt-16 mb-12">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          UNSERE PREMIUM BEGLEITUNG
        </h2>

        <ProfileGrid 
          profiles={filteredProfiles}
          onChatClick={handleChatClick}
        />
      </div>

      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="sm:max-w-[500px]">
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