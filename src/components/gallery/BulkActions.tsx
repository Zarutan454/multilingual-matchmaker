import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { Edit, Trash2 } from "lucide-react";

interface BulkActionsProps {
  selectedImages: string[];
  categories: string[];
  bulkCategory: string;
  setBulkCategory: (category: string) => void;
  onBulkCategoryChange: () => void;
  onBulkDelete: () => void;
}

export const BulkActions = ({
  selectedImages,
  categories,
  bulkCategory,
  setBulkCategory,
  onBulkCategoryChange,
  onBulkDelete
}: BulkActionsProps) => {
  const { t } = useLanguage();

  if (selectedImages.length === 0) return null;

  return (
    <div className="flex items-center gap-4 p-4 bg-black/20 rounded-lg">
      <span className="text-sm text-white">
        {selectedImages.length} {t("imagesSelected")}
      </span>
      <Select value={bulkCategory} onValueChange={setBulkCategory}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={t("selectCategory")} />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        variant="secondary"
        size="sm"
        onClick={onBulkCategoryChange}
        disabled={!bulkCategory}
      >
        <Edit className="w-4 h-4 mr-2" />
        {t("updateCategory")}
      </Button>
      <Button
        variant="destructive"
        size="sm"
        onClick={onBulkDelete}
      >
        <Trash2 className="w-4 h-4 mr-2" />
        {t("deleteSelected")}
      </Button>
    </div>
  );
};