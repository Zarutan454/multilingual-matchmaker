import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

interface BasicInfoFormProps {
  form: UseFormReturn<any>;
}

export const BasicInfoForm = ({ form }: BasicInfoFormProps) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">{t("basicInfo")}</h3>
      
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("fullName")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("fullName")}
                  className="bg-gray-800 border-gray-700"
                  {...field}
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
              <FormLabel>{t("location")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("location")}
                  className="bg-gray-800 border-gray-700"
                  {...field}
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
              <FormLabel>{t("age")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={t("age")}
                  className="bg-gray-800 border-gray-700"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : '')}
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
              <FormLabel>{t("gender")}</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
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
          )}
        />
      </div>
    </div>
  );
};