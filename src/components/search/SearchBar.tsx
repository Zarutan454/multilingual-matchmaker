import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search, MapPin, Grid, Globe, Heart, Clock, DollarSign } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { de } from "date-fns/locale";

interface SearchBarProps {
  onSearch: (
    searchTerm: string,
    location: string,
    category: string,
    country: string,
    state: string,
    orientation: string,
    priceRange: { min: number; max: number },
    availability: Date | undefined
  ) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedOrientation, setSelectedOrientation] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedDate, setSelectedDate] = useState<Date>();

  const countries = [
    { id: "de", name: "Deutschland" },
    { id: "at", name: "Österreich" },
    { id: "ch", name: "Schweiz" }
  ];

  const germanStates = [
    "Baden-Württemberg", "Bayern", "Berlin", "Brandenburg", "Bremen",
    "Hamburg", "Hessen", "Mecklenburg-Vorpommern", "Niedersachsen",
    "Nordrhein-Westfalen", "Rheinland-Pfalz", "Saarland", "Sachsen",
    "Sachsen-Anhalt", "Schleswig-Holstein", "Thüringen"
  ];

  const austrianStates = [
    "Burgenland", "Kärnten", "Niederösterreich", "Oberösterreich",
    "Salzburg", "Steiermark", "Tirol", "Vorarlberg", "Wien"
  ];

  const swissCantons = [
    "Zürich", "Bern", "Luzern", "Uri", "Schwyz", "Obwalden", "Nidwalden",
    "Glarus", "Zug", "Freiburg", "Solothurn", "Basel-Stadt", "Basel-Landschaft",
    "Schaffhausen", "Appenzell Ausserrhoden", "Appenzell Innerrhoden",
    "St. Gallen", "Graubünden", "Aargau", "Thurgau", "Tessin", "Waadt",
    "Wallis", "Neuenburg", "Genf", "Jura"
  ];

  const orientations = [
    { id: "hetero", name: "Heterosexuell" },
    { id: "gay", name: "Schwul" },
    { id: "lesbian", name: "Lesbisch" },
    { id: "bi", name: "Bisexuell" },
    { id: "trans", name: "Transgender" },
    { id: "queer", name: "Queer" },
    { id: "lgbtq+", name: "LGBTQ+" }
  ];

  const categories = [
    { id: "dinner", name: "Dinner Date" },
    { id: "event", name: "Event Begleitung" },
    { id: "travel", name: "Reisebegleitung" },
    { id: "wellness", name: "Wellness" },
    { id: "culture", name: "Kultur" }
  ];

  const getStatesForCountry = (countryId: string) => {
    switch (countryId) {
      case "de":
        return germanStates;
      case "at":
        return austrianStates;
      case "ch":
        return swissCantons;
      default:
        return [];
    }
  };

  const handleSearch = () => {
    onSearch(
      searchTerm,
      location,
      category,
      selectedCountry,
      selectedState,
      selectedOrientation,
      priceRange,
      selectedDate
    );
  };

  return (
    <div className="bg-[#1A1F2C]/80 p-6 rounded-lg backdrop-blur-md border border-[#9b87f5]/30 shadow-[0_0_15px_rgba(155,135,245,0.2)]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="pl-10 bg-black/50 border-[#9b87f5]/30 text-white">
              <SelectValue placeholder="Land auswählen" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1F2C] border-[#9b87f5]/30">
              {countries.map((country) => (
                <SelectItem key={country.id} value={country.id} className="text-white hover:bg-[#9b87f5]/20">
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="pl-10 bg-black/50 border-[#9b87f5]/30 text-white">
              <SelectValue placeholder="Bundesland/Kanton auswählen" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1F2C] border-[#9b87f5]/30">
              {getStatesForCountry(selectedCountry).map((state) => (
                <SelectItem key={state} value={state} className="text-white hover:bg-[#9b87f5]/20">
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="relative">
          <Grid className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="pl-10 bg-black/50 border-[#9b87f5]/30 text-white">
              <SelectValue placeholder="Kategorie auswählen" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1F2C] border-[#9b87f5]/30">
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id} className="text-white hover:bg-[#9b87f5]/20">
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="relative">
          <Heart className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
          <Select value={selectedOrientation} onValueChange={setSelectedOrientation}>
            <SelectTrigger className="pl-10 bg-black/50 border-[#9b87f5]/30 text-white">
              <SelectValue placeholder="Orientierung auswählen" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1F2C] border-[#9b87f5]/30">
              {orientations.map((orientation) => (
                <SelectItem key={orientation.id} value={orientation.id} className="text-white hover:bg-[#9b87f5]/20">
                  {orientation.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full pl-10 bg-black/50 border-[#9b87f5]/30 text-white justify-start">
                {priceRange.min}€ - {priceRange.max}€
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-[#1A1F2C] border-[#9b87f5]/30">
              <div className="p-4">
                <h4 className="font-medium text-white mb-4">Preisbereich</h4>
                <Slider
                  defaultValue={[priceRange.min, priceRange.max]}
                  max={1000}
                  step={50}
                  onValueChange={(value) => setPriceRange({ min: value[0], max: value[1] })}
                  className="mt-2"
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="relative">
          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full pl-10 bg-black/50 border-[#9b87f5]/30 text-white justify-start">
                {selectedDate ? format(selectedDate, 'PP', { locale: de }) : 'Verfügbarkeit wählen'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-[#1A1F2C] border-[#9b87f5]/30">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
                className="rounded-md border-0"
              />
            </PopoverContent>
          </Popover>
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