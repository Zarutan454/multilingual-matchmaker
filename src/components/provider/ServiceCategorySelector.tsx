import { useLanguage } from "@/contexts/LanguageContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface ServiceCategorySelectorProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

export const SERVICE_CATEGORIES = [
  { id: "dinner_dates", label: "Dinner Dates" },
  { id: "hotel_visits", label: "Hotelbesuche" },
  { id: "home_visits", label: "Hausbesuche" },
  { id: "events", label: "Events & Partys" },
  { id: "travel", label: "Reisebegleitung" },
  { id: "culture", label: "Kulturelle Veranstaltungen" },
  { id: "wellness", label: "Wellness & Spa" }
];

export const ServiceCategorySelector = ({
  selectedCategories,
  onCategoryChange,
}: ServiceCategorySelectorProps) => {
  const { t } = useLanguage();

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      onCategoryChange([...selectedCategories, categoryId]);
    } else {
      onCategoryChange(selectedCategories.filter(id => id !== categoryId));
    }
  };

  return (
    <Card className="p-4 bg-black/30 border-[#9b87f5]/30 shadow-[0_0_15px_rgba(155,135,245,0.3)]">
      <h3 className="text-lg font-semibold mb-4 text-white">{t("serviceCategories")}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SERVICE_CATEGORIES.map((category) => (
          <div key={category.id} className="flex items-center space-x-2">
            <Checkbox
              id={category.id}
              checked={selectedCategories.includes(category.id)}
              onCheckedChange={(checked) => 
                handleCategoryChange(category.id, checked as boolean)
              }
              className="border-[#9b87f5]/50 data-[state=checked]:bg-[#9b87f5] data-[state=checked]:border-[#9b87f5]"
            />
            <Label
              htmlFor={category.id}
              className="text-sm text-gray-300 cursor-pointer hover:text-white transition-colors"
            >
              {category.label}
            </Label>
          </div>
        ))}
      </div>
    </Card>
  );
};