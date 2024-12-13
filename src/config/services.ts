interface ServicesConfig {
  postmark: {
    token: string | undefined;
  };
  ses: {
    key: string | undefined;
    secret: string | undefined;
    region: string;
  };
  resend: {
    key: string | undefined;
  };
  slack: {
    notifications: {
      botUserOauthToken: string | undefined;
      channel: string | undefined;
    };
  };
}

export const servicesConfig: ServicesConfig = {
  // Postmark E-Mail Service
  postmark: {
    token: import.meta.env.VITE_POSTMARK_TOKEN,
  },

  // Amazon SES (Simple Email Service)
  ses: {
    key: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secret: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    region: import.meta.env.VITE_AWS_DEFAULT_REGION || 'us-east-1',
  },

  // Resend E-Mail Service
  resend: {
    key: import.meta.env.VITE_RESEND_KEY,
  },

  // Slack Integration
  slack: {
    notifications: {
      botUserOauthToken: import.meta.env.VITE_SLACK_BOT_USER_OAUTH_TOKEN,
      channel: import.meta.env.VITE_SLACK_BOT_USER_DEFAULT_CHANNEL,
    },
  },
};

// Helper-Funktionen
export const getPostmarkConfig = () => {
  return servicesConfig.postmark;
};

export const getSesConfig = () => {
  return servicesConfig.ses;
};

export const getResendConfig = () => {
  return servicesConfig.resend;
};

export const getSlackConfig = () => {
  return servicesConfig.slack;
};