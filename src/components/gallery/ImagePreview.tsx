import { OptimizedImage } from "@/components/OptimizedImage";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

interface ImagePreviewProps {
  src: string;
  zoomLevel: number;
  onZoom: (direction: 'in' | 'out') => void;
  index: number;
  totalImages: number;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export const ImagePreview = ({
  src,
  zoomLevel,
  onZoom,
  index,
  totalImages,
  onNavigate
}: ImagePreviewProps) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {index > 0 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 text-white hover:bg-white/20"
          onClick={function() { return onNavigate('prev'); }}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
      )}
      
      {index < totalImages - 1 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 text-white hover:bg-white/20"
          onClick={function() { return onNavigate('next'); }}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      )}

      <div className="absolute top-4 right-4 flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
          onClick={function() { return onZoom('out'); }}
          disabled={zoomLevel <= 1}
        >
          <ZoomOut className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
          onClick={function() { return onZoom('in'); }}
          disabled={zoomLevel >= 3}
        >
          <ZoomIn className="h-6 w-6" />
        </Button>
      </div>

      <div 
        className="relative overflow-auto w-full h-full flex items-center justify-center"
        style={{ cursor: zoomLevel > 1 ? 'move' : 'auto' }}
      >
        <OptimizedImage
          src={src}
          alt="Gallery preview"
          className="transition-transform duration-200 max-h-full object-contain"
          style={{ transform: `scale(${zoomLevel})` }}
        />
      </div>
    </div>
  );
};