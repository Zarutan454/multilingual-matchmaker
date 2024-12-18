import { useLanguage } from "@/contexts/LanguageContext";
import { Profile } from "@/types/profile";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface InterestsFormProps {
  profile: Partial<Profile>;
  onFieldChange: (field: string, value: any) => void;
}

export const InterestsForm = ({ profile, onFieldChange }: InterestsFormProps) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">{t("interests")}</h3>
      
      <FormItem>
        <FormLabel>{t("interests")}</FormLabel>
        <FormControl>
          <Textarea
            placeholder={t("enterYourInterests")}
            value={profile.interests || ''}
            onChange={(e) => onFieldChange('interests', e.target.value)}
            className="bg-gray-800 border-gray-700 min-h-[100px]"
          />
        </FormControl>
      </FormItem>
    </div>
  );
};