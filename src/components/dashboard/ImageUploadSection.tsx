import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Image, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface ImageUploadSectionProps {
  userId: string;
  onImageUploaded: (url: string) => void;
  type: "avatar" | "gallery";
}

export const ImageUploadSection = ({ userId, onImageUploaded, type }: ImageUploadSectionProps) => {
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" disabled={isUploading}>
          <Plus className="w-4 h-4 mr-2" />
          {type === "avatar" ? t("uploadProfileImage") : t("addToGallery")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === "avatar" ? t("uploadProfileImage") : t("addToGallery")}
          </DialogTitle>
        </DialogHeader>
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={isUploading}
        />
      </DialogContent>
    </Dialog>
  );
};