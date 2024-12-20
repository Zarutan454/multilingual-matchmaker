import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLanguage } from "@/contexts/LanguageContext";
import { Profile, ProfileFormValues } from "@/types/profile/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImagePlus } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface ProfileFormProps {
  profile: Profile | null;
  userId: string;
  onProfileUpdate: (updatedProfile: Profile) => void;
}

export const ProfileForm = ({ profile, userId, onProfileUpdate }: ProfileFormProps) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const { register, handleSubmit } = useForm<ProfileFormValues>({
    defaultValues: {
      fullName: profile?.full_name || "",
      location: profile?.location || "",
      height: profile?.height || "",
      weight: profile?.weight || "",
      bio: profile?.bio || "",
      interests: profile?.interests || "",
      occupation: profile?.occupation || "",
      services: profile?.services || [],
      languages: profile?.languages || [],
      priceRange: profile?.price_range || { min: 0, max: 0 },
      availabilityStatus: (profile?.availability_status as 'online' | 'offline' | 'busy') || 'offline'
    },
  });

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      const fileExt = file.name.split('.').pop();
      const filePath = `${userId}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('uploads')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', userId);

      if (updateError) throw updateError;

      toast.success(t("profileImageUpdated"));
    } catch (error) {
      console.error('Error updating avatar:', error);
      toast.error(t("errorUpdatingProfileImage"));
    }
  };

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true);
    try {
      const updateData = {
        full_name: data.fullName,
        location: data.location,
        height: data.height,
        weight: data.weight,
        bio: data.bio,
        interests: data.interests,
        occupation: data.occupation,
        price_range: data.priceRange,
        availability_status: data.availabilityStatus
      };

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', userId);

      if (error) throw error;

      const { data: updatedProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (fetchError) throw fetchError;

      onProfileUpdate(updatedProfile as Profile);
      toast.success(t("profileUpdated"));
    } catch (error) {
      console.error('Error:', error);
      toast.error(t("errorUpdatingProfile"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Avatar className="h-24 w-24 border-2 border-[#FFD700]/30">
            <AvatarImage src={avatarPreview || profile?.avatar_url} />
            <AvatarFallback className="bg-black/50 text-white">
              {profile?.full_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <label htmlFor="avatar" className="absolute bottom-0 right-0 bg-black/80 rounded-full p-1 cursor-pointer border border-[#FFD700]/30">
            <ImagePlus className="h-4 w-4 text-[#FFD700]" />
            <input
              type="file"
              id="avatar"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-white text-sm">
          {t("vollständiger Name")}
        </Label>
        <Input
          id="fullName"
          {...register("fullName")}
          className="bg-black/50 border-[#FFD700]/30 text-white placeholder-neutral-400 focus:border-[#FFD700] transition-colors"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location" className="text-white text-sm">
          {t("location")}
        </Label>
        <Input
          id="location"
          {...register("location")}
          className="bg-black/50 border-[#FFD700]/30 text-white placeholder-neutral-400 focus:border-[#FFD700] transition-colors"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio" className="text-white text-sm">
          {t("bio")}
        </Label>
        <Input
          id="bio"
          {...register("bio")}
          className="bg-black/50 border-[#FFD700]/30 text-white placeholder-neutral-400 focus:border-[#FFD700] transition-colors"
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-[#FFD700] hover:bg-[#DAA520] text-black font-semibold transition-colors" 
        disabled={isSubmitting}
      >
        {isSubmitting ? t("savingProfile") : t("saveChanges")}
      </Button>
    </form>
  );
};