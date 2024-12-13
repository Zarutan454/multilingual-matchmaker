import React, { useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { ProviderFilters } from "./ProviderFilters";
import { useLanguage } from "../../contexts/LanguageContext";
import { FilterOptions } from "./types";

export const ProviderSearch = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: { min: 0, max: 1000 },
    categories: [],
    availability: [],
    location: "",
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    // Hier würde später die Suchlogik implementiert
    console.log("Searching for:", event.target.value);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    // Hier würde später die Filterlogik implementiert
    console.log("Filters updated:", newFilters);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder={t("searchProviders")}
          value={searchTerm}
          onChange={handleSearch}
          className="pl-10"
        />
      </div>
      
      <ProviderFilters filters={filters} onFilterChange={handleFilterChange} />
    </div>
  );
};