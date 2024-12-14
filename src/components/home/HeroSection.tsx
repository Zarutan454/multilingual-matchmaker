import { Button } from "@/components/ui/button";
import { ChevronDown, Heart, UserPlus } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen">
      {/* Background with gradient */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-br from-[#D946EF] via-[#1A1F2C] to-[#221F26] animate-gradient-xy">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#ea384c]/30 via-transparent to-transparent animate-pulse"></div>
      </div>

      {/* Split background with images */}
      <div className="absolute inset-0 flex">
        {/* Left side - Male image */}
        <div className="relative w-1/2 h-full overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60"></div>
          <img 
            src="/lovable-uploads/d6eff054-978b-4d36-bf3d-8aa1cb81d205.png"
            alt="Male escort"
            className="h-[90%] object-contain z-10 opacity-75 transform scale-110 transition-all duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/40 to-black/80"></div>
        </div>

        {/* Right side - Female image */}
        <div className="relative w-1/2 h-full overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-black opacity-60"></div>
          <img 
            src="/lovable-uploads/b5b39dd2-35f6-40ce-b15d-891a8a5482bd.png"
            alt="Female escort"
            className="h-[90%] object-contain z-10 opacity-75 transform scale-110 transition-all duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/40 to-black/80"></div>
        </div>

        {/* Subtle center blend */}
        <div className="absolute inset-y-0 left-1/2 w-[2px] bg-gradient-to-b from-transparent via-white/5 to-transparent transform -translate-x-1/2 blur-lg"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center px-4 max-w-5xl mx-auto">
          <div className="mb-8 animate-fade-in">
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
    </div>
  );
};
