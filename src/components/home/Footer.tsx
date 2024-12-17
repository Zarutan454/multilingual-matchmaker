import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";

export const Footer = () => {
  const { t, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <footer className="bg-black/80 backdrop-blur-sm text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">POPP*IN</h3>
            <p className="text-sm text-gray-400">
              Escort Made in Germany
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  AGB
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Datenschutz
                </a>
              </li>
              <li>
                <a href="/imprint" className="text-gray-400 hover:text-white transition-colors">
                  Impressum
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">support@poppin.de</li>
              <li className="text-gray-400">+49 123 456 789</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Sprache</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setLanguage('de')}
                className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                DE
              </button>
              <button
                onClick={() => setLanguage('en')}
                className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                EN
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} POPP*IN. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
};