import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLanguage } from "../../contexts/LanguageContext";
import { ProfileFormValues } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ImagePlus } from "lucide-react";

export const ProfileForm = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const { register, handleSubmit } = useForm<ProfileFormValues>({
    defaultValues: {
      fullName: user?.user_metadata?.full_name || "",
      nickname: user?.user_metadata?.nickname || "",
      location: user?.user_metadata?.location || "",
      height: user?.user_metadata?.height || "",
      weight: user?.user_metadata?.weight || "",
      services: [],
      languages: [],
      priceRange: { min: 0, max: 0 },
      availabilityStatus: "offline",
      bio: "",
      interests: "",
      occupation: "",
    },
  });

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true);
    try {
      console.log("Profile updated successfully");
      toast.success(t("profileUpdated"));
      navigate('/dashboard');
    } catch (error) {
      console.error('Error:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(t("errorUpdatingProfile"));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-black/80 backdrop-blur-md rounded-lg p-8 max-w-md w-full text-center border border-[#FFD700]/30 shadow-[0_0_15px_rgba(218,165,32,0.3)]">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Avatar className="h-24 w-24 border-2 border-[#FFD700]/30">
            <AvatarImage src={avatarPreview || user?.user_metadata?.avatar_url} />
            <AvatarFallback className="bg-black/50 text-white">
              {user?.user_metadata?.nickname?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
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
        <Label htmlFor="nickname" className="text-white text-sm">
          {t("nickname")}
        </Label>
        <Input
          id="nickname"
          {...register("nickname")}
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
        <Label htmlFor="height" className="text-white text-sm">
          {t("height")}
        </Label>
        <Input
          id="height"
          {...register("height")}
          className="bg-black/50 border-[#FFD700]/30 text-white placeholder-neutral-400 focus:border-[#FFD700] transition-colors"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="weight" className="text-white text-sm">
          {t("weight")}
        </Label>
        <Input
          id="weight"
          {...register("weight")}
          className="bg-black/50 border-[#FFD700]/30 text-white placeholder-neutral-400 focus:border-[#FFD700] transition-colors"
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-[#FFD700] hover:bg-[#DAA520] text-black font-semibold transition-colors" 
        disabled={isSubmitting}
      >
        {isSubmitting ? t("savingProfile") : "Speichern"}
      </Button>
    </form>
  );
};