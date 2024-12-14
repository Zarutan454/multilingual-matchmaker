import { useForm } from "react-hook-form";
import { useLanguage } from "../../contexts/LanguageContext";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../contexts/AuthContext";
import { createClient } from "@supabase/supabase-js";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileBasicInfo } from "./ProfileBasicInfo";
import { ProfileAdditionalInfo } from "./ProfileAdditionalInfo";
import { ExtendedProfileInfo } from "./ExtendedProfileInfo";
import { ProfileGallery } from "./ProfileGallery";
import { profileSchema, ProfileFormValues, UserMetadata } from "./types";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const STORAGE_BUCKET = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || 'public';

export const ProfileForm = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const defaultPriceRange = {
    min: Number(user?.user_metadata?.price_range?.min) || 50,
    max: Number(user?.user_metadata?.price_range?.max) || 1000
  };
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.user_metadata?.full_name || "",
      bio: user?.user_metadata?.bio || "",
      location: user?.user_metadata?.location || "",
      interests: user?.user_metadata?.interests || "",
      occupation: user?.user_metadata?.occupation || "",
      height: user?.user_metadata?.height || "",
      weight: user?.user_metadata?.weight || "",
      availability: user?.user_metadata?.availability || [],
      serviceCategories: user?.user_metadata?.service_categories || [],
      priceRange: defaultPriceRange,
      availabilityStatus: user?.user_metadata?.availability_status || "offline",
      gallery: user?.user_metadata?.gallery || [],
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) {
      toast.error(t("pleaseLoginFirst"));
      return;
    }

    console.log("Starting profile update with data:", data);
    toast.info(t("savingProfile"));

    try {
      const metadata: UserMetadata = {
        full_name: data.fullName,
        bio: data.bio,
        location: data.location,
        interests: data.interests,
        occupation: data.occupation,
        height: data.height,
        weight: data.weight,
        availability: data.availability,
        service_categories: data.serviceCategories,
        price_range: data.priceRange,
        availability_status: data.availabilityStatus,
      };

      // Handle avatar upload
      if (data.avatar instanceof File) {
        console.log("Uploading avatar...");
        const fileExt = data.avatar.name.split('.').pop();
        const fileName = `avatar-${user.id}-${Date.now()}.${fileExt}`;
        const filePath = fileName;

        const { error: uploadError, data: uploadData } = await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(filePath, data.avatar, {
            upsert: true,
            cacheControl: '3600'
          });

        if (uploadError) {
          console.error('Avatar upload error:', uploadError);
          toast.error(`${t("errorUploadingAvatar")}: ${uploadError.message}`);
          throw uploadError;
        }

        if (uploadData) {
          const { data: { publicUrl } } = supabase.storage
            .from(STORAGE_BUCKET)
            .getPublicUrl(filePath);

          metadata.avatar_url = publicUrl;
          console.log("Avatar uploaded successfully:", publicUrl);
        }
      }

      // Handle gallery uploads
      if (data.gallery?.length) {
        console.log("Uploading gallery images...");
        const galleryUrls = [];
        for (const image of data.gallery) {
          if (image instanceof File) {
            const fileExt = image.name.split('.').pop();
            const fileName = `gallery-${user.id}-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = fileName;

            const { error: uploadError, data: uploadData } = await supabase.storage
              .from(STORAGE_BUCKET)
              .upload(filePath, image, {
                upsert: true,
                cacheControl: '3600'
              });

            if (uploadError) {
              console.error('Gallery upload error:', uploadError);
              toast.error(`${t("errorUploadingGallery")}: ${uploadError.message}`);
              throw uploadError;
            }

            if (uploadData) {
              const { data: { publicUrl } } = supabase.storage
                .from(STORAGE_BUCKET)
                .getPublicUrl(filePath);

              galleryUrls.push(publicUrl);
              console.log("Gallery image uploaded successfully:", publicUrl);
            }
          } else {
            galleryUrls.push(image);
          }
        }
        metadata.gallery = galleryUrls;
      }

      console.log("Updating user metadata:", metadata);
      const { error: updateError, data: updateData } = await supabase.auth.updateUser({
        data: metadata
      });

      if (updateError) {
        console.error('Profile update error:', updateError);
        toast.error(`${t("errorUpdatingProfile")}: ${updateError.message}`);
        throw updateError;
      }

      console.log("Profile update response:", updateData);
      console.log("Profile updated successfully");
      toast.success(t("profileUpdated"));
      
      // Navigate to profile page after successful update
      navigate('/profile');
    } catch (error) {
      console.error('Error:', error);
      if (error instanceof Error) {
        toast.error(`${t("errorUpdatingProfile")}: ${error.message}`);
      } else {
        toast.error(t("errorUpdatingProfile"));
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <ProfileAvatar form={form} />
        <ProfileBasicInfo form={form} />
        <ProfileAdditionalInfo form={form} />
        <ExtendedProfileInfo form={form} />
        <ProfileGallery form={form} />
        
        <Button type="submit" className="w-full">
          {t("saveProfile")}
        </Button>
      </form>
    </Form>
  );
};