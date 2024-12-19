import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { X, Cookie, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Verzögere das Anzeigen des Banners um 1 Sekunde für bessere UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = (type: 'all' | 'essential') => {
    const consentData = {
      essential: true,
      analytics: type === 'all',
      marketing: type === 'all',
      timestamp: new Date().toISOString(),
    };
    
    localStorage.setItem('cookieConsent', JSON.stringify(consentData));
    setIsVisible(false);
    
    toast({
      title: type === 'all' ? "Alle Cookies akzeptiert" : "Nur essenzielle Cookies akzeptiert",
      description: "Ihre Präferenzen wurden gespeichert.",
      icon: <Cookie className="h-4 w-4" />
    });
  };

  const handleReject = () => {
    const consentData = {
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    
    localStorage.setItem('cookieConsent', JSON.stringify(consentData));
    setIsVisible(false);
    
    toast({
      title: "Cookies abgelehnt",
      description: "Es werden nur notwendige Cookies verwendet.",
      icon: <Shield className="h-4 w-4" />
    });
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 bg-black/90 text-white p-4 shadow-lg z-50 backdrop-blur-sm border-t border-[#9b87f5]/30"
        role="dialog"
        aria-labelledby="cookie-consent-title"
      >
        <div className="container mx-auto max-w-4xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <h2 id="cookie-consent-title" className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Cookie className="h-5 w-5" />
              Cookie-Einstellungen
            </h2>
            <p className="text-sm">
              Diese Website verwendet Cookies, um Ihre Erfahrung zu verbessern. 
              Weitere Informationen finden Sie in unserer{' '}
              <a 
                href="/privacy" 
                className="text-[#9b87f5] hover:text-[#7E69AB] underline focus:outline-none focus:ring-2 focus:ring-[#9b87f5] rounded"
                target="_blank"
                rel="noopener noreferrer"
              >
                Datenschutzerklärung
              </a>.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={handleReject}
              className="text-white border-white/20 hover:bg-white/10"
              aria-label="Alle Cookies ablehnen"
            >
              Alle ablehnen
            </Button>
            <Button
              variant="outline"
              onClick={() => handleAccept('essential')}
              className="text-white border-white/20 hover:bg-white/10"
              aria-label="Nur essenzielle Cookies akzeptieren"
            >
              Nur essenzielle
            </Button>
            <Button
              onClick={() => handleAccept('all')}
              className="bg-[#9b87f5] hover:bg-[#7E69AB]"
              aria-label="Alle Cookies akzeptieren"
            >
              Alle akzeptieren
            </Button>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 text-white/60 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#9b87f5] rounded"
            aria-label="Cookie-Banner schließen"
          >
            <X size={20} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};