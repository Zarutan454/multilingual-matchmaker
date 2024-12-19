import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export const SecurityMonitor = () => {
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const checkLoginActivity = async () => {
      try {
        const { data: sessions, error } = await supabase.auth.getSession();
        
        if (error) throw error;

        // Prüfe auf mehrere aktive Sitzungen
        if (sessions && sessions.session) {
          const { data: allSessions, error: sessionsError } = await supabase
            .from('auth_sessions')
            .select('*')
            .eq('user_id', user.id);

          if (sessionsError) throw sessionsError;

          if (allSessions && allSessions.length > 1) {
            toast({
              title: "Sicherheitswarnung",
              description: "Mehrere aktive Sitzungen erkannt. Bitte überprüfen Sie Ihre Kontoaktivitäten.",
              variant: "destructive",
              duration: 10000,
            });
          }
        }
      } catch (error) {
        console.error('Sicherheitsüberwachungsfehler:', error);
      }
    };

    // Initialer Check
    checkLoginActivity();

    // Überwache Authentifizierungsänderungen
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        checkLoginActivity();
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [user, toast]);

  return null; // Keine UI-Komponente notwendig, da nur Überwachung
};