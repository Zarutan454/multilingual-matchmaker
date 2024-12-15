import { Button } from "@/components/ui/button";
import { Heart, UserPlus, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

export const HeroActions = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const scrollToFeatures = () => {
    const element = document.getElementById('features');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
        {!user ? (
          <>
            <Button 
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 group"
              onClick={() => navigate("/register")}
            >
              <UserPlus className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              {t("register")}
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-white text-white hover:bg-white/10 group"
              onClick={() => navigate("/login")}
            >
              <Heart className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              {t("login")}
            </Button>
          </>
        ) : (
          <Button 
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto bg-secondary hover:bg-secondary/90"
            onClick={() => navigate("/dashboard")}
          >
            {t("profile")}
          </Button>
        )}
      </div>

      <Button 
        variant="ghost"
        size="lg"
        className="text-white hover:bg-white/10"
        onClick={scrollToFeatures}
      >
        <ChevronDown className="mr-2" />
        Entdecken Sie mehr
      </Button>
    </>
  );
};