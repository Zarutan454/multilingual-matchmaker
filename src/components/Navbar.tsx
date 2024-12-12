import { useLanguage } from "../contexts/LanguageContext";
import { languages, Language } from "../config/languages";
import { Menu } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const { currentLanguage, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <a href="/" className="text-white font-bold text-xl">
            JW
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="/" className="text-white hover:text-[#c69963] transition-colors">
              {t("home")}
            </a>
            <a href="/about" className="text-white hover:text-[#c69963] transition-colors">
              {t("about")}
            </a>
            <a href="/services" className="text-white hover:text-[#c69963] transition-colors">
              {t("services")}
            </a>
            <a href="/contact" className="text-white hover:text-[#c69963] transition-colors">
              {t("contact")}
            </a>
            <a href="/register" className="text-white hover:text-[#c69963] transition-colors">
              {t("register")}
            </a>
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

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#333]">
            <div className="flex flex-col space-y-4">
              <a href="/" className="text-white hover:text-[#c69963] transition-colors">
                {t("home")}
              </a>
              <a href="/about" className="text-white hover:text-[#c69963] transition-colors">
                {t("about")}
              </a>
              <a href="/services" className="text-white hover:text-[#c69963] transition-colors">
                {t("services")}
              </a>
              <a href="/contact" className="text-white hover:text-[#c69963] transition-colors">
                {t("contact")}
              </a>
              <a href="/register" className="text-white hover:text-[#c69963] transition-colors">
                {t("register")}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};