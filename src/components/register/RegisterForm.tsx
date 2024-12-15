import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";
import { RegisterFormFields } from "./RegisterFormFields";
import { RegisterFormKYC } from "./RegisterFormKYC";

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
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      toast.error(t("fillAllFields"));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error(t("passwordsDoNotMatch"));
      return;
    }

    try {
      setIsLoading(true);
      const { error } = await signUp(formData.email, formData.password);
      
      if (error) throw error;

      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          user_type: userType,
          phone: formData.phoneNumber,
          age: formData.age,
          country: formData.country,
          kyc_status: userType === "provider" ? "pending" : "not_required"
        }
      });

      if (updateError) throw updateError;
      
      toast.success(t("registrationSuccess"));
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
      
      {userType === "provider" && <RegisterFormKYC />}

      <Button 
        type="submit" 
        className="w-full bg-[#FFD700] hover:bg-[#DAA520] text-black font-semibold transition-colors"
        disabled={isLoading}
      >
        {isLoading ? t("registering") : t("submit")}
      </Button>
    </form>
  );
};