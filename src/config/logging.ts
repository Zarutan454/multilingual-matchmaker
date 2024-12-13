interface LoggingConfig {
  default: string;
  deprecations: {
    channel: string;
    trace: boolean;
  };
  channels: {
    console: {
      driver: 'console';
      level: string;
    };
    sentry: {
      driver: 'sentry';
      dsn: string | undefined;
      level: string;
    };
    null: {
      driver: 'null';
    };
  };
}

export const loggingConfig: LoggingConfig = {
  // Standard-Logging-Kanal
  default: import.meta.env.VITE_LOG_CHANNEL || 'console',

  // Veraltete Funktionen Logging
  deprecations: {
    channel: import.meta.env.VITE_LOG_DEPRECATIONS_CHANNEL || 'null',
    trace: import.meta.env.VITE_LOG_DEPRECATIONS_TRACE === 'true',
  },

  // Verfügbare Logging-Kanäle
  channels: {
    // Console Logger (Browser DevTools)
    console: {
      driver: 'console',
      level: import.meta.env.VITE_LOG_LEVEL || 'debug',
    },

    // Sentry Integration
    sentry: {
      driver: 'sentry',
      dsn: import.meta.env.VITE_SENTRY_DSN,
      level: import.meta.env.VITE_LOG_LEVEL || 'error',
    },

    // Null Logger (keine Ausgabe)
    null: {
      driver: 'null',
    },
  },
};

// Helper-Funktionen
export const getDefaultChannel = () => {
  return loggingConfig.channels[loggingConfig.default as keyof typeof loggingConfig.channels];
};

export const getChannel = (name: keyof typeof loggingConfig.channels) => {
  return loggingConfig.channels[name];
};

export const log = (
  level: 'debug' | 'info' | 'warning' | 'error',
  message: string,
  context: Record<string, any> = {}
) => {
  const channel = getDefaultChannel();
  
  if (channel.driver === 'console') {
    switch (level) {
      case 'debug':
        console.debug(message, context);
        break;
      case 'info':
        console.info(message, context);
        break;
      case 'warning':
        console.warn(message, context);
        break;
      case 'error':
        console.error(message, context);
        break;
    }
  }
  
  // Hier können weitere Channel-Implementierungen hinzugefügt werden
};