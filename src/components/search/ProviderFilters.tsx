import { useState } from "react";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import { Filter } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { FilterOptions } from "./types";

interface ProviderFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export const ProviderFilters = ({ filters, onFilterChange }: ProviderFiltersProps) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  const handlePriceChange = (value: number[]) => {
    setLocalFilters({
      ...localFilters,
      priceRange: { min: value[0], max: value[1] },
    });
  };

  const applyFilters = () => {
    onFilterChange(localFilters);
  };

  return (
    <div className="w-full">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="mb-4"
      >
        <Filter className="mr-2 h-4 w-4" />
        {t("filters")}
      </Button>

      {isOpen && (
        <Card className="p-4 space-y-4">
          <div>
            <Label>{t("priceRange")}</Label>
            <div className="pt-4">
              <Slider
                defaultValue={[localFilters.priceRange.min, localFilters.priceRange.max]}
                max={1000}
                step={10}
                onValueChange={handlePriceChange}
              />
              <div className="flex justify-between mt-2">
                <span>{localFilters.priceRange.min}€</span>
                <span>{localFilters.priceRange.max}€</span>
              </div>
            </div>
          </div>

          <Button onClick={applyFilters} className="w-full">
            {t("applyFilters")}
          </Button>
        </Card>
      )}
    </div>
  );
};