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

      {/* Split background images */}
      <div className="absolute inset-0 flex">
        {/* Left side - Male image */}
        <div className="w-1/2 h-full relative overflow-hidden">
          <div className="absolute inset-0 bg-black/60 transition-opacity duration-500"></div>
          <img 
            src="/lovable-uploads/4b743deb-ed0c-4dd6-bccf-c51804afc787.png"
            alt="Male escort"
            className="w-full h-full object-cover opacity-40 transition-opacity duration-500"
          />
        </div>
        {/* Right side - Female image */}
        <div className="w-1/2 h-full relative overflow-hidden">
          <div className="absolute inset-0 bg-black/60 transition-opacity duration-500"></div>
          <img 
            src="/lovable-uploads/a1eb5fec-42ce-4ce0-bd18-d7b20a0a1500.png"
            alt="Female escort"
            className="w-full h-full object-cover opacity-40 transition-opacity duration-500"
          />
        </div>
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