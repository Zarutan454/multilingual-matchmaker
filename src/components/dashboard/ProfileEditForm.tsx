import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Profile } from "@/types/profile";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { BasicInfoForm } from "./customer/BasicInfoForm";
import { InterestsForm } from "./customer/InterestsForm";

interface ProfileEditFormProps {
  profile: Profile | null;
  onProfileUpdate: (updatedProfile: Profile) => void;
}

export const ProfileEditForm = ({ profile, onProfileUpdate }: ProfileEditFormProps) => {
  const { t } = useLanguage();
  const [editedProfile, setEditedProfile] = useState<Partial<Profile>>(profile || {
    full_name: '',
    location: '',
    age: undefined,
    interests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (field: string, value: any) => {
    setEditedProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          full_name: editedProfile.full_name,
          location: editedProfile.location,
          age: editedProfile.age,
          interests: editedProfile.interests
        })
        .eq('id', profile?.id)
        .select()
        .single();

      if (error) throw error;
      
      onProfileUpdate(data as Profile);
      toast.success(t("profileUpdated"));
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(t("errorUpdatingProfile"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <BasicInfoForm 
        profile={editedProfile}
        onFieldChange={handleFieldChange}
      />
      
      <InterestsForm
        profile={editedProfile}
        onFieldChange={handleFieldChange}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? t("saving") : t("saveChanges")}
      </Button>
    </form>
  );
};