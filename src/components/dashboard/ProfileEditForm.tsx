import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Profile } from "@/types/profile";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    age: undefined,
    gender: '',
    height: '',
    bust_size: '',
    body_type: '',
    dress_size: '',
    hair_color: '',
    hair_length: '',
    hair_type: '',
    eye_color: '',
    skin_tone: '',
    grooming: '',
    languages: []
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
          age: editedProfile.age,
          gender: editedProfile.gender,
          height: editedProfile.height,
          bust_size: editedProfile.bust_size,
          body_type: editedProfile.body_type,
          dress_size: editedProfile.dress_size,
          hair_color: editedProfile.hair_color,
          hair_length: editedProfile.hair_length,
          hair_type: editedProfile.hair_type,
          eye_color: editedProfile.eye_color,
          skin_tone: editedProfile.skin_tone,
          grooming: editedProfile.grooming,
          languages: editedProfile.languages
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

      <div className="grid grid-cols-2 gap-4">
        <Input
          type="number"
          placeholder={t("age")}
          value={editedProfile.age || ''}
          onChange={(e) => setEditedProfile({ ...editedProfile, age: parseInt(e.target.value) })}
          className="bg-gray-800 border-gray-700"
        />

        <Select
          value={editedProfile.gender}
          onValueChange={(value) => setEditedProfile({ ...editedProfile, gender: value })}
        >
          <SelectTrigger className="bg-gray-800 border-gray-700">
            <SelectValue placeholder={t("selectGender")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">{t("male")}</SelectItem>
            <SelectItem value="female">{t("female")}</SelectItem>
            <SelectItem value="other">{t("other")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder={t("height")}
          value={editedProfile.height || ''}
          onChange={(e) => setEditedProfile({ ...editedProfile, height: e.target.value })}
          className="bg-gray-800 border-gray-700"
        />
        
        <Input
          placeholder={t("bustSize")}
          value={editedProfile.bust_size || ''}
          onChange={(e) => setEditedProfile({ ...editedProfile, bust_size: e.target.value })}
          className="bg-gray-800 border-gray-700"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder={t("bodyType")}
          value={editedProfile.body_type || ''}
          onChange={(e) => setEditedProfile({ ...editedProfile, body_type: e.target.value })}
          className="bg-gray-800 border-gray-700"
        />
        
        <Input
          placeholder={t("dressSize")}
          value={editedProfile.dress_size || ''}
          onChange={(e) => setEditedProfile({ ...editedProfile, dress_size: e.target.value })}
          className="bg-gray-800 border-gray-700"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{t("appearance")}</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder={t("hairColor")}
            value={editedProfile.hair_color || ''}
            onChange={(e) => setEditedProfile({ ...editedProfile, hair_color: e.target.value })}
            className="bg-gray-800 border-gray-700"
          />
          
          <Input
            placeholder={t("hairLength")}
            value={editedProfile.hair_length || ''}
            onChange={(e) => setEditedProfile({ ...editedProfile, hair_length: e.target.value })}
            className="bg-gray-800 border-gray-700"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder={t("hairType")}
            value={editedProfile.hair_type || ''}
            onChange={(e) => setEditedProfile({ ...editedProfile, hair_type: e.target.value })}
            className="bg-gray-800 border-gray-700"
          />
          
          <Input
            placeholder={t("eyeColor")}
            value={editedProfile.eye_color || ''}
            onChange={(e) => setEditedProfile({ ...editedProfile, eye_color: e.target.value })}
            className="bg-gray-800 border-gray-700"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder={t("skinTone")}
            value={editedProfile.skin_tone || ''}
            onChange={(e) => setEditedProfile({ ...editedProfile, skin_tone: e.target.value })}
            className="bg-gray-800 border-gray-700"
          />
          
          <Input
            placeholder={t("grooming")}
            value={editedProfile.grooming || ''}
            onChange={(e) => setEditedProfile({ ...editedProfile, grooming: e.target.value })}
            className="bg-gray-800 border-gray-700"
          />
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? t("saving") : t("saveChanges")}
      </Button>
    </form>
  );
};