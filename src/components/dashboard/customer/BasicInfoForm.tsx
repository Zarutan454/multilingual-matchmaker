import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { Profile } from "@/types/profile";

interface BasicInfoFormProps {
  profile: Partial<Profile>;
  onFieldChange: (field: string, value: any) => void;
}

export const BasicInfoForm = ({ profile, onFieldChange }: BasicInfoFormProps) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <div>
        <Input
          placeholder={t("fullName")}
          value={profile.full_name || ''}
          onChange={(e) => onFieldChange('full_name', e.target.value)}
          className="bg-gray-800 border-gray-700"
        />
      </div>
      
      <div>
        <Input
          placeholder={t("location")}
          value={profile.location || ''}
          onChange={(e) => onFieldChange('location', e.target.value)}
          className="bg-gray-800 border-gray-700"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          type="number"
          placeholder={t("age")}
          value={profile.age || ''}
          onChange={(e) => onFieldChange('age', parseInt(e.target.value))}
          className="bg-gray-800 border-gray-700"
        />
      </div>
    </div>
  );
};