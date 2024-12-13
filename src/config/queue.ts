interface QueueConfig {
  default: string;
  connections: {
    sync: {
      driver: 'sync';
    };
    database: {
      driver: 'database';
      connection: string | undefined;
      table: string;
      queue: string;
      retryAfter: number;
      afterCommit: boolean;
    };
  };
  batching: {
    database: string;
    table: string;
  };
  failed: {
    driver: string;
    database: string;
    table: string;
  };
}

export const queueConfig: QueueConfig = {
  // Standard-Queue-Verbindung
  default: import.meta.env.VITE_QUEUE_CONNECTION || 'database',

  // Verfügbare Queue-Verbindungen
  connections: {
    // Synchrone Verarbeitung (für Entwicklung)
    sync: {
      driver: 'sync',
    },

    // Datenbank-Queue (Supabase)
    database: {
      driver: 'database',
      connection: import.meta.env.VITE_DB_QUEUE_CONNECTION,
      table: import.meta.env.VITE_DB_QUEUE_TABLE || 'jobs',
      queue: import.meta.env.VITE_DB_QUEUE || 'default',
      retryAfter: parseInt(import.meta.env.VITE_DB_QUEUE_RETRY_AFTER || '90'),
      afterCommit: false,
    },
  },

  // Job Batching Konfiguration
  batching: {
    database: import.meta.env.VITE_DB_CONNECTION || 'default',
    table: 'job_batches',
  },

  // Fehlgeschlagene Jobs
  failed: {
    driver: import.meta.env.VITE_QUEUE_FAILED_DRIVER || 'database-uuids',
    database: import.meta.env.VITE_DB_CONNECTION || 'default',
    table: 'failed_jobs',
  },
};

// Helper-Funktionen
export const getDefaultConnection = () => {
  return queueConfig.connections[queueConfig.default as keyof typeof queueConfig.connections];
};

export const getConnection = (name: keyof typeof queueConfig.connections) => {
  return queueConfig.connections[name];
};

export const getBatchingConfig = () => {
  return queueConfig.batching;
};

export const getFailedConfig = () => {
  return queueConfig.failed;
};