import { createClient } from '@supabase/supabase-js';
import { toast } from "sonner";

const supabaseUrl = 'https://qtogyltwimvdecsomwde.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0b2d5bHR3aW12ZGVjc29td2RlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwNzc4MDQsImV4cCI6MjA0OTY1MzgwNH0.hCNdmL4U8wt3xFkeRaS7hjz4VkNrvKtj6SKor8ArZv4';

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase Konfigurationsfehler: URL oder Key fehlt');
  toast.error('Datenbankverbindung konnte nicht hergestellt werden');
  throw new Error('Supabase URL und API Key müssen konfiguriert sein');
}

// Erstelle eine einzige Client-Instanz mit verbesserter Konfiguration
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
    }
  },
  db: {
    schema: 'public'
  },
  realtime: {
    params: {
      eventsPerSecond: 2
    }
  }
});

// Verbesserte Verbindungsprüfung
export const checkConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);

    if (error) {
      console.error('Verbindungsfehler:', error);
      toast.error('Verbindung zur Datenbank fehlgeschlagen: ' + error.message);
      return false;
    }

    console.log('Datenbankverbindung erfolgreich getestet');
    return true;
  } catch (error) {
    console.error('Verbindungstest fehlgeschlagen:', error);
    toast.error('Keine Verbindung zur Datenbank möglich');
    return false;
  }
};

// Initialisiere die Verbindung sofort
if (typeof window !== 'undefined') {
  checkConnection().then(isConnected => {
    if (isConnected) {
      toast.success('Verbindung zur Datenbank hergestellt');
    }
  });
}