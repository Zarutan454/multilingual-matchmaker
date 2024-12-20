import { useLanguage } from "@/contexts/LanguageContext";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";

interface RegisterFormFieldsProps {
  userType: "customer" | "provider";
  setUserType: Dispatch<SetStateAction<"customer" | "provider">>;
  form: UseFormReturn<any>;
}

export const RegisterFormFields = ({ 
  userType, 
  setUserType, 
  form 
}: RegisterFormFieldsProps) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex gap-4 mb-6">
        <Button
          type="button"
          variant={userType === "customer" ? "default" : "outline"}
          className={`flex-1 ${userType === "customer" ? "bg-[#9b87f5] hover:bg-[#7E69AB]" : "hover:bg-[#9b87f5]/10"}`}
          onClick={() => setUserType("customer")}
        >
          Kunde
        </Button>
        <Button
          type="button"
          variant={userType === "provider" ? "default" : "outline"}
          className={`flex-1 ${userType === "provider" ? "bg-[#9b87f5] hover:bg-[#7E69AB]" : "hover:bg-[#9b87f5]/10"}`}
          onClick={() => setUserType("provider")}
        >
          Dienstleister
        </Button>
      </div>

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">{t("email")}</FormLabel>
            <FormControl>
              <Input
                type="email"
                className="bg-black/30 border-[#9b87f5]/30 text-white"
                placeholder="email@example.com"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="nickname"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">{t("nickname")}</FormLabel>
            <FormControl>
              <Input
                className="bg-black/30 border-[#9b87f5]/30 text-white"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">{t("password")}</FormLabel>
            <FormControl>
              <Input
                type="password"
                className="bg-black/30 border-[#9b87f5]/30 text-white"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">{t("confirmPassword")}</FormLabel>
            <FormControl>
              <Input
                type="password"
                className="bg-black/30 border-[#9b87f5]/30 text-white"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {userType === "provider" && (
        <>
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">{t("phoneNumber")}</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    className="bg-black/30 border-[#9b87f5]/30 text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
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
                    className="bg-black/30 border-[#9b87f5]/30 text-white"
                    min="18"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">{t("country")}</FormLabel>
                <FormControl>
                  <Input
                    className="bg-black/30 border-[#9b87f5]/30 text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </div>
  );
};