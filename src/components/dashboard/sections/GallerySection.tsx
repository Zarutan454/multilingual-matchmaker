import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Gallery } from "@/components/profile/Gallery";
import { ImageUploadSection } from "@/components/dashboard/ImageUploadSection";

interface GallerySectionProps {
  userId: string;
  gallery?: string[];
  onGalleryUpdate: (url: string) => Promise<void>;
  onGalleryDelete: (imageUrl: string) => Promise<void>;
}

export const GallerySection = ({ 
  userId, 
  gallery, 
  onGalleryUpdate, 
  onGalleryDelete 
}: GallerySectionProps) => {
  const { t } = useLanguage();

  return (
    <Card className="bg-black/50 backdrop-blur-md border-[#9b87f5]/30 shadow-[0_0_15px_rgba(155,135,245,0.3)] p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{t("gallery")}</h2>
        <ImageUploadSection
          userId={userId}
          onImageUploaded={onGalleryUpdate}
          type="gallery"
        />
      </div>
      <Gallery 
        images={gallery || []} 
        onDeleteImage={onGalleryDelete}
      />
    </Card>
  );
};