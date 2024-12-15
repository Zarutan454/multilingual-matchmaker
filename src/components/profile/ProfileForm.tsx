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

export const ProfileForm = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit } = useForm<ProfileFormValues>({
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
      priceRange: user?.user_metadata?.price_range || { min: 0, max: 0 },
      availabilityStatus: user?.user_metadata?.availability_status || "offline",
    },
  });

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
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-white text-sm">
          {t("fullName")}
        </Label>
        <Input
          id="fullName"
          {...register("fullName")}
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
        <Label htmlFor="interests" className="text-white text-sm">
          {t("interests")}
        </Label>
        <Input
          id="interests"
          {...register("interests")}
          className="bg-black/50 border-[#FFD700]/30 text-white placeholder-neutral-400 focus:border-[#FFD700] transition-colors"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="occupation" className="text-white text-sm">
          {t("occupation")}
        </Label>
        <Input
          id="occupation"
          {...register("occupation")}
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
        {isSubmitting ? t("savingProfile") : t("saveProfile")}
      </Button>
    </form>
  );
};