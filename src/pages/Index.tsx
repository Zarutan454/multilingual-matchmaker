import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Index() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    if (user) {
      navigate(user.user_metadata?.user_type === 'provider' ? '/provider-dashboard' : '/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-black">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            POPP<span className="text-[#9b87f5]">*</span>IN
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t("welcomeMessage")}
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 mt-8">
          <Button
            onClick={() => navigate("/login")}
            className="w-full max-w-sm bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
          >
            {t("login")}
          </Button>
          <Button
            onClick={() => navigate("/register")}
            variant="outline"
            className="w-full max-w-sm border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5] hover:text-white"
          >
            {t("register")}
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-[#9b87f5]/30">
            <h3 className="text-xl font-semibold text-white mb-4">{t("security")}</h3>
            <p className="text-gray-300">{t("securityDescription")}</p>
          </div>
          <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-[#9b87f5]/30">
            <h3 className="text-xl font-semibold text-white mb-4">{t("privacy")}</h3>
            <p className="text-gray-300">{t("privacyDescription")}</p>
          </div>
          <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-[#9b87f5]/30">
            <h3 className="text-xl font-semibold text-white mb-4">{t("quality")}</h3>
            <p className="text-gray-300">{t("qualityDescription")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}