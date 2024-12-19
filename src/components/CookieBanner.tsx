import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Check, X } from 'lucide-react';

export const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const hasAcceptedCookies = localStorage.getItem('cookiesAccepted');
    if (!hasAcceptedCookies) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowBanner(false);
    toast.success('Cookies accepted', {
      description: 'Your preferences have been saved',
      action: {
        label: 'Undo',
        onClick: () => handleReject()
      }
    });
  };

  const handleReject = () => {
    localStorage.removeItem('cookiesAccepted');
    setShowBanner(false);
    toast.error('Cookies rejected', {
      description: 'Your preferences have been saved',
      action: {
        label: 'Undo',
        onClick: () => handleAccept()
      }
    });
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 md:p-6 z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground text-center md:text-left">
          We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
        </p>
        <div className="flex gap-2">
          <Button onClick={handleAccept} size="sm">
            Accept
          </Button>
          <Button onClick={handleReject} variant="outline" size="sm">
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
};