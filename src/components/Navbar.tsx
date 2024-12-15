import { useLanguage } from "../contexts/LanguageContext";
import { languages, Language } from "../config/languages";
import { Menu, User, LogOut, Home, Heart, MessageSquare, Grid } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const Navbar = () => {
  const { currentLanguage, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success(t("logoutSuccess"));
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(t("logoutError"));
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-start">
              <a href="/" className="text-white font-bold text-xl">
                POPP<span className="text-secondary">*</span>IN
              </a>
              <span className="text-secondary text-sm italic font-light">
                Escort Made in Germany
              </span>
            </div>
          </div>

          <div className="hidden md:flex space-x-8">
            <a href="/" className="text-white hover:text-[#c69963] transition-colors flex items-center gap-2">
              <Home size={18} />
              {t("home")}
            </a>
            <a href="/models" className="text-white hover:text-[#c69963] transition-colors flex items-center gap-2">
              <Heart size={18} />
              Models
            </a>
            <a href="/categories" className="text-white hover:text-[#c69963] transition-colors flex items-center gap-2">
              <Grid size={18} />
              {t("categories")}
            </a>
            <a href="/contact" className="text-white hover:text-[#c69963] transition-colors flex items-center gap-2">
              <MessageSquare size={18} />
              {t("contact")}
            </a>
            {user ? (
              <>
                <a href="/profile" className="text-white hover:text-[#c69963] transition-colors flex items-center gap-2">
                  <User size={18} />
                  {t("profile")}
                </a>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-[#c69963] transition-colors flex items-center gap-2"
                >
                  <LogOut size={18} />
                  {t("logout")}
                </button>
              </>
            ) : (
              <a href="/register" className="text-white hover:text-[#c69963] transition-colors">
                {t("register")}
              </a>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={currentLanguage}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent text-white border border-[#333] rounded-none px-2 py-1"
            >
              {Object.entries(languages).map(([code, lang]) => (
                <option key={code} value={code} className="bg-black">
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>

            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#333]">
            <div className="flex flex-col space-y-4">
              <a href="/" className="text-white hover:text-[#c69963] transition-colors flex items-center gap-2">
                <Home size={18} />
                {t("home")}
              </a>
              <a href="/models" className="text-white hover:text-[#c69963] transition-colors flex items-center gap-2">
                <Heart size={18} />
                Models
              </a>
              <a href="/categories" className="text-white hover:text-[#c69963] transition-colors flex items-center gap-2">
                <Grid size={18} />
                {t("categories")}
              </a>
              <a href="/contact" className="text-white hover:text-[#c69963] transition-colors flex items-center gap-2">
                <MessageSquare size={18} />
                {t("contact")}
              </a>
              {user ? (
                <>
                  <a href="/profile" className="text-white hover:text-[#c69963] transition-colors flex items-center gap-2">
                    <User size={18} />
                    {t("profile")}
                  </a>
                  <button
                    onClick={handleLogout}
                    className="text-white hover:text-[#c69963] transition-colors flex items-center gap-2"
                  >
                    <LogOut size={18} />
                    {t("logout")}
                  </button>
                </>
              ) : (
                <a href="/register" className="text-white hover:text-[#c69963] transition-colors">
                  {t("register")}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
