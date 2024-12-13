import { useState } from "react";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import { useLanguage } from "../../contexts/LanguageContext";

export const PricingSection = () => {
  const { t } = useLanguage();
  const [priceRange, setPriceRange] = useState([50]);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">{t("pricing")}</h3>
      
      <div className="space-y-4">
        <div>
          <Label>{t("basePrice")}</Label>
          <div className="flex items-center gap-4">
            <Input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([parseInt(e.target.value)])}
              min={0}
              className="w-24"
            />
            <span>€ / {t("hour")}</span>
          </div>
        </div>

        <div>
          <Label>{t("priceRange")}</Label>
          <Slider
            defaultValue={[50]}
            max={200}
            step={5}
            value={priceRange}
            onValueChange={setPriceRange}
            className="mt-2"
          />
          <div className="flex justify-between mt-1">
            <span className="text-sm text-gray-500">0€</span>
            <span className="text-sm text-gray-500">200€</span>
          </div>
        </div>
      </div>
    </Card>
  );
};