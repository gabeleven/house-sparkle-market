
export enum SubscriptionTier {
  FREE = 'free',
  STARTER = 'starter', 
  PROFESSIONAL = 'professional',
  PREMIUM = 'premium'
}

export type SubscriptionPlan = keyof typeof SubscriptionTier;

export const isFree = (plan: string) => plan === SubscriptionTier.FREE;
export const isStarter = (plan: string) => plan === SubscriptionTier.STARTER;
export const isProfessional = (plan: string) => plan === SubscriptionTier.PROFESSIONAL;
export const isPremium = (plan: string) => plan === SubscriptionTier.PREMIUM;

// Helper to check if user has at least starter tier
export const hasStarterOrHigher = (plan: string) => {
  return plan === SubscriptionTier.STARTER || 
         plan === SubscriptionTier.PROFESSIONAL || 
         plan === SubscriptionTier.PREMIUM;
};

export const hasFeature = (plan: string, feature: string) => {
  const features = {
    [SubscriptionTier.FREE]: ['messages', 'profile', 'income_tracking', 'tax_summary'],
    [SubscriptionTier.STARTER]: ['messages', 'profile', 'income_tracking', 'tax_summary', 'calendar', 'enhanced_tax_tracking', 'unlimited_bookings', 'verified_badge'],
    [SubscriptionTier.PROFESSIONAL]: ['messages', 'profile', 'income_tracking', 'tax_summary', 'calendar', 'enhanced_tax_tracking', 'unlimited_bookings', 'verified_badge', 'bookmarks', 'earnings', 'position', 'advanced_tax_suite', 'analytics_dashboard', 'automated_invoicing'],
    [SubscriptionTier.PREMIUM]: ['messages', 'profile', 'income_tracking', 'tax_summary', 'calendar', 'enhanced_tax_tracking', 'unlimited_bookings', 'verified_badge', 'bookmarks', 'earnings', 'position', 'advanced_tax_suite', 'analytics_dashboard', 'automated_invoicing', 'dashboard', 'market_intelligence', 'growth_acceleration', 'api_access']
  };
  return features[plan as keyof typeof features]?.includes(feature) || false;
};

export const getMenuItems = (plan: string) => {
  const baseItems = [
    { labelKey: 'nav.messages', path: '/chat', showNotification: true, feature: 'messages' },
    { labelKey: 'nav.profile', path: '/my-profile', showNotification: false, feature: 'profile' },
  ];

  const tierItems = [
    { labelKey: 'nav.calendar', path: '/calendar', showNotification: false, feature: 'calendar' },
    { labelKey: 'nav.bookmarks', path: '/bookmarks', showNotification: false, feature: 'bookmarks' },
    { labelKey: 'nav.earnings', path: '/earnings', showNotification: false, feature: 'earnings' },
    { labelKey: 'nav.position', path: '/position', showNotification: false, feature: 'position' },
    { labelKey: 'nav.dashboard', path: '/dashboard', showNotification: false, feature: 'dashboard' },
  ];

  return [
    ...baseItems,
    ...tierItems.filter(item => hasFeature(plan, item.feature))
  ];
};

// New tier definitions with tax-focused messaging
export const getTierInfo = (tier: SubscriptionTier) => {
  const tierConfig = {
    [SubscriptionTier.FREE]: {
      name: 'CRA Ready',
      price: 0,
      currency: 'CAD',
      period: 'month',
      tagline: 'Essential tax compliance for new cleaners',
      description: 'Stay legally compliant with Canada\'s new 2025 tax reporting requirements',
      savings: null,
      features: [
        'Basic Income Tracking (legally required for CRA reporting)',
        'Annual Tax Summary (copy of what\'s reported to CRA)',
        'Simple Profile & Listings (up to 3 services)',
        'Basic Booking Management (up to 10 bookings/month)',
        'CRA Compliance Guarantee'
      ],
      limitations: [
        'No advanced features, analytics, or business tools',
        'Limited to 3 service types',
        'Maximum 10 bookings per month'
      ]
    },
    [SubscriptionTier.STARTER]: {
      name: 'Tax Basics',
      price: 12,
      currency: 'CAD',
      period: 'month',
      tagline: 'Professional tax tracking without the complexity',
      description: 'Everything you need for tax compliance plus professional features',
      savings: 'Saves $500+ annually vs basic accounting services',
      features: [
        'Everything in Free PLUS:',
        '📊 Enhanced Tax Tracking: Monthly income reports, basic expense categorization',
        '📅 Business Management Bundle: Calendar sync, unlimited bookings, customer communications',
        '🏷️ Professional Features: Verified badge, priority in search results',
        '💼 Advanced Profile: Unlimited service types, professional showcase'
      ]
    },
    [SubscriptionTier.PROFESSIONAL]: {
      name: 'Tax Professional',
      price: 25,
      currency: 'CAD',
      period: 'month',
      tagline: 'Complete tax mastery + business optimization',
      description: 'Advanced tax features that turn compliance into competitive advantage',
      savings: 'Saves $2,000+ annually vs professional accounting services',
      features: [
        'Everything in Starter PLUS:',
        '🧾 Advanced Tax Suite: Quarterly reports, GST/QST calculations, mileage tracking, expense optimization',
        '📈 Basic Analytics Dashboard: Earnings trends, customer insights, performance tracking',
        '🛡️ Business Tools: Automated invoicing, payment reminders, customer review management',
        '🎯 Growth Features: Premium placement, featured listings, business insights'
      ]
    },
    [SubscriptionTier.PREMIUM]: {
      name: 'Business Intelligence',
      price: 39,
      currency: 'CAD',
      period: 'month',
      tagline: 'Market domination through data insights',
      description: 'Complete business intelligence suite for market leaders',
      savings: 'Complete business optimization - priceless competitive advantage',
      features: [
        'Everything in Professional PLUS:',
        '🧠 Market Intelligence Suite: Neighborhood demand analysis, competitive pricing insights, seasonal predictions',
        '📊 Advanced Analytics: ROI tracking, customer lifetime value, service optimization recommendations',
        '🎯 Growth Acceleration: Automated marketing campaigns, referral program management, premium support',
        '🏆 Enterprise Features: White-label reports for accountants, API access, dedicated account manager'
      ]
    }
  };

  return tierConfig[tier];
};
