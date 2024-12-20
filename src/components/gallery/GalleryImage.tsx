import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { GalleryImage as GalleryImageType } from "@/types/gallery";
import { OptimizedImage } from "@/components/OptimizedImage";
import { ImageControls } from "./ImageControls";
import ImagePreview from "./ImagePreview";

interface GalleryImageProps {
  image: GalleryImageType;
  index: number;
  onDelete: (imageUrl: string) => void;
  onEdit: (imageUrl: string, editedImage: Blob) => Promise<void>;
  onCategoryChange: (imageId: string, category: string) => void;
  categories: string[];
  provided: any;
  isSelected: boolean;
  onSelect: () => void;
  totalImages: number;
  onNavigate?: (direction: 'prev' | 'next') => void;
}

export const GalleryImage = ({
  image,
  index,
  onDelete,
  onEdit,
  onCategoryChange,
  categories,
  provided,
  isSelected,
  onSelect,
  totalImages,
  onNavigate
}: GalleryImageProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleZoom = (direction: 'in' | 'out') => {
    setZoomLevel(prev => {
      if (direction === 'in' && prev < 3) return prev + 0.5;
      if (direction === 'out' && prev > 1) return prev - 0.5;
      return prev;
    });
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (onNavigate) {
      onNavigate(direction);
      setZoomLevel(1);
    }
  };

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="relative group"
    >
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div className="relative group">
          <DialogTrigger asChild>
            <div 
              className="aspect-square cursor-pointer rounded-lg overflow-hidden"
              onClick={() => {
                setSelectedImage(image.url);
                setIsDialogOpen(true);
              }}
            >
              <OptimizedImage
                src={image.url}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full hover:scale-110 transition-transform duration-300"
              />
            </div>
          </DialogTrigger>
          
          <ImageControls
            imageUrl={image.url}
            imageId={image.id}
            category={image.category}
            categories={categories}
            isSelected={isSelected}
            onSelect={onSelect}
            onDelete={onDelete}
            onEdit={onEdit}
            onCategoryChange={onCategoryChange}
          />
        </div>

        <DialogContent className="max-w-7xl h-[90vh] flex items-center justify-center bg-black/95">
          <ImagePreview
            src={selectedImage || ""}
            zoomLevel={zoomLevel}
            onZoom={handleZoom}
            index={index}
            totalImages={totalImages}
            onNavigate={handleNavigate}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
