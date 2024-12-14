import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChatWindow } from "../messaging/ChatWindow";
import { SearchBar } from "../search/SearchBar";
import { ProfileGrid } from "../profile/ProfileGrid";
import { Profile } from "../profile/types";

const featuredProfiles: Profile[] = [
  {
    id: 1,
    name: "Sophie",
    image: "/lovable-uploads/da17ddfa-149e-442c-bd33-ea6287b02581.png",
    category: "VIP Begleitung",
    location: "München",
    coordinates: { lat: 48.137154, lng: 11.576124 },
    status: "online",
    rating: 4.9,
    reviews: 124,
    languages: ["Deutsch", "Englisch"],
    age: 25
  },
  {
    id: 2,
    name: "Emma",
    image: "/lovable-uploads/fe01f460-75ee-475d-8e6c-efb6244e2622.png",
    category: "Premium Escort",
    location: "Berlin",
    coordinates: { lat: 52.520008, lng: 13.404954 },
    status: "offline",
    rating: 4.8,
    reviews: 89,
    languages: ["Deutsch", "Französisch"],
    age: 23
  },
  {
    id: 3,
    name: "Julia",
    image: "/lovable-uploads/5a72d1e4-e990-4665-8f3a-c72bef742a3c.png",
    category: "Dinner Date",
    location: "Hamburg",
    coordinates: { lat: 53.551086, lng: 9.993682 },
    status: "online",
    rating: 4.7,
    reviews: 156,
    languages: ["Deutsch", "Italienisch"],
    age: 27
  },
  {
    id: 4,
    name: "Laura",
    image: "/lovable-uploads/0fee5c22-13f5-4317-835d-751e10816c40.png",
    category: "Event Begleitung",
    location: "Frankfurt",
    coordinates: { lat: 50.110924, lng: 8.682127 },
    status: "offline",
    rating: 4.9,
    reviews: 201,
    languages: ["Deutsch", "Spanisch"],
    age: 24
  },
  {
    id: 5,
    name: "Marie",
    image: "/lovable-uploads/3f84bf9b-9940-48fd-b090-c8c4ff825b87.png",
    category: "Reisebegleitung",
    location: "Köln",
    coordinates: { lat: 50.937531, lng: 6.960279 },
    status: "online",
    rating: 4.8,
    reviews: 167,
    languages: ["Deutsch", "Russisch"],
    age: 26
  }
];

export const FeaturedProfiles = () => {
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [filteredProfiles, setFilteredProfiles] = useState(featuredProfiles);

  const handleChatClick = (e: React.MouseEvent, profileId: number) => {
    e.stopPropagation();
    setSelectedProfile(profileId);
    setIsChatOpen(true);
  };

  const handleSearch = (searchTerm: string, location: string, category: string) => {
    const filtered = featuredProfiles.filter((profile) => {
      const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = location === "" || profile.location.toLowerCase().includes(location.toLowerCase());
      const matchesCategory = category === "" || profile.category.toLowerCase().includes(category.toLowerCase());
      return matchesSearch && matchesLocation && matchesCategory;
    });
    setFilteredProfiles(filtered);
  };

  return (
    <section id="featured" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          UNSERE PREMIUM BEGLEITUNG
        </h2>
        
        <SearchBar onSearch={handleSearch} />

        <ProfileGrid 
          profiles={filteredProfiles}
          onChatClick={handleChatClick}
        />
      </div>

      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedProfile && (
            <ChatWindow
              recipientId={selectedProfile.toString()}
              recipientName={featuredProfiles.find(p => p.id === selectedProfile)?.name || ""}
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
