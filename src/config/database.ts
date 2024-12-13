interface DatabaseConfig {
  default: string;
  connections: {
    supabase: {
      driver: 'supabase';
      url: string;
      key: string;
      options?: {
        schema?: string;
        autoRefreshToken?: boolean;
        persistSession?: boolean;
        detectSessionInUrl?: boolean;
      };
    };
  };
  migrations: {
    table: string;
    updateDateOnPublish: boolean;
  };
}

export const databaseConfig: DatabaseConfig = {
  // Standard-Datenbankverbindung
  default: 'supabase',

  // Verfügbare Datenbankverbindungen
  connections: {
    // Supabase-Verbindung
    supabase: {
      driver: 'supabase',
      url: import.meta.env.VITE_SUPABASE_URL || '',
      key: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
      options: {
        schema: 'public',
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    },
  },

  // Migrations-Konfiguration
  migrations: {
    table: 'migrations',
    updateDateOnPublish: true,
  },
};

// Helper-Funktionen für die Datenbankverbindung
export const getConnection = () => {
  return databaseConfig.connections[databaseConfig.default];
};

export const getDatabaseUrl = () => {
  const connection = getConnection();
  return connection.url;
};

export const getDatabaseKey = () => {
  const connection = getConnection();
  return connection.key;
};