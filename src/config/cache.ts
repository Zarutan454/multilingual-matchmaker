interface CacheConfig {
  default: string;
  prefix: string;
  stores: {
    local: {
      driver: 'localStorage';
      prefix: string;
    };
    memory: {
      driver: 'memory';
      serialize: boolean;
    };
    session: {
      driver: 'sessionStorage';
      prefix: string;
    };
  };
}

export const cacheConfig: CacheConfig = {
  // Standard-Cache-Speicher
  default: import.meta.env.VITE_CACHE_STORE || 'local',

  // Cache-Schlüssel-Präfix zur Vermeidung von Kollisionen
  prefix: import.meta.env.VITE_CACHE_PREFIX || 'app_cache_',

  // Verfügbare Cache-Speicher
  stores: {
    // LocalStorage Cache
    local: {
      driver: 'localStorage',
      prefix: import.meta.env.VITE_CACHE_PREFIX || 'app_cache_',
    },

    // In-Memory Cache (für die aktuelle Session)
    memory: {
      driver: 'memory',
      serialize: false,
    },

    // SessionStorage Cache
    session: {
      driver: 'sessionStorage',
      prefix: import.meta.env.VITE_CACHE_PREFIX || 'app_cache_',
    },
  },
};

// Cache Helper Funktionen
export const getCacheKey = (key: string): string => {
  return `${cacheConfig.prefix}${key}`;
};

export const getCacheStore = (store: keyof typeof cacheConfig.stores = cacheConfig.default as keyof typeof cacheConfig.stores) => {
  return cacheConfig.stores[store];
};