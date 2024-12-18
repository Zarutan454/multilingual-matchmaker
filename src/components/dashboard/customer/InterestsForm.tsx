import { useLanguage } from "@/contexts/LanguageContext";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

interface InterestsFormProps {
  form: UseFormReturn<any>;
}

export const InterestsForm = ({ form }: InterestsFormProps) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">{t("interests")}</h3>
      
      <FormField
        control={form.control}
        name="interests"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("interests")}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={t("enterYourInterests")}
                className="bg-gray-800 border-gray-700 min-h-[100px]"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};