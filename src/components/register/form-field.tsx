import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useLanguage } from "../../contexts/LanguageContext";
import { RegisterFormData } from "./types";
import { UseFormReturn } from "react-hook-form";

interface FormFieldProps {
  form: UseFormReturn<RegisterFormData>;
  name: keyof RegisterFormData;
  type?: string;
  placeholder?: string;
  min?: string;
  translationKey: string;
}

export function RegisterFormField({ 
  form, 
  name, 
  type = "text",
  placeholder = "",
  min,
  translationKey
}: FormFieldProps): JSX.Element {
  const { t } = useLanguage();

  return (
    <FormField
      control={form.control}
      name={name}
      render={function({ field }) {
        return (
          <FormItem>
            <FormLabel className="text-white">{t(translationKey)}</FormLabel>
            <FormControl>
              <Input
                {...field}
                type={type}
                className="background-black/30 border-[#9b87f5]/30 text-white"
                placeholder={placeholder}
                min={min}
                data-test-id={`${name}-input`}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}