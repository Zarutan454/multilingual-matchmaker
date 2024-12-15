import { useState } from "react";
import { ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProfileBannerProps {
  profileId: string;
  bannerUrl?: string;
  isEditable?: boolean;
}

export const ProfileBanner = ({ profileId, bannerUrl, isEditable = false }: ProfileBannerProps) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [isUploading, setIsUploading] = useState(false);

  const handleBannerUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setIsUploading(true);
      const fileExt = file.name.split('.').pop();
      const filePath = `banners/${profileId}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('uploads')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ banner_url: publicUrl })
        .eq('id', profileId);

      if (updateError) throw updateError;

      toast.success(t("bannerUploaded"));
      window.location.reload();
    } catch (error) {
      console.error('Error uploading banner:', error);
      toast.error(t("errorUploadingBanner"));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative w-full h-[300px] bg-gradient-to-b from-black to-gray-900 overflow-hidden">
      {bannerUrl ? (
        <img
          src={bannerUrl}
          alt="Profile Banner"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center">
          {isEditable && user?.id === profileId && (
            <div className="text-center">
              <label className="cursor-pointer inline-block">
                <div className="flex flex-col items-center gap-4">
                  <Button 
                    variant="secondary" 
                    className="bg-black/50 hover:bg-black/70"
                    disabled={isUploading}
                    size="lg"
                  >
                    <ImagePlus className="w-6 h-6 mr-2" />
                    {t("uploadBanner")}
                  </Button>
                  <p className="text-sm text-gray-400">{t("recommendedSize")}: 1920x300px</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleBannerUpload}
                    disabled={isUploading}
                  />
                </div>
              </label>
            </div>
          )}
        </div>
      )}
      
      {isEditable && user?.id === profileId && bannerUrl && (
        <label className="absolute bottom-4 right-4 cursor-pointer">
          <Button 
            variant="secondary" 
            className="bg-black/50 hover:bg-black/70"
            disabled={isUploading}
          >
            <ImagePlus className="w-4 h-4 mr-2" />
            {t("changeBanner")}
          </Button>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleBannerUpload}
            disabled={isUploading}
          />
        </label>
      )}
    </div>
  );
};