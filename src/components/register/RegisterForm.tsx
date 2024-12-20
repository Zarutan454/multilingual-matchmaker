import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormFields } from "./RegisterFormFields";
import { Loader2 } from "lucide-react";
import { useRegistration } from "./hooks/useRegistration";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  phoneNumber: z.string().optional(),
  age: z.string().optional(),
  country: z.string().optional(),
  nickname: z.string().min(2),
});

export const RegisterForm = () => {
  const { t } = useLanguage();
  const [userType, setUserType] = useState<"customer" | "provider">("customer");
  const { handleRegistration, isLoading, retryTimeout } = useRegistration();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      age: "",
      country: "",
      nickname: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.password !== values.confirmPassword) {
      form.setError("confirmPassword", { message: t("passwordsDoNotMatch") });
      return;
    }

    if (userType === "provider") {
      if (!values.phoneNumber) {
        form.setError("phoneNumber", { message: t("phoneRequired") });
        return;
      }
      if (!values.age || parseInt(values.age) < 18) {
        form.setError("age", { message: t("mustBe18") });
        return;
      }
      if (!values.country) {
        form.setError("country", { message: t("countryRequired") });
        return;
      }
    }

    await handleRegistration({ ...values, userType });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <RegisterFormFields
          userType={userType}
          setUserType={setUserType}
          form={form}
        />

        <Button 
          type="submit" 
          className="w-full bg-secondary hover:bg-secondary/80 text-white transition-colors"
          disabled={isLoading || retryTimeout > 0}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>{t("registering")}</span>
            </div>
          ) : retryTimeout > 0 ? (
            `${t("waitFor")} ${retryTimeout}s`
          ) : (
            t("submit")
          )}
        </Button>
      </form>
    </Form>
  );
};