import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { RegistrationFormValues } from "../types";

export const useRegistration = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [retryTimeout, setRetryTimeout] = useState(0);

  const handleRegistration = async (values: RegistrationFormValues) => {
    if (retryTimeout > 0) {
      toast.error(`${t("pleaseWait")} ${retryTimeout} ${t("seconds")}`);
      return;
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

        if (signUpError.message.includes("already registered") || signUpError.message.includes("already exists")) {
          toast.error(t("emailAlreadyExists"));
          navigate("/login");
          return;
        }
        
        toast.error(signUpError.message);
        return;
      }

      if (!signUpData?.user?.id) {
        console.error("No user ID received after signup");
        toast.error(t("registrationError"));
        return;
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .upsert([
          {
            id: signUpData.user.id,
            user_type: values.userType,
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

      console.log("Registration successful!");
      toast.success(t("registrationSuccess"));
      toast.info(t("pleaseCheckEmail"));
      
      navigate(values.userType === "provider" ? "/provider-dashboard" : "/dashboard");
      
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(t("registrationError"));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleRegistration,
    isLoading,
    retryTimeout
  };
};