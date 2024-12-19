import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageEditor } from "./ImageEditor";
import { Check, MoveVertical, Trash2 } from "lucide-react";

interface ImageControlsProps {
  imageUrl: string;
  imageId: string;
  category?: string;
  categories: string[];
  isSelected: boolean;
  onSelect: () => void;
  onDelete: (imageUrl: string) => void;
  onEdit: (imageUrl: string, editedImage: Blob) => Promise<void>;
  onCategoryChange: (imageId: string, category: string) => void;
}

export const ImageControls = ({
  imageUrl,
  imageId,
  category,
  categories,
  isSelected,
  onSelect,
  onDelete,
  onEdit,
  onCategoryChange
}: ImageControlsProps) => {
  return (
    <>
      <div 
        className={`absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity ${
          isSelected ? 'opacity-100' : ''
        }`}
      >
        <Button
          variant="secondary"
          size="icon"
          className={`rounded-full ${isSelected ? 'bg-primary text-white' : 'bg-black/50'}`}
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        >
          <Check className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
        <ImageEditor
          imageUrl={imageUrl}
          onSave={(blob) => onEdit(imageUrl, blob)}
        />
        
        <Button
          variant="destructive"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(imageUrl);
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
          value={category}
          onValueChange={(value) => onCategoryChange(imageId, value)}
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
    </>
  );
};