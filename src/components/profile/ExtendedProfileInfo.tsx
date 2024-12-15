import { UseFormReturn } from "react-hook-form";
import { useLanguage } from "../../contexts/LanguageContext";
import { Input } from "../ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ProfileFormValues } from "./types";

interface ExtendedProfileInfoProps {
  form: UseFormReturn<ProfileFormValues>;
}

export const ExtendedProfileInfo = ({ form }: ExtendedProfileInfoProps) => {
  const { t } = useLanguage();

  const serviceCategories = [
    { id: "massage", name: "Massage" },
    { id: "physio", name: "Physiotherapie" },
    { id: "training", name: "Personal Training" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("height")}</FormLabel>
              <FormControl>
                <Input {...field} placeholder="170 cm" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("weight")}</FormLabel>
              <FormControl>
                <Input {...field} placeholder="65 kg" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="availabilityStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("availabilityStatus")}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t("selectAvailability")} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="online">{t("online")}</SelectItem>
                <SelectItem value="offline">{t("offline")}</SelectItem>
                <SelectItem value="busy">{t("busy")}</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="serviceCategories"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("serviceCategories")}</FormLabel>
            <Select
              onValueChange={(value) => {
                const currentCategories = field.value || [];
                if (!currentCategories.includes(value)) {
                  field.onChange([...currentCategories, value]);
                }
              }}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t("selectServices")} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {serviceCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};