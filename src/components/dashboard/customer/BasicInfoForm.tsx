import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { Profile } from "@/types/profile";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BasicInfoFormProps {
  profile: Partial<Profile>;
  onFieldChange: (field: string, value: any) => void;
}

export const BasicInfoForm = ({ profile, onFieldChange }: BasicInfoFormProps) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">{t("basicInfo")}</h3>
      
      <div className="space-y-4">
        <FormItem>
          <FormLabel>{t("fullName")}</FormLabel>
          <FormControl>
            <Input
              placeholder={t("fullName")}
              value={profile.full_name || ''}
              onChange={(e) => onFieldChange('full_name', e.target.value)}
              className="bg-gray-800 border-gray-700"
            />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>{t("location")}</FormLabel>
          <FormControl>
            <Input
              placeholder={t("location")}
              value={profile.location || ''}
              onChange={(e) => onFieldChange('location', e.target.value)}
              className="bg-gray-800 border-gray-700"
            />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>{t("age")}</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder={t("age")}
              value={profile.age || ''}
              onChange={(e) => onFieldChange('age', parseInt(e.target.value))}
              className="bg-gray-800 border-gray-700"
            />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>{t("gender")}</FormLabel>
          <Select
            value={profile.gender || ''}
            onValueChange={(value) => onFieldChange('gender', value)}
          >
            <FormControl>
              <SelectTrigger className="bg-gray-800 border-gray-700">
                <SelectValue placeholder={t("selectGender")} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="male">{t("male")}</SelectItem>
              <SelectItem value="female">{t("female")}</SelectItem>
              <SelectItem value="other">{t("other")}</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      </div>
    </div>
  );
};