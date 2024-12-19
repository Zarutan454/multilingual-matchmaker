import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, MoveVertical, Check, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageEditor } from "./ImageEditor";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GalleryImage as GalleryImageType } from "@/types/gallery";
import { OptimizedImage } from "@/components/OptimizedImage";

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
      setZoomLevel(1); // Reset zoom when navigating
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
          <div 
            className={`absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity ${
              isSelected ? 'opacity-100' : ''
            }`}
          >
            <Button
              variant="secondary"
              size="icon"
              className={`rounded-full ${isSelected ? 'bg-primary text-white' : 'bg-black/50'}`}
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
            >
              <Check className="h-4 w-4" />
            </Button>
          </div>

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
          
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
            <ImageEditor
              imageUrl={image.url}
              onSave={(blob) => onEdit(image.url, blob)}
            />
            
            <Button
              variant="destructive"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(image.url);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            <Button
              variant="secondary"
              size="icon"
              className="cursor-grab"
            >
              <MoveVertical className="h-4 w-4" />
            </Button>
          </div>

          <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Select
              value={image.category}
              onValueChange={(value) => onCategoryChange(image.id, value)}
            >
              <SelectTrigger className="bg-black/50 border-none text-white">
                <SelectValue placeholder="Kategorie wählen" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogContent className="max-w-7xl h-[90vh] flex items-center justify-center bg-black/95">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Navigation Buttons */}
            {index > 0 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 text-white hover:bg-white/20"
                onClick={() => handleNavigate('prev')}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
            )}
            {index < totalImages - 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 text-white hover:bg-white/20"
                onClick={() => handleNavigate('next')}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            )}

            {/* Zoom Controls */}
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => handleZoom('out')}
                disabled={zoomLevel <= 1}
              >
                <ZoomOut className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => handleZoom('in')}
                disabled={zoomLevel >= 3}
              >
                <ZoomIn className="h-6 w-6" />
              </Button>
            </div>

            {/* Image Container */}
            <div 
              className="relative overflow-auto w-full h-full flex items-center justify-center"
              style={{ cursor: zoomLevel > 1 ? 'move' : 'auto' }}
            >
              <OptimizedImage
                src={selectedImage || ""}
                alt="Gallery preview"
                className="transition-transform duration-200 max-h-full object-contain"
                style={{ transform: `scale(${zoomLevel})` }}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};