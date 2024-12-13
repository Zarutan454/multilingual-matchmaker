interface SubscriptionLevel {
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: {
    basic_profile?: boolean;
    enhanced_profile?: boolean;
    premium_profile?: boolean;
    vip_profile?: boolean;
    photo_uploads?: number | 'unlimited';
    video_uploads?: number | 'unlimited';
    contact_requests?: number | 'unlimited';
    visibility?: 'normal' | 'enhanced' | 'premium' | 'vip';
    priority_support?: boolean;
    featured_listing?: boolean;
    analytics_access?: boolean;
    dedicated_manager?: boolean;
    advertising_credits?: boolean;
  };
  trial_days: number;
}

interface PaymentMethod {
  enabled: boolean;
  providers?: string[];
  coming_soon?: boolean;
}

interface ReferralConfig {
  enabled: boolean;
  commission: {
    [key: string]: number;
  };
  payout_minimum: number;
  payout_methods: string[];
}

interface SubscriptionsConfig {
  levels: {
    [key: string]: SubscriptionLevel;
  };
  payment_methods: {
    [key: string]: PaymentMethod;
  };
  referral: ReferralConfig;
}

export const subscriptionsConfig: SubscriptionsConfig = {
  levels: {
    bronze: {
      name: 'Bronze',
      price: {
        monthly: 29.99,
        yearly: 299.99,
      },
      features: {
        basic_profile: true,
        photo_uploads: 5,
        contact_requests: 50,
        visibility: 'normal',
      },
      trial_days: 7,
    },
    silver: {
      name: 'Silver',
      price: {
        monthly: 49.99,
        yearly: 499.99,
      },
      features: {
        basic_profile: true,
        enhanced_profile: true,
        photo_uploads: 15,
        video_uploads: 2,
        contact_requests: 150,
        visibility: 'enhanced',
        priority_support: true,
      },
      trial_days: 14,
    },
    gold: {
      name: 'Gold',
      price: {
        monthly: 99.99,
        yearly: 999.99,
      },
      features: {
        basic_profile: true,
        enhanced_profile: true,
        premium_profile: true,
        photo_uploads: 30,
        video_uploads: 5,
        contact_requests: 'unlimited',
        visibility: 'premium',
        priority_support: true,
        featured_listing: true,
        analytics_access: true,
      },
      trial_days: 60,
    },
    vip: {
      name: 'VIP',
      price: {
        monthly: 199.99,
        yearly: 1999.99,
      },
      features: {
        basic_profile: true,
        enhanced_profile: true,
        premium_profile: true,
        vip_profile: true,
        photo_uploads: 'unlimited',
        video_uploads: 'unlimited',
        contact_requests: 'unlimited',
        visibility: 'vip',
        priority_support: true,
        featured_listing: true,
        analytics_access: true,
        dedicated_manager: true,
        advertising_credits: true,
      },
      trial_days: 30,
    },
  },
  
  payment_methods: {
    credit_card: {
      enabled: true,
      providers: ['stripe', 'paypal'],
    },
    paypal: {
      enabled: true,
    },
    crypto: {
      enabled: false,
      coming_soon: true,
    },
    google_pay: {
      enabled: false,
      coming_soon: true,
    },
  },

  referral: {
    enabled: true,
    commission: {
      bronze: 5,
      silver: 7,
      gold: 10,
      vip: 15,
    },
    payout_minimum: 50,
    payout_methods: ['bank_transfer', 'paypal'],
  },
};

// Helper functions
export const getSubscriptionLevels = () => {
  return subscriptionsConfig.levels;
};

export const getSubscriptionLevel = (level: string) => {
  return subscriptionsConfig.levels[level];
};

export const getPaymentMethods = () => {
  return subscriptionsConfig.payment_methods;
};

export const getReferralConfig = () => {
  return subscriptionsConfig.referral;
};