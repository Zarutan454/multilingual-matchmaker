import { useForm } from "react-hook-form";
import { useLanguage } from "../../contexts/LanguageContext";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../contexts/AuthContext";
import { createClient, UserAttributes } from "@supabase/supabase-js";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileBasicInfo } from "./ProfileBasicInfo";
import { ProfileAdditionalInfo } from "./ProfileAdditionalInfo";
import { profileSchema, ProfileFormValues, UserMetadata } from "./types";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const ProfileForm = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.user_metadata?.full_name || "",
      bio: user?.user_metadata?.bio || "",
      location: user?.user_metadata?.location || "",
      interests: user?.user_metadata?.interests || "",
      occupation: user?.user_metadata?.occupation || "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const metadata: UserMetadata = {
        full_name: data.fullName,
        bio: data.bio,
        location: data.location,
        interests: data.interests,
        occupation: data.occupation,
      };

      if (data.avatar instanceof File) {
        const fileExt = data.avatar.name.split('.').pop();
        const filePath = `${user?.id}/${Math.random()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, data.avatar);

        if (uploadError) {
          throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);

        metadata.avatar_url = publicUrl;
      }

      const updates: UserAttributes = {
        data: metadata
      };

      const { error } = await supabase.auth.updateUser(updates);

      if (error) throw error;
      
      toast.success(t("profileUpdated"));
    } catch (error) {
      console.error('Error:', error);
      toast.error(t("errorUpdatingProfile"));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <ProfileAvatar form={form} />
        <ProfileBasicInfo form={form} />
        <ProfileAdditionalInfo form={form} />
        
        <Button type="submit" className="w-full">
          {t("saveProfile")}
        </Button>
      </form>
    </Form>
  );
};