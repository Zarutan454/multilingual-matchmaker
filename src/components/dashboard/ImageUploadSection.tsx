import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Image, Plus, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface ImageUploadSectionProps {
  userId: string;
  onImageUploaded: (url: string) => void;
  type: "avatar" | "gallery";
  imageUrl?: string;
  onImageDelete?: () => void;
}

export const ImageUploadSection = ({ userId, onImageUploaded, type, imageUrl, onImageDelete }: ImageUploadSectionProps) => {
  const { t } = useLanguage();
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setIsUploading(true);
      const fileExt = file.name.split('.').pop();
      const filePath = `${userId}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('uploads')
        .getPublicUrl(filePath);

      onImageUploaded(publicUrl);
      toast.success(t("imageUploaded"));
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error(t("errorUploadingImage"));
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (onImageDelete) {
      onImageDelete();
      toast.success(t("imageDeleted"));
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          disabled={isUploading}
          className="text-white border-[#9b87f5] hover:bg-[#9b87f5]/20 transition-colors bg-black/30"
        >
          <Plus className="w-4 h-4 mr-2" />
          {type === "avatar" ? t("uploadProfileImage") : t("hochladen")}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black/90 border-[#9b87f5]">
        <DialogHeader>
          <DialogTitle className="text-white">
            {type === "avatar" ? t("uploadProfileImage") : t("hochladen")}
          </DialogTitle>
        </DialogHeader>
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={isUploading}
          className="bg-black/50 border-[#9b87f5] text-white"
        />
        {imageUrl && onImageDelete && (
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            className="mt-4"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            {t("deleteImage")}
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};