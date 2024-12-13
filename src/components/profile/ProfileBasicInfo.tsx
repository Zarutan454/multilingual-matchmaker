import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useLanguage } from "../../contexts/LanguageContext";
import { UseFormReturn } from "react-hook-form";
import { ProfileFormValues } from "./types";

interface ProfileBasicInfoProps {
  form: UseFormReturn<ProfileFormValues>;
}

export const ProfileBasicInfo = ({ form }: ProfileBasicInfoProps) => {
  const { t } = useLanguage();

  return (
    <>
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("fullName")}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="bio"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("bio")}</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};