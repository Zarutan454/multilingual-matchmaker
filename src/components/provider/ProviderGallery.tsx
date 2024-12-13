import { Card } from "@/components/ui/card";
import { useLanguage } from "../../contexts/LanguageContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export interface ProviderGalleryProps {
  providerId: string;
}

export const ProviderGallery = ({ providerId }: ProviderGalleryProps) => {
  const { t } = useLanguage();
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages([...images, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{t("gallery")}</h2>
        <label htmlFor="image-upload">
          <Button variant="outline" size="sm" className="cursor-pointer">
            <Plus className="h-4 w-4 mr-2" />
            {t("addImage")}
          </Button>
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <div
                className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <img
                src={selectedImage || ""}
                alt="Gallery preview"
                className="w-full h-auto"
              />
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          {t("noProfilesYet")}
        </div>
      )}
    </Card>
  );
};