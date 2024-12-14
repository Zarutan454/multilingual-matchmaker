import { useNavigate } from "react-router-dom";
import { MapPin, MessageCircle, Star, Clock, Users } from "lucide-react";
import { LocationDistance } from "../location/LocationDistance";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChatWindow } from "../messaging/ChatWindow";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { SearchBar } from "../search/SearchBar";

const featuredProfiles = [
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
  const navigate = useNavigate();
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [filteredProfiles, setFilteredProfiles] = useState(featuredProfiles);

  const handleProfileClick = (profileId: number) => {
    navigate(`/provider/${profileId}`);
  };

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {filteredProfiles.map((profile) => (
            <div 
              key={profile.id}
              className="group relative overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-105 bg-gray-900/50 backdrop-blur-sm"
              onClick={() => handleProfileClick(profile.id)}
            >
              <div className="aspect-[3/4] relative">
                <img 
                  src={profile.image} 
                  alt={profile.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-dark opacity-60" />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <Badge 
                    variant={profile.status === "online" ? "secondary" : "outline"}
                    className={`${
                      profile.status === "online" 
                        ? "bg-green-500/20 text-green-300 border-green-500/50" 
                        : "bg-gray-500/20 text-gray-300 border-gray-500/50"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full mr-2 ${
                      profile.status === "online" ? "bg-green-500" : "bg-gray-500"
                    }`} />
                    {profile.status === "online" ? "Online" : "Offline"}
                  </Badge>
                </div>

                {/* Featured Badge */}
                <Badge 
                  className="absolute top-4 right-4 bg-secondary/90 text-white border-none"
                >
                  FEATURED
                </Badge>

                {/* Profile Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
                  <h3 className="text-xl font-bold mb-1 text-white">{profile.name}</h3>
                  <p className="text-sm text-gray-300 mb-2">{profile.age} Jahre</p>
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <MapPin className="w-4 h-4" />
                      {profile.location}
                    </div>
                    <LocationDistance 
                      targetLat={profile.coordinates.lat} 
                      targetLng={profile.coordinates.lng} 
                    />
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{profile.rating} ({profile.reviews})</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Users className="w-4 h-4" />
                      <span>{profile.languages.join(", ")}</span>
                    </div>
                  </div>

                  {profile.status === "online" && (
                    <Button
                      onClick={(e) => handleChatClick(e, profile.id)}
                      variant="secondary"
                      size="sm"
                      className="w-full mt-3 bg-accent hover:bg-accent-hover"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat starten
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