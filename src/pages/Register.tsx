import { Card } from "@/components/ui/card";
import { useLanguage } from "../contexts/LanguageContext";
import { RegisterForm } from "../components/register/RegisterForm";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from "../lib/supabase";
import { Separator } from "@/components/ui/separator";

const Register = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 p-4">
      <Card className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          {t("register")}
        </h1>

        <RegisterForm />

        <Separator className="my-4" />

        <div className="space-y-4">
          <p className="text-sm text-gray-500 text-center">{t("orContinueWith")}</p>
          
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={["google"]}
            view="sign_up"
            showLinks={false}
          />
        </div>
      </Card>
    </div>
  );
};

export default Register;