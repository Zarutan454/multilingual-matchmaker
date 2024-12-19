import { useForm } from "react-hook-form";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dispatch, SetStateAction } from "react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  userType: z.enum(["customer", "provider"]),
});

type FormData = z.infer<typeof formSchema>;

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

export const RegisterFormFields = ({ userType, setUserType, formData, setFormData }: RegisterFormFieldsProps) => {
  const { t } = useLanguage();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      userType: "customer",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => console.log(data))} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("email")}</FormLabel>
              <FormControl>
                <Input {...field} type="email" value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} />
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
              <FormLabel>{t("password")}</FormLabel>
              <FormControl>
                <Input {...field} type="password" value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="userType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("userType")}</FormLabel>
              <Select value={userType} onValueChange={(value: "customer" | "provider") => setUserType(value)}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectUserType")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="customer">{t("registerAsCustomer")}</SelectItem>
                  <SelectItem value="provider">{t("registerAsProvider")}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {t("register")}
        </Button>
      </form>
    </Form>
  );
};