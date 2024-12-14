import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { ProviderFilters } from "./ProviderFilters";
import { useLanguage } from "../../contexts/LanguageContext";
import { FilterOptions, Provider } from "./types";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

// Beispiel-Daten (später durch echte Daten ersetzen)
const mockProviders: Provider[] = [
  {
    id: 1,
    name: "Sophie",
    image: "/lovable-uploads/da17ddfa-149e-442c-bd33-ea6287b02581.png",
    category: "VIP Begleitung",
    location: "München",
    serviceCategories: ["dinner", "events", "culture"],
    priceRange: { min: 200, max: 500 },
    status: "online"
  },
  {
    id: 2,
    name: "Emma",
    image: "/lovable-uploads/fe01f460-75ee-475d-8e6c-efb6244e2622.png",
    category: "Premium Escort",
    location: "Berlin",
    serviceCategories: ["travel", "wellness"],
    priceRange: { min: 300, max: 800 },
    status: "offline"
  }
];

export const ProviderSearch = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: { min: 0, max: 1000 },
    categories: [],
    availability: [],
    location: "",
  });
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>(mockProviders);

  useEffect(() => {
    const filtered = mockProviders.filter(provider => {
      // Textsuche
      const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           provider.location.toLowerCase().includes(searchTerm.toLowerCase());

      // Kategorienfilter
      const matchesCategories = filters.categories.length === 0 ||
        filters.categories.some(category => provider.serviceCategories.includes(category));

      // Preisfilter
      const matchesPrice = provider.priceRange.min >= filters.priceRange.min &&
                          provider.priceRange.max <= filters.priceRange.max;

      return matchesSearch && matchesCategories && matchesPrice;
    });

    setFilteredProviders(filtered);
  }, [searchTerm, filters]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder={t("searchProviders")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <ProviderFilters filters={filters} onFilterChange={setFilters} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {filteredProviders.map((provider) => (
          <Card 
            key={provider.id}
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/provider/${provider.id}`)}
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={provider.image} />
                <AvatarFallback>{provider.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">{provider.name}</h3>
                <p className="text-gray-500">{provider.location}</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary">{provider.category}</Badge>
                  <Badge variant={provider.status === "online" ? "success" : "secondary"}>
                    {provider.status}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};