import { useLanguage } from "../../contexts/LanguageContext";
import { Link } from "react-router-dom";

export const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-black py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t("information")}</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/about" className="hover:text-secondary">{t("about")}</Link></li>
              <li><Link to="/services" className="hover:text-secondary">{t("services")}</Link></li>
              <li><Link to="/booking" className="hover:text-secondary">{t("booking")}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t("cities")}</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/berlin" className="hover:text-secondary">Berlin</Link></li>
              <li><Link to="/muenchen" className="hover:text-secondary">München</Link></li>
              <li><Link to="/hamburg" className="hover:text-secondary">Hamburg</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t("legal")}</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/privacy" className="hover:text-secondary">{t("privacy")}</Link></li>
              <li><Link to="/terms" className="hover:text-secondary">{t("terms")}</Link></li>
              <li><Link to="/imprint" className="hover:text-secondary">{t("imprint")}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t("contact")}</h3>
            <ul className="space-y-2 text-gray-400">
              <li>{t("email")}: info@example.com</li>
              <li>{t("phone")}: [+49 XXX XXXXXXX]</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Popp*in. {t("allRightsReserved")}</p>
        </div>
      </div>
    </footer>
  );
};