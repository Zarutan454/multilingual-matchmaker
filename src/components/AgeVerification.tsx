import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Shield, AlertTriangle } from "lucide-react";

type AgeVerificationProps = {
  onVerified: () => void;
};

export const AgeVerification = ({ onVerified }: AgeVerificationProps) => {
  const { t } = useLanguage();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const isAgeVerified = localStorage.getItem('isAgeVerified');
    if (isAgeVerified === 'true') {
      onVerified();
    }
  }, [onVerified]);

  const handleVerification = (isOver18: boolean) => {
    if (isOver18) {
      localStorage.setItem('isAgeVerified', 'true');
      onVerified();
    } else {
      setIsVerifying(false);
    }
  };

  if (!isVerifying) {
    return (
      <div className="fixed inset-0 flex items-center justify-center p-4 overflow-hidden">
        <div className="absolute inset-0 bg-black">
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
        </div>
        <div className="absolute inset-0 backdrop-blur-[2px]"></div>
        <div className="bg-black/80 backdrop-blur-md rounded-lg p-8 max-w-md w-full text-center animate-fade-in border border-[#FFD700]/30 relative z-10 shadow-[0_0_15px_rgba(218,165,32,0.3)]">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-500 mb-4">{t("accessDenied")}</h2>
          <p className="text-white mb-4 text-lg">{t("mustBe18")}</p>
          <div className="text-sm text-white/80 hover:text-white transition-colors">
            <Link to="/terms" className="hover:text-[#FFD700] transition-colors">{t("terms")}</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 bg-black">
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
      </div>
      <div className="absolute inset-0 backdrop-blur-[2px]"></div>
      <div className="bg-black/80 backdrop-blur-md rounded-lg p-8 max-w-md w-full text-center animate-fade-in border border-[#FFD700]/30 relative z-10 shadow-[0_0_15px_rgba(218,165,32,0.3)]">
        <Shield className="w-12 h-12 text-[#FFD700] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-4">{t("ageVerification")}</h2>
        <p className="mb-6 text-lg text-white">{t("ageQuestion")}</p>
        
        <div className="space-y-4">
          <div className="text-sm text-white/90 mb-6">
            {t("legalDisclaimer")}
          </div>
          
          <div className="flex flex-col gap-4">
            <Button
              onClick={() => handleVerification(true)}
              className="w-full bg-[#FFD700] hover:bg-[#DAA520] text-black font-semibold transition-colors"
            >
              {t("yes")}
            </Button>
            <Button
              onClick={() => handleVerification(false)}
              variant="outline"
              className="w-full border-[#FFD700]/30 text-white hover:bg-[#FFD700]/10 hover:border-[#FFD700]/50 transition-all"
            >
              {t("no")}
            </Button>
          </div>

          <div className="text-xs text-white/90 mt-6">
            <p className="mb-2">{t("byProceeding")}</p>
            <div className="flex justify-center gap-4">
              <Link to="/terms" className="hover:text-[#FFD700] transition-colors">{t("terms")}</Link>
              <Link to="/privacy" className="hover:text-[#FFD700] transition-colors">{t("privacy")}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};