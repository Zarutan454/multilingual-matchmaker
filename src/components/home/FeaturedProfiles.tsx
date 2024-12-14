import { useNavigate } from "react-router-dom";
import { MapPin, MessageCircle } from "lucide-react";
import { LocationDistance } from "../location/LocationDistance";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChatWindow } from "../messaging/ChatWindow";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const featuredProfiles = [
  {
    id: 1,
    name: "Sophie",
    image: "/lovable-uploads/da17ddfa-149e-442c-bd33-ea6287b02581.png",
    category: "VIP Begleitung",
    location: "München",
    coordinates: { lat: 48.137154, lng: 11.576124 },
    status: "online"
  },
  {
    id: 2,
    name: "Emma",
    image: "/lovable-uploads/fe01f460-75ee-475d-8e6c-efb6244e2622.png",
    category: "Premium Escort",
    location: "Berlin",
    coordinates: { lat: 52.520008, lng: 13.404954 },
    status: "offline"
  },
  {
    id: 3,
    name: "Julia",
    image: "/lovable-uploads/5a72d1e4-e990-4665-8f3a-c72bef742a3c.png",
    category: "Dinner Date",
    location: "Hamburg",
    coordinates: { lat: 53.551086, lng: 9.993682 },
    status: "online"
  },
  {
    id: 4,
    name: "Laura",
    image: "/lovable-uploads/0fee5c22-13f5-4317-835d-751e10816c40.png",
    category: "Event Begleitung",
    location: "Frankfurt",
    coordinates: { lat: 50.110924, lng: 8.682127 },
    status: "offline"
  },
  {
    id: 5,
    name: "Marie",
    image: "/lovable-uploads/3f84bf9b-9940-48fd-b090-c8c4ff825b87.png",
    category: "Reisebegleitung",
    location: "Köln",
    coordinates: { lat: 50.937531, lng: 6.960279 },
    status: "online"
  }
];

export const FeaturedProfiles = () => {
  const navigate = useNavigate();
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleProfileClick = (profileId: number) => {
    navigate(`/provider/${profileId}`);
  };

  const handleChatClick = (e: React.MouseEvent, profileId: number) => {
    e.stopPropagation(); // Verhindert Navigation zum Profil
    setSelectedProfile(profileId);
    setIsChatOpen(true);
  };

  return (
    <section id="featured" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          UNSERE PREMIUM BEGLEITUNG
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {featuredProfiles.map((profile) => (
            <div 
              key={profile.id}
              className="group relative overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => handleProfileClick(profile.id)}
            >
              <div className="aspect-[3/4] relative">
                <img 
                  src={profile.image} 
                  alt={profile.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{profile.name}</h3>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <MapPin className="w-4 h-4" />
                      {profile.location}
                    </div>
                    <LocationDistance 
                      targetLat={profile.coordinates.lat} 
                      targetLng={profile.coordinates.lng} 
                    />
                  </div>
                </div>
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <span className="bg-secondary/90 px-3 py-1 rounded-full text-sm text-white">
                    FEATURED
                  </span>
                  {profile.status === "online" && (
                    <Button
                      onClick={(e) => handleChatClick(e, profile.id)}
                      variant="secondary"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
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