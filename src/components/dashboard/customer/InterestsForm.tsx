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
      <FormField
        control={form.control}
        name="interests"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">{t("interests")}</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                value={field.value || ''} 
                className="bg-black/30 border-[#9b87f5]/30 text-white placeholder:text-gray-400"
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};