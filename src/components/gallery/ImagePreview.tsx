import React from 'react';

export interface ImagePreviewProps {
  src: string;
  zoomLevel: number;
  onZoom: (direction: "in" | "out") => void;
  index: number;
  totalImages: number;
  onNavigate: (direction: "prev" | "next") => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  src,
  zoomLevel,
  onZoom,
  index,
  totalImages,
  onNavigate
}) => {
  return (
    <div className="relative w-full h-full">
      <img
        src={src}
        alt="Preview"
        className="w-full h-full object-contain"
        style={{ transform: `scale(${1 + zoomLevel * 0.1})` }}
      />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
        <button
          onClick={() => onZoom("out")}
          className="bg-black/50 text-white px-4 py-2 rounded"
        >
          Zoom Out
        </button>
        <button
          onClick={() => onZoom("in")}
          className="bg-black/50 text-white px-4 py-2 rounded"
        >
          Zoom In
        </button>
      </div>
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded">
        {index + 1} / {totalImages}
      </div>
      {index > 0 && (
        <button
          onClick={() => onNavigate("prev")}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white px-4 py-2 rounded"
        >
          Previous
        </button>
      )}
      {index < totalImages - 1 && (
        <button
          onClick={() => onNavigate("next")}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      )}
    </div>
  );
};