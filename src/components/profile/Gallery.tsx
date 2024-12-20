import { useState, useCallback } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { GalleryImage } from "@/types/gallery";
import { GalleryList } from "../gallery/GalleryList";

interface GalleryProps {
  images: string[];
  onDeleteImage?: (imageUrl: string) => void;
  categories?: string[];
}

export const Gallery = ({ 
  images, 
  onDeleteImage, 
  categories = ["Portrait", "Ganzkörper", "Location"] 
}: GalleryProps) => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(
    images.length > 0 ? images.map((url, index) => ({
      id: `image-${index}`,
      url,
      order: index,
      createdAt: new Date().toISOString(),
    })) : []
  );

  const handleDeleteImage = async (imageUrl: string) => {
    try {
      const filePath = imageUrl.split('/uploads/').pop();
      if (!filePath) {
        toast.error("Ungültiger Dateipfad");
        return;
      }

      const { error: storageError } = await supabase.storage
        .from('uploads')
        .remove([filePath]);

      if (storageError) {
        throw storageError;
      }

      if (onDeleteImage) {
        onDeleteImage(imageUrl);
      }
      
      setGalleryImages(prev => prev.filter(img => img.url !== imageUrl));
      toast.success("Bild erfolgreich gelöscht");
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error("Fehler beim Löschen des Bildes");
    }
  };

  const handleImageEdit = async (imageUrl: string, editedImage: Blob) => {
    try {
      const filePath = `edited-${Date.now()}.jpg`;
      
      const { error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(filePath, editedImage);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('uploads')
        .getPublicUrl(filePath);

      setGalleryImages(prev =>
        prev.map(img =>
          img.url === imageUrl
            ? { ...img, url: publicUrl }
            : img
        )
      );

      toast.success("Bild erfolgreich bearbeitet");
    } catch (error) {
      console.error('Error editing image:', error);
      toast.error("Fehler beim Bearbeiten des Bildes");
    }
  };

  const handleDragEnd = useCallback((result: unknown) => {
    if (!result) return;

    const items = Array.from(galleryImages);
    const [reorderedItem] = items.splice((result as any).source.index, 1);
    items.splice((result as any).destination.index, 0, reorderedItem);

    const reorderedItems = items.map((item, index) => ({
      ...item,
      order: index,
    }));

    setGalleryImages(reorderedItems);
  }, [galleryImages]);

  const handleCategoryChange = (imageId: string, category: string) => {
    setGalleryImages(prev =>
      prev.map(img =>
        img.id === imageId
          ? { ...img, category }
          : img
      )
    );
  };

  return (
    <GalleryList
      images={galleryImages}
      onDragEnd={handleDragEnd}
      onDeleteImage={handleDeleteImage}
      onEditImage={handleImageEdit}
      onCategoryChange={handleCategoryChange}
      categories={categories}
    />
  );
};