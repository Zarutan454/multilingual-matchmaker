import { useState } from "react";
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

  const handleVerification = (isOver18: boolean) => {
    if (isOver18) {
      onVerified();
    } else {
      setIsVerifying(false);
    }
  };

  if (!isVerifying) {
    return (
      <div className="fixed inset-0 flex items-center justify-center p-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#D946EF] via-[#8B5CF6] to-[#F97316] opacity-20 animate-gradient-xy"></div>
        <div className="absolute inset-0 backdrop-blur-sm"></div>
        <div className="bg-black/80 backdrop-blur-md rounded-lg p-8 max-w-md w-full text-center animate-fade-in border border-neutral-700 relative z-10">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-500 mb-4">{t("accessDenied")}</h2>
          <p className="text-neutral-300 mb-4">{t("mustBe18")}</p>
          <div className="text-sm text-neutral-400">
            <Link to="/terms" className="hover:text-secondary">{t("terms")}</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#D946EF] via-[#8B5CF6] to-[#F97316] opacity-20 animate-gradient-xy"></div>
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      <div className="bg-black/80 backdrop-blur-md rounded-lg p-8 max-w-md w-full text-center animate-fade-in border border-neutral-700 relative z-10">
        <Shield className="w-12 h-12 text-secondary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-4">{t("ageVerification")}</h2>
        <p className="mb-6 text-lg text-neutral-300">{t("ageQuestion")}</p>
        
        <div className="space-y-4">
          <div className="text-sm text-neutral-400 mb-6">
            {t("legalDisclaimer")}
          </div>
          
          <div className="flex flex-col gap-4">
            <Button
              onClick={() => handleVerification(true)}
              className="w-full bg-secondary hover:bg-secondary/90 text-white"
            >
              {t("yes")}
            </Button>
            <Button
              onClick={() => handleVerification(false)}
              variant="outline"
              className="w-full border-neutral-700 text-neutral-300 hover:bg-neutral-800"
            >
              {t("no")}
            </Button>
          </div>

          <div className="text-xs text-neutral-500 mt-6">
            <p className="mb-2">{t("byProceeding")}</p>
            <div className="flex justify-center gap-4">
              <Link to="/terms" className="hover:text-secondary">{t("terms")}</Link>
              <Link to="/privacy" className="hover:text-secondary">{t("privacy")}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};