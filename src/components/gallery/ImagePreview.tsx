import React from 'react';
import { Button } from '../ui/button';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface ImagePreviewProps {
  imageUrl: string;
  onZoom: (direction: 'in' | 'out') => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl, onZoom }) => {
  return (
    <div className="relative">
      <img src={imageUrl} alt="Preview" className="w-full h-auto" />
      <div className="absolute top-4 right-4 flex space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="absolute bottom-4 left-4"
          onClick={() => onZoom('in')}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute bottom-4 left-4"
          onClick={function() { return onZoom('out') }}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ImagePreview;
