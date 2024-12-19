import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { GalleryImage } from "./GalleryImage";
import { GalleryImage as GalleryImageType } from "@/types/gallery";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Trash2, Edit } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GalleryListProps {
  images: GalleryImageType[];
  onDragEnd: (result: any) => void;
  onDeleteImage: (imageUrl: string) => void;
  onEditImage: (imageUrl: string, editedImage: Blob) => Promise<void>;
  onCategoryChange: (imageId: string, category: string) => void;
  categories: string[];
}

export const GalleryList = ({
  images,
  onDragEnd,
  onDeleteImage,
  onEditImage,
  onCategoryChange,
  categories
}: GalleryListProps) => {
  const { t } = useLanguage();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [bulkCategory, setBulkCategory] = useState<string>("");

  const handleImageSelect = (imageId: string) => {
    setSelectedImages(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedImages.length === 0) return;

    try {
      for (const imageId of selectedImages) {
        const image = images.find(img => img.id === imageId);
        if (image) {
          await onDeleteImage(image.url);
        }
      }
      setSelectedImages([]);
      toast.success(t("selectedImagesDeleted"));
    } catch (error) {
      toast.error(t("errorDeletingImages"));
    }
  };

  const handleBulkCategoryChange = async () => {
    if (selectedImages.length === 0 || !bulkCategory) return;

    try {
      for (const imageId of selectedImages) {
        await onCategoryChange(imageId, bulkCategory);
      }
      setSelectedImages([]);
      setBulkCategory("");
      toast.success(t("categoriesUpdated"));
    } catch (error) {
      toast.error(t("errorUpdatingCategories"));
    }
  };

  return (
    <div className="space-y-4">
      {selectedImages.length > 0 && (
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
            onClick={handleBulkCategoryChange}
            disabled={!bulkCategory}
          >
            <Edit className="w-4 h-4 mr-2" />
            {t("updateCategory")}
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleBulkDelete}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            {t("deleteSelected")}
          </Button>
        </div>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="gallery">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {images
                .sort((a, b) => a.order - b.order)
                .map((image, index) => (
                  <Draggable key={image.id} draggableId={image.id} index={index}>
                    {(provided) => (
                      <GalleryImage
                        image={image}
                        index={index}
                        onDelete={onDeleteImage}
                        onEdit={onEditImage}
                        onCategoryChange={onCategoryChange}
                        categories={categories}
                        provided={provided}
                        isSelected={selectedImages.includes(image.id)}
                        onSelect={() => handleImageSelect(image.id)}
                      />
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};