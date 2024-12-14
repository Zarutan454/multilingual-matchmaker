import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="relative h-[80vh] flex items-center justify-center bg-gradient-to-r from-black to-gray-900">
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
          PREMIUM BEGLEITSERVICE 24/7
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Exklusive Begleitung für anspruchsvolle Momente
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          {!user ? (
            <>
              <Button 
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto bg-secondary hover:bg-secondary/90"
                onClick={() => navigate("/login")}
              >
                {t("login")}
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-white text-white hover:bg-white/10"
                onClick={() => navigate("/register")}
              >
                {t("register")}
              </Button>
            </>
          ) : (
            <Button 
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto bg-secondary hover:bg-secondary/90"
              onClick={() => navigate("/profile")}
            >
              {t("profile")}
            </Button>
          )}
        </div>

        <Button 
          variant="ghost"
          size="lg"
          className="text-white hover:bg-white/10"
          onClick={() => {
            const element = document.getElementById('featured');
            element?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <ChevronDown className="mr-2" />
          Entdecken Sie mehr
        </Button>
      </div>
    </div>
  );
};