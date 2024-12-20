import { Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";

interface AgeVerificationProps {
  onVerified: () => void;
}

export const AgeVerification = ({ onVerified }: AgeVerificationProps) => {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
      <div className="bg-black/80 backdrop-blur-md rounded-lg p-8 max-w-md w-full text-center animate-fade-in border border-[#FFD700]/30 relative z-10 shadow-[0_0_15px_rgba(218,165,32,0.3)]">
        <Shield className="w-12 h-12 text-[#FFD700] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-4">{t("auth.verification.title")}</h2>
        <p className="mb-6 text-lg text-white">{t("auth.verification.question")}</p>
        
        <div className="space-y-4">
          <div className="text-sm text-white/90 mb-6">
            {t("auth.verification.disclaimer")}
          </div>
          <div className="flex gap-4 justify-center">
            <Button
              variant="outline"
              className="bg-red-500/10 hover:bg-red-500/20 border-red-500/50 text-white"
              onClick={() => window.location.href = "https://www.google.com"}
            >
              {t("auth.verification.no")}
            </Button>
            <Button
              className="bg-[#FFD700] hover:bg-[#DAA520] text-black font-semibold"
              onClick={onVerified}
            >
              {t("auth.verification.yes")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};