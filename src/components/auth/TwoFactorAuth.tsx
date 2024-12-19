import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export const TwoFactorAuth = () => {
  const [isEnabling2FA, setIsEnabling2FA] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const enable2FA = async () => {
    if (!user) return;
    
    setIsEnabling2FA(true);
    try {
      const { error } = await supabase.auth.mfa.enroll({
        factorType: 'totp'
      });

      if (error) throw error;

      setShowVerification(true);
      toast({
        title: "2FA aktiviert",
        description: "Bitte scannen Sie den QR-Code mit Ihrer Authenticator-App."
      });
    } catch (error) {
      console.error('2FA Aktivierungsfehler:', error);
      toast({
        title: "Fehler",
        description: "2FA konnte nicht aktiviert werden.",
        variant: "destructive"
      });
    } finally {
      setIsEnabling2FA(false);
    }
  };

  const verifyCode = async () => {
    if (!user || !verificationCode) return;

    setIsEnabling2FA(true);
    try {
      const { error } = await supabase.auth.mfa.verify({
        factorId: 'totp',
        code: verificationCode
      });

      if (error) throw error;

      toast({
        title: "Erfolgreich",
        description: "Zwei-Faktor-Authentifizierung wurde aktiviert."
      });
      setShowVerification(false);
    } catch (error) {
      console.error('Verifikationsfehler:', error);
      toast({
        title: "Fehler",
        description: "Der eingegebene Code ist ungültig.",
        variant: "destructive"
      });
    } finally {
      setIsEnabling2FA(false);
      setVerificationCode('');
    }
  };

  return (
    <div className="space-y-4 p-4 bg-black/50 rounded-lg border border-[#9b87f5]/30">
      <h3 className="text-lg font-semibold text-white">Zwei-Faktor-Authentifizierung</h3>
      
      {!showVerification ? (
        <Button
          onClick={enable2FA}
          disabled={isEnabling2FA}
          className="w-full bg-[#9b87f5] hover:bg-[#7E69AB]"
        >
          {isEnabling2FA ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Aktiviere 2FA...
            </>
          ) : (
            '2FA aktivieren'
          )}
        </Button>
      ) : (
        <div className="space-y-4">
          <Input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Verifizierungscode eingeben"
            className="bg-black/50 border-[#9b87f5]/30 text-white"
          />
          <Button
            onClick={verifyCode}
            disabled={isEnabling2FA || !verificationCode}
            className="w-full bg-[#9b87f5] hover:bg-[#7E69AB]"
          >
            {isEnabling2FA ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifiziere...
              </>
            ) : (
              'Code verifizieren'
            )}
          </Button>
        </div>
      )}
    </div>
  );
};