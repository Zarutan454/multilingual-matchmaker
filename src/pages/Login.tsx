import { Card } from "@/components/ui/card";
import { useLanguage } from '../contexts/LanguageContext';
import { LoginForm } from '../components/auth/LoginForm';
import { Link } from "react-router-dom";
import { AgeVerification } from '../components/AgeVerification';
import { useState } from "react";

const Login = () => {
  const { t } = useLanguage();
  const [isAgeVerified, setIsAgeVerified] = useState(false);

  if (!isAgeVerified) {
    return <AgeVerification onVerified={() => setIsAgeVerified(true)} />;
  }

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
            {t("welcomeBack")}
          </p>
        </div>

        <LoginForm />
        
        <div className="text-center mt-6">
          <Link 
            to="/register" 
            className="text-[#9b87f5] hover:text-[#7E69AB] transition-colors duration-200"
          >
            {t("noAccount")} {t("registerNow")}
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;