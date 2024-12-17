import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search, MapPin, Grid } from "lucide-react";

interface SearchBarProps {
  onSearch: (searchTerm: string, location: string, category: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm, location, category);
  };

  return (
    <div className="bg-[#1A1F2C]/80 p-6 rounded-lg backdrop-blur-md border border-[#9b87f5]/30 shadow-[0_0_15px_rgba(155,135,245,0.2)]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Nach Begleitung suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-black/50 border-[#9b87f5]/30 text-white placeholder-white/50 focus:border-[#9b87f5] focus:ring-[#9b87f5]/20"
          />
        </div>
        
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Standort"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10 bg-black/50 border-[#9b87f5]/30 text-white placeholder-white/50 focus:border-[#9b87f5] focus:ring-[#9b87f5]/20"
          />
        </div>
        
        <div className="relative">
          <Grid className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Kategorie"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="pl-10 bg-black/50 border-[#9b87f5]/30 text-white placeholder-white/50 focus:border-[#9b87f5] focus:ring-[#9b87f5]/20"
          />
        </div>
      </div>
      
      <div className="mt-4 flex justify-center">
        <Button
          onClick={handleSearch}
          className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-8"
        >
          <Search className="mr-2 h-4 w-4" />
          Suchen
        </Button>
      </div>
    </div>
  );
};