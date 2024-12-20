import React from 'react';
import { useLanguage } from "../../contexts/LanguageContext";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";

interface RegisterFormFieldsProps {
  userType: "customer" | "provider";
  setUserType: Dispatch<SetStateAction<"customer" | "provider">>;
  form: UseFormReturn<Record<string, unknown>>;
}

export function RegisterFormFields({ 
  userType, 
  setUserType, 
  form 
}: RegisterFormFieldsProps): JSX.Element {
  const { t } = useLanguage();

  return (
    <div className="space-y-6" data-test-id="register-form-fields">
      <div className="flex gap-4 margin-bottom-6">
        <Button
          type="button"
          variant={userType === "customer" ? "default" : "outline"}
          className={"flex-1 " + (userType === "customer" ? "bg-[#9b87f5] hover:bg-[#7E69AB]" : "hover:bg-[#9b87f5]/10")}
          onClick={function() { setUserType("customer"); }}
          data-test-id="customer-type-button"
        >
          {t("AUTH.REGISTER.CUSTOMER")}
        </Button>
        <Button
          type="button"
          variant={userType === "provider" ? "default" : "outline"}
          className={"flex-1 " + (userType === "provider" ? "bg-[#9b87f5] hover:bg-[#7E69AB]" : "hover:bg-[#9b87f5]/10")}
          onClick={function() { setUserType("provider"); }}
          data-test-id="provider-type-button"
        >
          {t("AUTH.REGISTER.PROVIDER")}
        </Button>
      </div>

      <FormField
        control={form.control}
        name="email"
        render={function({ field }) {
          return (
            <FormItem>
              <FormLabel className="text-white">{t("AUTH.REGISTER.EMAIL")}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  className="background-black/30 border-[#9b87f5]/30 text-white"
                  placeholder="email@example.com"
                  {...field}
                  data-test-id="email-input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      <FormField
        control={form.control}
        name="nickname"
        render={function({ field }) {
          return (
            <FormItem>
              <FormLabel className="text-white">{t("AUTH.REGISTER.NICKNAME")}</FormLabel>
              <FormControl>
                <Input
                  className="background-black/30 border-[#9b87f5]/30 text-white"
                  {...field}
                  data-test-id="nickname-input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      <FormField
        control={form.control}
        name="password"
        render={function({ field }) {
          return (
            <FormItem>
              <FormLabel className="text-white">{t("AUTH.REGISTER.PASSWORD")}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  className="background-black/30 border-[#9b87f5]/30 text-white"
                  {...field}
                  data-test-id="password-input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      <FormField
        control={form.control}
        name="confirmPassword"
        render={function({ field }) {
          return (
            <FormItem>
              <FormLabel className="text-white">{t("AUTH.REGISTER.CONFIRM_PASSWORD")}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  className="background-black/30 border-[#9b87f5]/30 text-white"
                  {...field}
                  data-test-id="confirm-password-input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      {userType === "provider" && (
        <>
          <FormField
            control={form.control}
            name="phoneNumber"
            render={function({ field }) {
              return (
                <FormItem>
                  <FormLabel className="text-white">{t("AUTH.REGISTER.PHONE_NUMBER")}</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      className="background-black/30 border-[#9b87f5]/30 text-white"
                      {...field}
                      data-test-id="phone-number-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="age"
            render={function({ field }) {
              return (
                <FormItem>
                  <FormLabel className="text-white">{t("AUTH.REGISTER.AGE")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="background-black/30 border-[#9b87f5]/30 text-white"
                      min="18"
                      {...field}
                      data-test-id="age-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="country"
            render={function({ field }) {
              return (
                <FormItem>
                  <FormLabel className="text-white">{t("AUTH.REGISTER.COUNTRY")}</FormLabel>
                  <FormControl>
                    <Input
                      className="background-black/30 border-[#9b87f5]/30 text-white"
                      {...field}
                      data-test-id="country-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </>
      )}
    </div>
  );
}