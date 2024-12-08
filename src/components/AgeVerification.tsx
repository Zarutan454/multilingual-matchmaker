import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

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
      <div className="fixed inset-0 bg-primary flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8 max-w-md w-full text-center animate-fade-in">
          <h2 className="text-2xl font-bold text-red-600 mb-4">{t("accessDenied")}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-primary flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center animate-fade-in">
        <h2 className="text-2xl font-bold mb-6">{t("ageVerification")}</h2>
        <p className="mb-8 text-lg">{t("ageQuestion")}</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => handleVerification(true)}
            className="px-8 py-3 bg-secondary text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            {t("yes")}
          </button>
          <button
            onClick={() => handleVerification(false)}
            className="px-8 py-3 bg-neutral-300 text-gray-700 rounded-lg hover:opacity-90 transition-opacity"
          >
            {t("no")}
          </button>
        </div>
      </div>
    </div>
  );
};