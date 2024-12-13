interface MailConfig {
  default: string;
  mailers: {
    sendgrid: {
      transport: 'sendgrid';
      apiKey: string | undefined;
    };
    mailgun: {
      transport: 'mailgun';
      domain: string | undefined;
      apiKey: string | undefined;
      region: string;
    };
    log: {
      transport: 'log';
      channel: string;
    };
  };
  from: {
    address: string;
    name: string;
  };
}

export const mailConfig: MailConfig = {
  // Standard-Mailer
  default: import.meta.env.VITE_MAIL_MAILER || 'log',

  // Verfügbare Mailer
  mailers: {
    // SendGrid Integration
    sendgrid: {
      transport: 'sendgrid',
      apiKey: import.meta.env.VITE_SENDGRID_API_KEY,
    },

    // Mailgun Integration
    mailgun: {
      transport: 'mailgun',
      domain: import.meta.env.VITE_MAILGUN_DOMAIN,
      apiKey: import.meta.env.VITE_MAILGUN_API_KEY,
      region: import.meta.env.VITE_MAILGUN_REGION || 'us',
    },

    // Log Mailer (für Entwicklung)
    log: {
      transport: 'log',
      channel: import.meta.env.VITE_MAIL_LOG_CHANNEL || 'mail',
    },
  },

  // Globale "Von"-Adresse
  from: {
    address: import.meta.env.VITE_MAIL_FROM_ADDRESS || 'noreply@example.com',
    name: import.meta.env.VITE_MAIL_FROM_NAME || 'Your App Name',
  },
};

// Helper-Funktionen
export const getDefaultMailer = () => {
  return mailConfig.mailers[mailConfig.default as keyof typeof mailConfig.mailers];
};

export const getMailer = (name: keyof typeof mailConfig.mailers) => {
  return mailConfig.mailers[name];
};

export const getFromAddress = () => {
  return mailConfig.from;
};