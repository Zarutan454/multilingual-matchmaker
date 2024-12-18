import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";
import { RegisterFormFields } from "./RegisterFormFields";

export const RegisterForm = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { signUp } = useAuth();
  
  const [userType, setUserType] = useState<"customer" | "provider">("customer");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    age: "",
    country: "",
    nickname: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [retryTimeout, setRetryTimeout] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (retryTimeout > 0) {
      toast.error(`${t("pleaseWait")} ${retryTimeout} ${t("seconds")}`);
      return;
    }

    if (!formData.email || !formData.password || !formData.confirmPassword || !formData.nickname) {
      toast.error(t("fillAllFields"));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error(t("passwordsDoNotMatch"));
      return;
    }

    if (formData.password.length < 6) {
      toast.error(t("passwordTooShort"));
      return;
    }

    try {
      setIsLoading(true);
      console.log("Starting registration process...");
      
      const { data: signUpData, error: signUpError } = await signUp(formData.email, formData.password);
      
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

      // Erstelle das Profil in der profiles Tabelle
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: signUpData.user.id,
            user_type: userType,
            full_name: formData.nickname,
            phone: formData.phoneNumber,
            age: formData.age ? parseInt(formData.age) : null,
            location: formData.country,
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
          phone: formData.phoneNumber,
          age: formData.age,
          country: formData.country,
          nickname: formData.nickname,
          last_nickname_change: new Date().toISOString()
        }
      });

      if (metadataError) {
        console.error("Metadata update error:", metadataError);
      }
      
      console.log("Registration successful!");
      toast.success(t("registrationSuccess"));
      toast.info(t("pleaseCheckEmail"));
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(t("registrationError"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <RegisterFormFields
        userType={userType}
        setUserType={setUserType}
        formData={formData}
        setFormData={setFormData}
      />

      <Button 
        type="submit" 
        className="w-full bg-secondary hover:bg-secondary/80 text-white transition-colors"
        disabled={isLoading || retryTimeout > 0}
      >
        {isLoading ? t("registering") : retryTimeout > 0 ? `${t("waitFor")} ${retryTimeout}s` : t("submit")}
      </Button>
    </form>
  );
};