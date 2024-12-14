import { Button } from "@/components/ui/button";
import { ChevronDown, Star, Heart, UserPlus } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-black to-gray-900">
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 text-white">
            POPP<span className="text-secondary">*</span>IN
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 italic">
            Exklusive Momente, unvergessliche Begegnungen
          </p>
        </div>

        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
          Die führende Plattform für erstklassige Begleitservices in Deutschland
        </p>
        
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
            const element = document.getElementById('features');
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