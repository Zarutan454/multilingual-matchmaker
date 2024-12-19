import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, MoveVertical } from "lucide-react";
import { ImageEditor } from "./ImageEditor";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GalleryImage as GalleryImageType } from "@/types/gallery";

interface GalleryImageProps {
  image: GalleryImageType;
  index: number;
  onDelete: (imageUrl: string) => void;
  onEdit: (imageUrl: string, editedImage: Blob) => Promise<void>;
  onCategoryChange: (imageId: string, category: string) => void;
  categories: string[];
  provided: any;
}

export const GalleryImage = ({
  image,
  index,
  onDelete,
  onEdit,
  onCategoryChange,
  categories,
  provided
}: GalleryImageProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="relative group"
    >
      <Dialog>
        <div className="relative group">
          <DialogTrigger asChild>
            <div 
              className="aspect-square cursor-pointer rounded-lg overflow-hidden"
              onClick={() => setSelectedImage(image.url)}
            >
              <img
                src={image.url}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
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
        <DialogContent className="max-w-4xl">
          <img
            src={selectedImage || ""}
            alt="Gallery preview"
            className="w-full h-auto"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};