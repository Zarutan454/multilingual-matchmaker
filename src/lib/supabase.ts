import { createClient } from '@supabase/supabase-js';
import { toast } from "sonner";
import { Database } from '@/integrations/supabase/types';

class SupabaseClientSingleton {
  private static instance: ReturnType<typeof createClient<Database>> | null = null;
  private static isInitializing = false;
  private static lastConnectionCheck = 0;
  private static readonly CONNECTION_CHECK_INTERVAL = 60000; // 1 Minute
  private static readonly MAX_RETRIES = 3;
  private static readonly BASE_DELAY = 1000;

  public static getInstance(): ReturnType<typeof createClient<Database>> {
    if (this.instance) return this.instance;
    
    if (this.isInitializing) {
      console.warn('SupabaseClient wird bereits initialisiert');
      throw new Error('SupabaseClient wird bereits initialisiert');
    }

    this.isInitializing = true;

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase Anmeldedaten fehlen in der Umgebungskonfiguration');
      }

      this.instance = createClient<Database>(supabaseUrl, supabaseKey, {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true,
          storage: window.localStorage,
          storageKey: 'supabase.auth.token',
        },
        db: {
          schema: 'public'
        },
        global: {
          headers: { 'Cache-Control': 'max-age=300' },
        },
        // Verbesserte Fehlerbehandlung und Retry-Logik
        realtime: {
          params: {
            eventsPerSecond: 2
          }
        }
      });

      this.isInitializing = false;
      return this.instance;
    } catch (error) {
      this.isInitializing = false;
      console.error('Fehler bei der Initialisierung des Supabase Clients:', error);
      throw error;
    }
  }

  public static async checkConnection(): Promise<boolean> {
    const now = Date.now();
    if (now - this.lastConnectionCheck < this.CONNECTION_CHECK_INTERVAL) {
      return true;
    }

    try {
      const { data, error } = await this.getInstance()
        .from('profiles')
        .select('id')
        .limit(1);
        
      if (error) throw error;
      
      this.lastConnectionCheck = now;
      return true;
    } catch (error) {
      console.error('Verbindungstest fehlgeschlagen:', error);
      return false;
    }
  }

  public static async retryOperation<T>(
    operation: () => Promise<T>,
    retries = this.MAX_RETRIES
  ): Promise<T> {
    for (let i = 0; i < retries; i++) {
      try {
        return await operation();
      } catch (error) {
        if (i === retries - 1) throw error;
        
        const delay = this.BASE_DELAY * Math.pow(2, i) + Math.random() * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        
        console.warn(`Wiederholungsversuch ${i + 1} von ${retries}`);
      }
    }
    throw new Error('Maximale Anzahl an Versuchen erreicht');
  }
}

export const supabase = SupabaseClientSingleton.getInstance();