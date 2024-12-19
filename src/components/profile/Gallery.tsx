import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Trash2, MoveVertical, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { ImageEditor } from "../gallery/ImageEditor";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GalleryImage } from "@/types/gallery";

interface GalleryProps {
  images: string[];
  onDeleteImage?: (imageUrl: string) => void;
  categories?: string[];
}

export const Gallery = ({ images, onDeleteImage, categories = ["Portrait", "Ganzkörper", "Location"] }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(
    images.map((url, index) => ({
      id: `image-${index}`,
      url,
      order: index,
      createdAt: new Date().toISOString(),
    }))
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

  const handleDragEnd = useCallback((result: any) => {
    if (!result.destination) return;

    const items = Array.from(galleryImages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

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
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="gallery">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid grid-cols-3 gap-2"
          >
            {galleryImages
              .sort((a, b) => a.order - b.order)
              .map((image, index) => (
                <Draggable key={image.id} draggableId={image.id} index={index}>
                  {(provided) => (
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
                              onSave={(blob) => handleImageEdit(image.url, blob)}
                            />
                            
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteImage(image.url);
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
                              onValueChange={(value) => handleCategoryChange(image.id, value)}
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
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};