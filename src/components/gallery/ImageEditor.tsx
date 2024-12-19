import { useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Edit2, RotateCw } from "lucide-react";

interface ImageEditorProps {
  imageUrl: string;
  onSave: (editedImage: Blob) => Promise<void>;
}

export const ImageEditor = ({ imageUrl, onSave }: ImageEditorProps) => {
  const [crop, setCrop] = useState<Crop>();
  const [rotation, setRotation] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);

  const applyEdits = async () => {
    const image = new Image();
    image.src = imageUrl;
    
    await new Promise((resolve) => {
      image.onload = resolve;
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = image.width;
    canvas.height = image.height;

    // Apply rotation
    if (rotation) {
      ctx.translate(canvas.width/2, canvas.height/2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-canvas.width/2, -canvas.height/2);
    }

    // Draw image with filters
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
    ctx.drawImage(image, 0, 0);

    // Apply crop if set
    if (crop) {
      const croppedCanvas = document.createElement('canvas');
      const croppedCtx = croppedCanvas.getContext('2d');
      if (!croppedCtx) return;

      croppedCanvas.width = crop.width;
      croppedCanvas.height = crop.height;

      croppedCtx.drawImage(
        canvas,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.width = crop.width;
      canvas.height = crop.height;
      ctx.drawImage(croppedCanvas, 0, 0);
    }

    canvas.toBlob(async (blob) => {
      if (blob) {
        await onSave(blob);
      }
    }, 'image/jpeg', 0.95);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Bild bearbeiten</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <ReactCrop crop={crop} onChange={c => setCrop(c)}>
            <img
              src={imageUrl}
              style={{
                filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                transform: `rotate(${rotation}deg)`,
              }}
              alt="Zu bearbeitendes Bild"
            />
          </ReactCrop>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Rotation</label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setRotation(r => (r + 90) % 360)}
              >
                <RotateCw className="h-4 w-4" />
              </Button>
              <span className="text-sm">{rotation}°</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Helligkeit</label>
            <Slider
              value={[brightness]}
              onValueChange={([value]) => setBrightness(value)}
              min={0}
              max={200}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Kontrast</label>
            <Slider
              value={[contrast]}
              onValueChange={([value]) => setContrast(value)}
              min={0}
              max={200}
              step={1}
            />
          </div>

          <Button onClick={applyEdits} className="w-full">
            Änderungen speichern
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};