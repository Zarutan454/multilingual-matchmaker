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
        maxRetries?: number;
        timeoutSeconds?: number;
      };
    };
  };
  migrations: {
    table: string;
    updateDateOnPublish: boolean;
  };
}

export const databaseConfig: DatabaseConfig = {
  default: 'supabase',

  connections: {
    supabase: {
      driver: 'supabase',
      url: import.meta.env.VITE_SUPABASE_URL || '',
      key: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
      options: {
        schema: 'public',
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        maxRetries: 3,
        timeoutSeconds: 30,
      },
    },
  },

  migrations: {
    table: 'migrations',
    updateDateOnPublish: true,
  },
};

export const getConnection = () => {
  return databaseConfig.connections[databaseConfig.default];
};

export const getDatabaseUrl = () => {
  const connection = getConnection();
  if (!connection.url) {
    console.error('Datenbank-URL nicht konfiguriert');
    throw new Error('Database URL must be configured');
  }
  return connection.url;
};

export const getDatabaseKey = () => {
  const connection = getConnection();
  if (!connection.key) {
    console.error('Datenbank-Schlüssel nicht konfiguriert');
    throw new Error('Database key must be configured');
  }
  return connection.key;
};