import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PriceCategory {
  id: string;
  name: string;
  basePrice: number;
  currency: string;
  duration: string;
}

export const PricingManager = () => {
  const { t } = useLanguage();
  const [categories, setCategories] = useState<PriceCategory[]>([]);
  const [newCategory, setNewCategory] = useState<PriceCategory>({
    id: crypto.randomUUID(),
    name: "",
    basePrice: 0,
    currency: "EUR",
    duration: "60",
  });

  const handleAddCategory = () => {
    setCategories([...categories, newCategory]);
    setNewCategory({
      id: crypto.randomUUID(),
      name: "",
      basePrice: 0,
      currency: "EUR",
      duration: "60",
    });
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const durations = [
    { value: "30", label: "30 Min" },
    { value: "60", label: "1 Stunde" },
    { value: "120", label: "2 Stunden" },
    { value: "180", label: "3 Stunden" },
    { value: "240", label: "4 Stunden" },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-6">{t("pricing")}</h3>

      <div className="space-y-6">
        {/* Existing Categories */}
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex-1">
              <p className="font-medium">{category.name}</p>
              <p className="text-sm text-gray-600">
                {category.basePrice} {category.currency} / {category.duration} Min
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteCategory(category.id)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ))}

        {/* Add New Category Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label>{t("serviceName")}</Label>
            <Input
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
              placeholder={t("enterServiceName")}
            />
          </div>

          <div>
            <Label>{t("basePrice")}</Label>
            <Input
              type="number"
              value={newCategory.basePrice}
              onChange={(e) =>
                setNewCategory({
                  ...newCategory,
                  basePrice: parseInt(e.target.value),
                })
              }
              min={0}
            />
          </div>

          <div>
            <Label>{t("duration")}</Label>
            <Select
              value={newCategory.duration}
              onValueChange={(value) =>
                setNewCategory({ ...newCategory, duration: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder={t("selectDuration")} />
              </SelectTrigger>
              <SelectContent>
                {durations.map((duration) => (
                  <SelectItem key={duration.value} value={duration.value}>
                    {duration.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button
              onClick={handleAddCategory}
              className="w-full"
              variant="secondary"
            >
              <Plus className="w-4 h-4 mr-2" />
              {t("addCategory")}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
