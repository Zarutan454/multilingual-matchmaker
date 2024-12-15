import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GalleryProps {
  images: string[];
  onDeleteImage?: (imageUrl: string) => void;
}

export const Gallery = ({ images, onDeleteImage }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-3 gap-2">
      {images.map((image, index) => (
        <Dialog key={index}>
          <div className="relative group">
            <DialogTrigger asChild>
              <div 
                className="aspect-square cursor-pointer rounded-lg overflow-hidden"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            </DialogTrigger>
            {onDeleteImage && (
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-600 hover:bg-red-700"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteImage(image);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          <DialogContent className="max-w-4xl">
            <img
              src={selectedImage || ""}
              alt="Gallery preview"
              className="w-full h-auto"
            />
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};