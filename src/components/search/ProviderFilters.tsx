import { useState } from "react";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import { Filter } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { FilterOptions } from "./types";
import { Checkbox } from "../ui/checkbox";

interface ProviderFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export const ProviderFilters = ({ filters, onFilterChange }: ProviderFiltersProps) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  const serviceCategories = [
    { id: "dinner", label: "Dinner Dates" },
    { id: "events", label: "Events & Partys" },
    { id: "travel", label: "Reisebegleitung" },
    { id: "culture", label: "Kulturelle Veranstaltungen" },
    { id: "wellness", label: "Wellness & Spa" }
  ];

  const handlePriceChange = (value: number[]) => {
    setLocalFilters({
      ...localFilters,
      priceRange: { min: value[0], max: value[1] },
    });
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const updatedCategories = checked
      ? [...localFilters.categories, categoryId]
      : localFilters.categories.filter(id => id !== categoryId);
    
    setLocalFilters({
      ...localFilters,
      categories: updatedCategories,
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
        <Card className="p-4 space-y-6">
          <div>
            <Label className="text-lg font-semibold mb-4">{t("categories")}</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {serviceCategories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={localFilters.categories.includes(category.id)}
                    onCheckedChange={(checked) => 
                      handleCategoryChange(category.id, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={category.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

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