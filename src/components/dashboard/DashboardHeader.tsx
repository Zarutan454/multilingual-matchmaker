import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const DashboardHeader = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-white">{t("dashboard")}</h1>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => { navigate('/'); }}
        className="text-white border-[#9b87f5] hover:bg-[#9b87f5]/20 transition-colors bg-black/30"
      >
        <Home className="w-4 h-4 mr-2" />
        {t("backToHome")}
      </Button>
    </div>
  );
};