import { Search, MapPin, Grid2x2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface SearchBarProps {
  onSearch: (searchTerm: string, location: string, category: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const categories = [
    { id: "massage", label: "Massage" },
    { id: "event", label: "Eventbegleitung" },
    { id: "erotic", label: "Erotische Treffen" },
    { id: "hotel", label: "Hotelbesuche" },
    { id: "home", label: "Hausbesuche" },
    { id: "dinner", label: "Dinner Dates" },
    { id: "travel", label: "Reisebegleitung" }
  ];

  const handleSearch = () => {
    onSearch(searchTerm, location, category);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder={t("searchProfiles")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder={t("enterLocation")}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="relative flex-1">
          <Grid2x2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="pl-10">
              <SelectValue placeholder="Kategorie wählen" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button 
          onClick={handleSearch}
          className="bg-secondary hover:bg-secondary/90"
        >
          {t("search")}
        </Button>
      </div>
    </div>
  );
};