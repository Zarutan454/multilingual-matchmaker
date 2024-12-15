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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1A1F2C] to-black p-4 relative overflow-hidden">
      {/* Animated background particles */}
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
              backgroundColor: '#9b87f5',
              opacity: Math.random() * 0.5 + 0.2,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 backdrop-blur-[2px]" />
      
      <Card className="w-full max-w-md relative z-10 bg-black/80 backdrop-blur-md p-8 rounded-lg border border-[#9b87f5]/30 shadow-[0_0_15px_rgba(155,135,245,0.3)] animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            POPP<span className="text-secondary">*</span>IN
          </h1>
          <p className="text-gray-400 italic">
            {t("createYourAccount")}
          </p>
        </div>

        <RegisterForm />

        <Separator className="my-8 bg-[#9b87f5]/20" />

        <div className="space-y-4">
          <p className="text-sm text-white/80 text-center">{t("orContinueWith")}</p>
          
          <Auth
            supabaseClient={supabase}
            appearance={{ 
              theme: ThemeSupa,
              style: {
                button: {
                  background: '#9b87f5',
                  color: 'white',
                  borderRadius: '0.375rem',
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1rem',
                  padding: '0.75rem 1rem',
                  transition: 'all 0.2s',
                  ':hover': {
                    background: '#7E69AB',
                  }
                },
                anchor: {
                  color: '#9b87f5',
                  textDecoration: 'none',
                  ':hover': {
                    color: '#7E69AB',
                  }
                },
                container: {
                  gap: '1rem',
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