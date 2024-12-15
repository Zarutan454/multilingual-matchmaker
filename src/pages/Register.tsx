import { Card } from "@/components/ui/card";
import { RegisterForm } from "../components/register/RegisterForm";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from "../lib/supabase";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "../contexts/LanguageContext";

const Register = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 relative overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              backgroundColor: '#FFD700',
              opacity: Math.random() * 0.5 + 0.2,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 backdrop-blur-[2px]"></div>
      
      <Card className="bg-black/80 backdrop-blur-md p-8 rounded-lg shadow-md w-full max-w-md relative z-10 border border-[#FFD700]/30 shadow-[0_0_15px_rgba(218,165,32,0.3)] animate-fade-in">
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          {t("register")}
        </h1>

        <RegisterForm />

        <Separator className="my-4 bg-[#FFD700]/20" />

        <div className="space-y-4">
          <p className="text-sm text-white/80 text-center">{t("orContinueWith")}</p>
          
          <Auth
            supabaseClient={supabase}
            appearance={{ 
              theme: ThemeSupa,
              style: {
                button: {
                  background: '#FFD700',
                  color: 'black',
                  borderRadius: '0.375rem',
                },
                anchor: {
                  color: '#FFD700',
                },
              },
            }}
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