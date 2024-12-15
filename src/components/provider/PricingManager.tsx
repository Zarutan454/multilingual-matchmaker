import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface PriceCategory {
  id: string;
  name: string;
  basePrice: number;
  duration: number;
}

export const PricingManager = () => {
  const { t } = useLanguage();
  const [categories, setCategories] = useState<PriceCategory[]>([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    basePrice: 0,
    duration: 30
  });

  const handleAddCategory = () => {
    if (!newCategory.name || newCategory.basePrice <= 0) {
      toast.error(t("fillAllFields"));
      return;
    }

    const category: PriceCategory = {
      id: crypto.randomUUID(),
      ...newCategory
    };

    setCategories([...categories, category]);
    setNewCategory({ name: "", basePrice: 0, duration: 30 });
    toast.success(t("categoryAdded"));
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(category => category.id !== id));
    toast.success(t("categoryDeleted"));
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">{t("addNewCategory")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Input
              placeholder={t("categoryName")}
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder={t("basePrice")}
              value={newCategory.basePrice}
              onChange={(e) => setNewCategory({ ...newCategory, basePrice: parseInt(e.target.value) })}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder={t("duration")}
              value={newCategory.duration}
              onChange={(e) => setNewCategory({ ...newCategory, duration: parseInt(e.target.value) })}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <Button onClick={handleAddCategory} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            {t("addCategory")}
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {categories.map((category) => (
          <Card key={category.id} className="bg-gray-900 border-gray-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                  <p className="text-sm text-gray-500 mt-2">
                    {t("basePrice")}: €{category.basePrice}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t("duration")}: {category.duration} {t("minutes")}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}