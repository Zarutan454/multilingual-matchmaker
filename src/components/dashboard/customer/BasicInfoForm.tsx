import { useLanguage } from "@/contexts/LanguageContext";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface BasicInfoFormProps {
  form: UseFormReturn<any>;
}

export const BasicInfoForm = ({ form }: BasicInfoFormProps) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="full_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">{t("fullName")}</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                value={field.value || ''} 
                className="bg-black/30 border-[#9b87f5]/30 text-white placeholder:text-gray-400"
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">{t("location")}</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                value={field.value || ''} 
                className="bg-black/30 border-[#9b87f5]/30 text-white placeholder:text-gray-400"
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="age"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">{t("age")}</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                {...field} 
                onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : '')}
                value={field.value || ''}
                className="bg-black/30 border-[#9b87f5]/30 text-white placeholder:text-gray-400"
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="gender"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">{t("gender")}</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ''}>
              <FormControl>
                <SelectTrigger className="bg-black/30 border-[#9b87f5]/30 text-white">
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
        )}
      />
    </div>
  );
};