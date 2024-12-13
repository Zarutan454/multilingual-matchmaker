import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProviderGalleryProps {
  images: string[];
}

export const ProviderGallery = ({ images }: ProviderGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Galerie</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="aspect-square rounded-lg overflow-hidden cursor-pointer"
            onClick={() => {
              setSelectedImage(image);
              setCurrentIndex(index);
            }}
          >
            <img
              src={image}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform"
            />
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          <div className="relative">
            <img
              src={images[currentIndex]}
              alt={`Gallery ${currentIndex + 1}`}
              className="w-full h-full object-contain"
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={handleNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};