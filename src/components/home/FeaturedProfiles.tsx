import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChatWindow } from "../messaging/ChatWindow";
import { SearchBar } from "../search/SearchBar";
import { ProfileGrid } from "../profile/ProfileGrid";
import { Profile } from "../profile/types";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { usePresence } from "@/hooks/usePresence";
import { toast } from "sonner";

export const FeaturedProfiles = () => {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [orientation, setOrientation] = useState("");
  const [page, setPage] = useState(0);
  const ITEMS_PER_PAGE = 12;

  usePresence();

  const { data: profiles = [], isLoading, error } = useQuery({
    queryKey: ['profiles', page, searchTerm, location, category, country, state, orientation],
    queryFn: async () => {
      try {
        let query = supabase
          .from('profiles')
          .select('*')
          .not('avatar_url', 'is', null)
          .range(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE - 1)
          .order('created_at', { ascending: false });

        // Apply filters only if they exist
        if (searchTerm) {
          query = query.ilike('full_name', `%${searchTerm}%`);
        }
        if (location) {
          query = query.ilike('location', `%${location}%`);
        }
        if (category) {
          query = query.contains('service_categories', [category]);
        }
        if (orientation) {
          query = query.contains('service_categories', [orientation]);
        }

        const { data, error } = await query;

        if (error) {
          if (error.message?.includes('timeout')) {
            toast.error('Zeitüberschreitung bei der Anfrage. Bitte versuchen Sie es erneut.');
          } else {
            toast.error('Fehler beim Laden der Profile');
          }
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
      } catch (err) {
        console.error('Error fetching profiles:', err);
        throw err;
      }
    },
    retry: 1,
    staleTime: 30000, // Cache for 30 seconds
    gcTime: 300000,   // Keep unused data in cache for 5 minutes
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
    setPage(0); // Reset to first page when searching
  };

  const filteredProfiles = profiles;

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-red-500">
        Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.
      </div>
    );
  }

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

        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-4 py-2 bg-[#9b87f5] text-white rounded disabled:opacity-50"
          >
            Zurück
          </button>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={profiles.length < ITEMS_PER_PAGE}
            className="px-4 py-2 bg-[#9b87f5] text-white rounded disabled:opacity-50"
          >
            Weiter
          </button>
        </div>
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