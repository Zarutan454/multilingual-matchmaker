import { useState } from "react";
import { SearchBar } from "../../search/SearchBar";

interface ProfileFiltersProps {
  onSearch: (
    searchTerm: string,
    location: string,
    category: string,
    country: string,
    state: string,
    orientation: string
  ) => void;
}

export const ProfileFilters = ({ onSearch }: ProfileFiltersProps) => {
  return (
    <div className="-mt-16 mb-12">
      <SearchBar onSearch={onSearch} />
    </div>
  );
};