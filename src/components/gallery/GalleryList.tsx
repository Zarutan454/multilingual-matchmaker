import { useState, useMemo } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { GalleryFilters } from "./GalleryFilters";
import { BulkActions } from "./BulkActions";
import { GalleryGrid } from "./GalleryGrid";
import { GalleryImage as GalleryImageType } from "@/types/gallery";

interface GalleryListProps {
  images: GalleryImageType[];
  onDragEnd: (result: any) => void;
  onDeleteImage: (imageUrl: string) => void;
  onEditImage: (imageUrl: string, editedImage: Blob) => Promise<void>;
  onCategoryChange: (imageId: string, category: string) => void;
  categories: string[];
}

interface FilterState {
  search: string;
  category: string;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
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
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "",
    sortBy: "date",
    sortDirection: "desc"
  });

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

  const filteredAndSortedImages = useMemo(() => {
    let filtered = [...images];

    if (filters.search) {
      filtered = filtered.filter(image => 
        image.url.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category) {
      filtered = filtered.filter(image => 
        image.category === filters.category
      );
    }

    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case 'date':
          comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          break;
        case 'name':
          comparison = a.url.localeCompare(b.url);
          break;
        case 'size':
          comparison = 0;
          break;
      }

      return filters.sortDirection === 'desc' ? comparison : -comparison;
    });

    return filtered;
  }, [images, filters]);

  const handleImageNavigation = (currentIndex: number, direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < filteredAndSortedImages.length) {
      return;
    }
  };

  return (
    <div className="space-y-4">
      <GalleryFilters 
        categories={categories}
        onFilterChange={(newFilters) => setFilters(newFilters)}
      />

      <BulkActions
        selectedImages={selectedImages}
        categories={categories}
        bulkCategory={bulkCategory}
        setBulkCategory={setBulkCategory}
        onBulkCategoryChange={handleBulkCategoryChange}
        onBulkDelete={handleBulkDelete}
      />

      <GalleryGrid
        images={filteredAndSortedImages}
        onDragEnd={onDragEnd}
        onDeleteImage={onDeleteImage}
        onEditImage={onEditImage}
        onCategoryChange={onCategoryChange}
        categories={categories}
        selectedImages={selectedImages}
        onImageSelect={handleImageSelect}
        onNavigate={handleImageNavigation}
      />
    </div>
  );
};