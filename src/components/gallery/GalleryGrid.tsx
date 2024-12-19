import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { GalleryImage as GalleryImageType } from "@/types/gallery";
import { GalleryImage } from "./GalleryImage";

interface GalleryGridProps {
  images: GalleryImageType[];
  onDragEnd: (result: any) => void;
  onDeleteImage: (imageUrl: string) => void;
  onEditImage: (imageUrl: string, editedImage: Blob) => Promise<void>;
  onCategoryChange: (imageId: string, category: string) => void;
  categories: string[];
  selectedImages: string[];
  onImageSelect: (imageId: string) => void;
  onNavigate: (currentIndex: number, direction: 'prev' | 'next') => void;
}

export const GalleryGrid = ({
  images,
  onDragEnd,
  onDeleteImage,
  onEditImage,
  onCategoryChange,
  categories,
  selectedImages,
  onImageSelect,
  onNavigate
}: GalleryGridProps) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="gallery">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {images.map((image, index) => (
              <Draggable key={image.id} draggableId={image.id} index={index}>
                {(provided) => (
                  <GalleryImage
                    image={image}
                    index={index}
                    onDelete={onDeleteImage}
                    onEdit={onEditImage}
                    onCategoryChange={onCategoryChange}
                    categories={categories}
                    provided={provided}
                    isSelected={selectedImages.includes(image.id)}
                    onSelect={() => onImageSelect(image.id)}
                    totalImages={images.length}
                    onNavigate={onNavigate}
                  />
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