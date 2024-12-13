import { Check } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const categories = [
  {
    id: "massage",
    name: "Massage",
    description: "Klassische Massage, Wellness-Massage, etc.",
    price: "ab 50€"
  },
  {
    id: "physio",
    name: "Physiotherapie",
    description: "Krankengymnastik, Manuelle Therapie, etc.",
    price: "ab 60€"
  },
  {
    id: "training",
    name: "Personal Training",
    description: "Individuelles Fitnesstraining",
    price: "ab 45€"
  }
];

export const ServiceCategories = () => {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <Card key={category.id} className="p-6">
          <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
          <p className="text-gray-600 mb-4">{category.description}</p>
          <p className="text-primary font-medium mb-4">{category.price}</p>
          <Button variant="outline" className="w-full">
            <Check className="mr-2 h-4 w-4" />
            {t("select")}
          </Button>
        </Card>
      ))}
    </div>
  );
};