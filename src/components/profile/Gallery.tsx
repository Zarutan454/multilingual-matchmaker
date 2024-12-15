import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface GalleryProps {
  images: string[];
}

export const Gallery = ({ images }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-3 gap-2">
      {images.map((image, index) => (
        <Dialog key={index}>
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