import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import { RegisterFormFieldsProps } from "./types";

export const RegisterFormFields: React.FC<RegisterFormFieldsProps> = ({ 
  form, 
  userType, 
  setUserType 
}) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex gap-4 mb-6">
        <Button
          type="button"
          variant={userType === "customer" ? "default" : "outline"}
          className={`flex-1 ${userType === "customer" ? "bg-[#9b87f5] hover:bg-[#7E69AB]" : "hover:bg-[#9b87f5]/10"}`}
          onClick={() => { setUserType("customer"); }}
          data-test-id="customer-type-button"
        >
          {t("AUTH.REGISTER.CUSTOMER")}
        </Button>
        <Button
          type="button"
          variant={userType === "provider" ? "default" : "outline"}
          className={`flex-1 ${userType === "provider" ? "bg-[#9b87f5] hover:bg-[#7E69AB]" : "hover:bg-[#9b87f5]/10"}`}
          onClick={() => { setUserType("provider"); }}
          data-test-id="provider-type-button"
        >
          {t("AUTH.REGISTER.PROVIDER")}
        </Button>
      </div>

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">{t("AUTH.REGISTER.EMAIL")}</FormLabel>
            <FormControl>
              <Input
                type="email"
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
        name="nickname"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">{t("AUTH.REGISTER.NICKNAME")}</FormLabel>
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
            <FormLabel className="text-white">{t("AUTH.REGISTER.PASSWORD")}</FormLabel>
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
            <FormLabel className="text-white">{t("AUTH.REGISTER.CONFIRM_PASSWORD")}</FormLabel>
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
                <FormLabel className="text-white">{t("AUTH.REGISTER.PHONE")}</FormLabel>
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
                <FormLabel className="text-white">{t("AUTH.REGISTER.AGE")}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="18"
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
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">{t("AUTH.REGISTER.COUNTRY")}</FormLabel>
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