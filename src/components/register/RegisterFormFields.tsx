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

interface RegisterFormFieldsProps {
  userType: "customer" | "provider";
  setUserType: Dispatch<SetStateAction<"customer" | "provider">>;
  formData: {
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    age: string;
    country: string;
    nickname: string;
  };
  setFormData: Dispatch<SetStateAction<{
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    age: string;
    country: string;
    nickname: string;
  }>>;
}

export const RegisterFormFields = ({ 
  userType, 
  setUserType, 
  formData, 
  setFormData 
}: RegisterFormFieldsProps) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex gap-4 mb-6">
        <Button
          type="button"
          variant={userType === "customer" ? "secondary" : "outline"}
          className="flex-1"
          onClick={() => setUserType("customer")}
        >
          {t("registerAsCustomer")}
        </Button>
        <Button
          type="button"
          variant={userType === "provider" ? "secondary" : "outline"}
          className="flex-1"
          onClick={() => setUserType("provider")}
        >
          {t("registerAsProvider")}
        </Button>
      </div>

      <FormItem>
        <FormLabel>{t("email")}</FormLabel>
        <FormControl>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="bg-[#222222] border-neutral-700 text-white"
            placeholder="email@example.com"
          />
        </FormControl>
        <FormMessage />
      </FormItem>

      <FormItem>
        <FormLabel>{t("nickname")}</FormLabel>
        <FormControl>
          <Input
            type="text"
            value={formData.nickname}
            onChange={(e) => setFormData({...formData, nickname: e.target.value})}
            className="bg-[#222222] border-neutral-700 text-white"
          />
        </FormControl>
        <FormMessage />
      </FormItem>

      <FormItem>
        <FormLabel>{t("password")}</FormLabel>
        <FormControl>
          <Input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="bg-[#222222] border-neutral-700 text-white"
          />
        </FormControl>
        <FormMessage />
      </FormItem>

      <FormItem>
        <FormLabel>{t("confirmPassword")}</FormLabel>
        <FormControl>
          <Input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            className="bg-[#222222] border-neutral-700 text-white"
          />
        </FormControl>
        <FormMessage />
      </FormItem>

      {userType === "provider" && (
        <>
          <FormItem>
            <FormLabel>{t("phoneNumber")}</FormLabel>
            <FormControl>
              <Input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                className="bg-[#222222] border-neutral-700 text-white"
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel>{t("age")}</FormLabel>
            <FormControl>
              <Input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                className="bg-[#222222] border-neutral-700 text-white"
                min="18"
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel>{t("country")}</FormLabel>
            <FormControl>
              <Input
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
                className="bg-[#222222] border-neutral-700 text-white"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </>
      )}
    </div>
  );
};