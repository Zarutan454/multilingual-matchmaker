import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { Profile } from "@/types/profile";

interface InterestsFormProps {
  profile: Partial<Profile>;
  onFieldChange: (field: string, value: any) => void;
}

export const InterestsForm = ({ profile, onFieldChange }: InterestsFormProps) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t("interests")}</h3>
      <Textarea
        placeholder={t("enterYourInterests")}
        value={profile.interests || ''}
        onChange={(e) => onFieldChange('interests', e.target.value)}
        className="bg-gray-800 border-gray-700 min-h-[100px]"
      />
    </div>
  );
};