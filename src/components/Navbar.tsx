import { useLanguage } from "../contexts/LanguageContext";
import { languages, Language } from "../config/languages";

export const Navbar = () => {
  const { currentLanguage, setLanguage, t } = useLanguage();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <a href="/" className="text-primary font-bold text-xl">
              Logo
            </a>
            <div className="hidden md:flex space-x-4">
              <a href="/" className="text-gray-700 hover:text-primary transition-colors">
                {t("home")}
              </a>
              <a href="/about" className="text-gray-700 hover:text-primary transition-colors">
                {t("about")}
              </a>
              <a href="/services" className="text-gray-700 hover:text-primary transition-colors">
                {t("services")}
              </a>
              <a href="/contact" className="text-gray-700 hover:text-primary transition-colors">
                {t("contact")}
              </a>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={currentLanguage}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-white border border-gray-300 rounded-md px-2 py-1"
            >
              {Object.entries(languages).map(([code, lang]) => (
                <option key={code} value={code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};