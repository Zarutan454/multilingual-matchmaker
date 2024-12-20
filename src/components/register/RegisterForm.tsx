import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";
import { RegisterFormFields } from "./RegisterFormFields";
import { Loader2 } from "lucide-react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const navigate = useNavigate();
  const { signUp } = useAuth();
  
  const [userType, setUserType] = useState<"customer" | "provider">("customer");
  const [isLoading, setIsLoading] = useState(false);
  const [retryTimeout, setRetryTimeout] = useState(0);

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
    if (retryTimeout > 0) {
      toast.error(`${t("pleaseWait")} ${retryTimeout} ${t("seconds")}`);
      return;
    }

    if (values.password !== values.confirmPassword) {
      toast.error(t("passwordsDoNotMatch"));
      return;
    }

    if (userType === "provider") {
      if (!values.phoneNumber) {
        toast.error(t("phoneRequired"));
        return;
      }
      if (!values.age || parseInt(values.age) < 18) {
        toast.error(t("mustBe18"));
        return;
      }
      if (!values.country) {
        toast.error(t("countryRequired"));
        return;
      }
    }

    try {
      setIsLoading(true);
      console.log("Starting registration process...");
      
      const { data: signUpData, error: signUpError } = await signUp(values.email, values.password);
      
      if (signUpError) {
        console.error("SignUp error:", signUpError);
        
        if (signUpError.message.includes("over_email_send_rate_limit")) {
          const waitTime = 50;
          setRetryTimeout(waitTime);
          
          const interval = setInterval(() => {
            setRetryTimeout((current) => {
              if (current <= 1) {
                clearInterval(interval);
                return 0;
              }
              return current - 1;
            });
          }, 1000);

          toast.error(`${t("tooManyAttempts")} ${waitTime} ${t("seconds")}`);
          return;
        }

        // Handle user already exists error
        if (signUpError.message.includes("already registered") || signUpError.message.includes("already exists")) {
          toast.error("Diese E-Mail-Adresse ist bereits registriert. Bitte melden Sie sich stattdessen an.");
          navigate("/login");
          return;
        }
        
        if (signUpError.message.includes("email")) {
          toast.error(t("emailAlreadyExists"));
        } else {
          toast.error(signUpError.message);
        }
        return;
      }

      if (!signUpData?.user?.id) {
        console.error("No user ID received after signup");
        toast.error(t("registrationError"));
        return;
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: signUpData.user.id,
            user_type: userType,
            full_name: values.nickname,
            contact_info: {
              phone: values.phoneNumber,
              email: values.email
            },
            age: values.age ? parseInt(values.age) : null,
            location: values.country,
            is_verified: false,
            verification_status: 'pending'
          }
        ]);

      if (profileError) {
        console.error("Profile creation error:", profileError);
        toast.error(t("profileCreationError"));
        return;
      }

      const { error: metadataError } = await supabase.auth.updateUser({
        data: {
          user_type: userType,
          phone: values.phoneNumber,
          age: values.age,
          country: values.country,
          nickname: values.nickname,
          last_nickname_change: new Date().toISOString()
        }
      });

      if (metadataError) {
        console.error("Metadata update error:", metadataError);
      }
      
      console.log("Registration successful!");
      toast.success(t("registrationSuccess"));
      toast.info(t("pleaseCheckEmail"));
      
      navigate(userType === "provider" ? "/provider-dashboard" : "/dashboard");
      
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(t("registrationError"));
    } finally {
      setIsLoading(false);
    }
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