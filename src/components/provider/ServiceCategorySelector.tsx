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
    <Card className="p-4 bg-gray-900 border-gray-800">
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
            />
            <Label
              htmlFor={category.id}
              className="text-sm text-gray-300 cursor-pointer"
            >
              {category.label}
            </Label>
          </div>
        ))}
      </div>
    </Card>
  );
};