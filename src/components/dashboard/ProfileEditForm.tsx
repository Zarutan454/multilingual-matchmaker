import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Profile } from "@/types/profile";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface ProfileEditFormProps {
  profile: Profile | null;
  onProfileUpdate: (updatedProfile: Profile) => void;
}

export const ProfileEditForm = ({ profile, onProfileUpdate }: ProfileEditFormProps) => {
  const { t } = useLanguage();
  const [editedProfile, setEditedProfile] = useState<Partial<Profile>>(profile || {
    full_name: '',
    bio: '',
    location: '',
    interests: '',
    occupation: '',
    height: '',
    weight: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          full_name: editedProfile.full_name,
          bio: editedProfile.bio,
          location: editedProfile.location,
          interests: editedProfile.interests,
          occupation: editedProfile.occupation,
          height: editedProfile.height,
          weight: editedProfile.weight
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          placeholder={t("fullName")}
          value={editedProfile.full_name || ''}
          onChange={(e) => setEditedProfile({ ...editedProfile, full_name: e.target.value })}
          className="bg-gray-800 border-gray-700"
        />
      </div>
      
      <div>
        <Textarea
          placeholder={t("bio")}
          value={editedProfile.bio || ''}
          onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
          className="bg-gray-800 border-gray-700"
        />
      </div>
      
      <div>
        <Input
          placeholder={t("location")}
          value={editedProfile.location || ''}
          onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
          className="bg-gray-800 border-gray-700"
        />
      </div>

      <div>
        <Input
          placeholder={t("interests")}
          value={editedProfile.interests || ''}
          onChange={(e) => setEditedProfile({ ...editedProfile, interests: e.target.value })}
          className="bg-gray-800 border-gray-700"
        />
      </div>

      <div>
        <Input
          placeholder={t("occupation")}
          value={editedProfile.occupation || ''}
          onChange={(e) => setEditedProfile({ ...editedProfile, occupation: e.target.value })}
          className="bg-gray-800 border-gray-700"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder={t("height")}
          value={editedProfile.height || ''}
          onChange={(e) => setEditedProfile({ ...editedProfile, height: e.target.value })}
          className="bg-gray-800 border-gray-700"
        />
        <Input
          placeholder={t("weight")}
          value={editedProfile.weight || ''}
          onChange={(e) => setEditedProfile({ ...editedProfile, weight: e.target.value })}
          className="bg-gray-800 border-gray-700"
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? t("saving") : t("saveChanges")}
      </Button>
    </form>
  );
};