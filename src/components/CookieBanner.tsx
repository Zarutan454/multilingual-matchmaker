import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { X } from 'lucide-react';

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
    toast({
      title: "Cookies akzeptiert",
      description: "Ihre Präferenzen wurden gespeichert."
    });
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
    toast({
      title: "Cookies abgelehnt",
      description: "Es werden nur notwendige Cookies verwendet."
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 text-white p-4 shadow-lg z-50 backdrop-blur-sm border-t border-[#9b87f5]/30">
      <div className="container mx-auto max-w-4xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm">
            Diese Website verwendet Cookies, um Ihre Erfahrung zu verbessern. 
            Weitere Informationen finden Sie in unserer{' '}
            <a href="/privacy" className="text-[#9b87f5] hover:text-[#7E69AB] underline">
              Datenschutzerklärung
            </a>.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleDecline}
            className="text-white border-white/20 hover:bg-white/10"
          >
            Ablehnen
          </Button>
          <Button
            onClick={handleAccept}
            className="bg-[#9b87f5] hover:bg-[#7E69AB]"
          >
            Akzeptieren
          </Button>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-white/60 hover:text-white"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};