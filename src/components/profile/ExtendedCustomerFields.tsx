import { UseFormReturn } from "react-hook-form";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProfileFormValues } from "./types";

interface ExtendedCustomerFieldsProps {
  form: UseFormReturn<ProfileFormValues>;
}

export const ExtendedCustomerFields = ({ form }: ExtendedCustomerFieldsProps) => {
  const { t } = useLanguage();

  const languages = [
    { id: "de", name: "Deutsch" },
    { id: "en", name: "English" },
    { id: "ru", name: "Русский" },
    { id: "ro", name: "Română" },
    { id: "it", name: "Italiano" },
    { id: "es", name: "Español" },
    { id: "fr", name: "Français" },
  ];

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="gender"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("gender")}</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t("selectGender")} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="male">{t("male")}</SelectItem>
                <SelectItem value="female">{t("female")}</SelectItem>
                <SelectItem value="other">{t("other")}</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="dateOfBirth"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("dateOfBirth")}</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="nationality"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("nationality")}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="languages"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("languages")}</FormLabel>
            <Select
              onValueChange={(value) => field.onChange([...field.value || [], value])}
              value={field.value?.[0] || ""}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t("selectLanguages")} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language.id} value={language.id}>
                    {language.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="preferredCommunication"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("preferredCommunication")}</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t("selectPreferredCommunication")} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="email">{t("email")}</SelectItem>
                <SelectItem value="phone">{t("phone")}</SelectItem>
                <SelectItem value="both">{t("both")}</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-4 border-t pt-4 mt-4">
        <h3 className="font-medium text-lg">{t("emergencyContact")}</h3>
        
        <FormField
          control={form.control}
          name="emergencyContact.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("emergencyContactName")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emergencyContact.phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("emergencyContactPhone")}</FormLabel>
              <FormControl>
                <Input type="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emergencyContact.relationship"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("emergencyContactRelationship")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};