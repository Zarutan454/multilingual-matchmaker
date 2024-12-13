import { UseFormReturn } from "react-hook-form";
import { useLanguage } from "../../contexts/LanguageContext";
import { Input } from "../ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { ProfileFormValues, MAX_GALLERY_IMAGES } from "./types";
import { ImagePlus, X } from "lucide-react";
import { Button } from "../ui/button";

interface ProfileGalleryProps {
  form: UseFormReturn<ProfileFormValues>;
}

export const ProfileGallery = ({ form }: ProfileGalleryProps) => {
  const { t } = useLanguage();
  const gallery = form.watch("gallery") || [];

  const handleImageDelete = (index: number) => {
    const newGallery = [...gallery];
    newGallery.splice(index, 1);
    form.setValue("gallery", newGallery);
  };

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="gallery"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("gallery")}</FormLabel>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((image: File | string, index: number) => (
                <div key={index} className="relative group">
                  <img
                    src={typeof image === "string" ? image : URL.createObjectURL(image)}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleImageDelete(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {gallery.length < MAX_GALLERY_IMAGES && (
                <FormControl>
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                    <ImagePlus className="w-8 h-8 text-gray-400" />
                    <span className="mt-2 text-sm text-gray-500">
                      {t("addImage")}
                    </span>
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          field.onChange([...gallery, file]);
                        }
                      }}
                    />
                  </label>
                </FormControl>
              )}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};