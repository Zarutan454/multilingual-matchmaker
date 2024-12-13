import { Input } from "../ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useLanguage } from "../../contexts/LanguageContext";
import { UseFormReturn } from "react-hook-form";
import { ProfileFormValues } from "./types";

interface ProfileAvatarProps {
  form: UseFormReturn<ProfileFormValues>;
}

export const ProfileAvatar = ({ form }: ProfileAvatarProps) => {
  const { t } = useLanguage();

  return (
    <FormField
      control={form.control}
      name="avatar"
      render={({ field: { onChange, value, ...field } }) => (
        <FormItem>
          <FormLabel>{t("profileImage")}</FormLabel>
          <FormControl>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  onChange(file);
                }
              }}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};