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
      // Simulate API call to update profile
      console.log("Profile updated successfully");
      toast.success(t("profileUpdated"));
      
      // Weiterleitung zum Dashboard statt zur Profilseite
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-neutral-300 text-sm">
          {t("fullName")}
        </Label>
        <Input
          id="fullName"
          {...register("fullName")}
          className="bg-[#222222] border-neutral-700 text-white placeholder-neutral-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio" className="text-neutral-300 text-sm">
          {t("bio")}
        </Label>
        <Input
          id="bio"
          {...register("bio")}
          className="bg-[#222222] border-neutral-700 text-white placeholder-neutral-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location" className="text-neutral-300 text-sm">
          {t("location")}
        </Label>
        <Input
          id="location"
          {...register("location")}
          className="bg-[#222222] border-neutral-700 text-white placeholder-neutral-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="interests" className="text-neutral-300 text-sm">
          {t("interests")}
        </Label>
        <Input
          id="interests"
          {...register("interests")}
          className="bg-[#222222] border-neutral-700 text-white placeholder-neutral-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="occupation" className="text-neutral-300 text-sm">
          {t("occupation")}
        </Label>
        <Input
          id="occupation"
          {...register("occupation")}
          className="bg-[#222222] border-neutral-700 text-white placeholder-neutral-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="height" className="text-neutral-300 text-sm">
          {t("height")}
        </Label>
        <Input
          id="height"
          {...register("height")}
          className="bg-[#222222] border-neutral-700 text-white placeholder-neutral-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="weight" className="text-neutral-300 text-sm">
          {t("weight")}
        </Label>
        <Input
          id="weight"
          {...register("weight")}
          className="bg-[#222222] border-neutral-700 text-white placeholder-neutral-500"
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-secondary hover:bg-secondary/80 text-white transition-colors" 
        disabled={isSubmitting}
      >
        {isSubmitting ? t("savingProfile") : t("saveProfile")}
      </Button>
    </form>
  );
};
