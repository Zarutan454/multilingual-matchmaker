import { Card } from "@/components/ui/card";
import { useLanguage } from "../../contexts/LanguageContext";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface ProviderGalleryProps {
  providerId: string;
}

export const ProviderGallery = ({ providerId }: ProviderGalleryProps) => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Beispielbilder - später durch echte Bilder ersetzen
  const images = [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg"
  ];

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">{t("gallery")}</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <div
                className="aspect-[3/4] rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity relative group"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" />
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

      <div className="mt-6 flex justify-center">
        <Button variant="outline">
          {t("viewAllPhotos")}
        </Button>
      </div>
    </Card>
  );
};