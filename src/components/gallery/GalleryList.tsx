import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { GalleryImage } from "./GalleryImage";
import { GalleryImage as GalleryImageType } from "@/types/gallery";

interface GalleryListProps {
  images: GalleryImageType[];
  onDragEnd: (result: any) => void;
  onDeleteImage: (imageUrl: string) => void;
  onEditImage: (imageUrl: string, editedImage: Blob) => Promise<void>;
  onCategoryChange: (imageId: string, category: string) => void;
  categories: string[];
}

export const GalleryList = ({
  images,
  onDragEnd,
  onDeleteImage,
  onEditImage,
  onCategoryChange,
  categories
}: GalleryListProps) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="gallery">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid grid-cols-3 gap-2"
          >
            {images
              .sort((a, b) => a.order - b.order)
              .map((image, index) => (
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