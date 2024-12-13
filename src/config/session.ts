interface SessionConfig {
  driver: string;
  lifetime: number;
  expireOnClose: boolean;
  encrypt: boolean;
  connection: string | undefined;
  table: string;
  store: string | undefined;
  cookie: {
    name: string;
    path: string;
    domain: string | undefined;
    secure: boolean;
    httpOnly: boolean;
    sameSite: 'lax' | 'strict' | 'none' | null;
    partitioned: boolean;
  };
}

export const sessionConfig: SessionConfig = {
  // Standard-Session-Treiber
  driver: import.meta.env.VITE_SESSION_DRIVER || 'database',

  // Session-Lebensdauer in Minuten
  lifetime: parseInt(import.meta.env.VITE_SESSION_LIFETIME || '120'),

  // Session beim Schließen des Browsers beenden
  expireOnClose: import.meta.env.VITE_SESSION_EXPIRE_ON_CLOSE === 'true',

  // Session-Verschlüsselung
  encrypt: import.meta.env.VITE_SESSION_ENCRYPT === 'true',

  // Datenbankverbindung für Sessions
  connection: import.meta.env.VITE_SESSION_CONNECTION,

  // Datenbanktabelle für Sessions
  table: import.meta.env.VITE_SESSION_TABLE || 'sessions',

  // Cache-Store für Sessions
  store: import.meta.env.VITE_SESSION_STORE,

  // Cookie-Konfiguration
  cookie: {
    name: import.meta.env.VITE_SESSION_COOKIE || 'app_session',
    path: import.meta.env.VITE_SESSION_PATH || '/',
    domain: import.meta.env.VITE_SESSION_DOMAIN,
    secure: import.meta.env.VITE_SESSION_SECURE_COOKIE === 'true',
    httpOnly: import.meta.env.VITE_SESSION_HTTP_ONLY === 'true',
    sameSite: (import.meta.env.VITE_SESSION_SAME_SITE || 'lax') as 'lax' | 'strict' | 'none' | null,
    partitioned: import.meta.env.VITE_SESSION_PARTITIONED_COOKIE === 'true',
  },
};

// Helper-Funktionen
export const getSessionDriver = () => {
  return sessionConfig.driver;
};

export const getSessionLifetime = () => {
  return sessionConfig.lifetime;
};

export const getSessionCookie = () => {
  return sessionConfig.cookie;
};

export const getSessionConnection = () => {
  return sessionConfig.connection;
};

export const getSessionTable = () => {
  return sessionConfig.table;
};