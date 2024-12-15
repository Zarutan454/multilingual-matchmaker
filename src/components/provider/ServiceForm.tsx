import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ServiceCategorySelector } from "./ServiceCategorySelector";
import { Plus } from "lucide-react";

interface ServiceFormProps {
  onSubmit: (service: {
    name: string;
    description: string;
    duration: number;
    categories: string[];
    price: number;
  }) => Promise<void>;
  isSubmitting: boolean;
}

export const ServiceForm = ({ onSubmit, isSubmitting }: ServiceFormProps) => {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(60);
  const [categories, setCategories] = useState<string[]>([]);
  const [price, setPrice] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ name, description, duration, categories, price });
    setName("");
    setDescription("");
    setDuration(60);
    setCategories([]);
    setPrice(0);
  };

  return (
    <Card className="bg-black/50 backdrop-blur-md border-[#9b87f5]/30 shadow-[0_0_15px_rgba(155,135,245,0.3)] p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder={t("serviceName")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-black/30 border-[#9b87f5]/30 text-white placeholder:text-gray-400"
          />
        </div>
        <div>
          <Textarea
            placeholder={t("serviceDescription")}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-black/30 border-[#9b87f5]/30 text-white placeholder:text-gray-400"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="number"
            placeholder={t("duration")}
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            className="bg-black/30 border-[#9b87f5]/30 text-white placeholder:text-gray-400"
          />
          <Input
            type="number"
            placeholder={t("price")}
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            className="bg-black/30 border-[#9b87f5]/30 text-white placeholder:text-gray-400"
          />
        </div>

        <ServiceCategorySelector
          selectedCategories={categories}
          onCategoryChange={setCategories}
        />

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-[#c69963] hover:bg-[#c69963]/80 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t("addService")}
        </Button>
      </form>
    </Card>
  );
};