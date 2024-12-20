import React from 'react';
import { Button } from '../ui/button';
import { ZoomIn, ZoomOut } from 'lucide-react';

export interface ImagePreviewProps {
  imageUrl: string;
  zoomLevel: number;
  onZoom: (direction: 'in' | 'out') => void;
  index?: number;
  totalImages?: number;
  onNavigate?: (direction: 'prev' | 'next') => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ 
  imageUrl, 
  zoomLevel, 
  onZoom,
  index,
  totalImages,
  onNavigate 
}) => {
  return (
    <div className="relative">
      <img 
        src={imageUrl} 
        alt="Preview" 
        className="w-full h-auto"
        style={{ transform: `scale(${zoomLevel})` }}
      />
      <div className="absolute top-4 right-4 flex space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onZoom('in')}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onZoom('out')}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ImagePreview;