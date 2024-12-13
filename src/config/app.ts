interface AppConfig {
  name: string;
  env: string;
  debug: boolean;
  url: string;
  timezone: string;
  locale: string;
  fallbackLocale: string;
  fakerLocale: string;
}

export const appConfig: AppConfig = {
  name: import.meta.env.VITE_APP_NAME || 'Your App Name',
  env: import.meta.env.VITE_APP_ENV || 'production',
  debug: import.meta.env.VITE_APP_DEBUG === 'true',
  url: import.meta.env.VITE_APP_URL || 'http://localhost:8080',
  timezone: import.meta.env.VITE_APP_TIMEZONE || 'UTC',
  locale: import.meta.env.VITE_APP_LOCALE || 'en',
  fallbackLocale: import.meta.env.VITE_APP_FALLBACK_LOCALE || 'en',
  fakerLocale: import.meta.env.VITE_APP_FAKER_LOCALE || 'en_US',
};