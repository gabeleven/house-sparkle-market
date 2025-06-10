
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
    [SubscriptionTier.FREE]: ['messages', 'profile', 'basic_calendar', 'basic_compliance', 'bookings_limited', 'settings'],
    [SubscriptionTier.STARTER]: ['messages', 'profile', 'synced_calendar', 'provider_dashboard', 'advanced_tax_compliance', 'bookings_unlimited', 'client_communications', 'settings'],
    [SubscriptionTier.PROFESSIONAL]: ['messages', 'profile', 'synced_calendar', 'provider_dashboard', 'advanced_tax_compliance', 'bookings_unlimited', 'client_communications', 'advanced_analytics', 'automated_invoicing', 'priority_support', 'settings'],
    [SubscriptionTier.PREMIUM]: ['messages', 'profile', 'synced_calendar', 'provider_dashboard', 'advanced_tax_compliance', 'bookings_unlimited', 'client_communications', 'advanced_analytics', 'automated_invoicing', 'priority_support', 'market_intelligence', 'api_access', 'dedicated_manager', 'white_label_reports', 'settings']
  };
  return features[plan as keyof typeof features]?.includes(feature) || false;
};

export const getMenuItems = (plan: string) => {
  const allItems = [
    { labelKey: 'Mon Profil', englishKey: 'My Profile', path: '/my-profile', showNotification: false, feature: 'profile', icon: 'User' },
    { labelKey: 'Calendrier de Base', englishKey: 'Basic Calendar', path: '/calendar-basic', showNotification: false, feature: 'basic_calendar', icon: 'Calendar' },
    { labelKey: 'Calendrier Synchronisé', englishKey: 'Synced Calendar', path: '/calendar', showNotification: false, feature: 'synced_calendar', icon: 'CalendarCheck' },
    { labelKey: 'Tableau Prestataire', englishKey: 'Provider Dashboard', path: '/provider-dashboard', showNotification: false, feature: 'provider_dashboard', icon: 'BarChart3' },
    { labelKey: 'Conformité de Base', englishKey: 'Basic Compliance', path: '/tax-compliance-basic', showNotification: false, feature: 'basic_compliance', icon: 'FileText' },
    { labelKey: 'Conformité Fiscale Avancée', englishKey: 'Advanced Tax Compliance', path: '/tax-compliance', showNotification: false, feature: 'advanced_tax_compliance', icon: 'Shield' },
    { labelKey: 'Mes Réservations', englishKey: 'My Bookings', path: '/bookings', showNotification: false, feature: 'bookings_limited', icon: 'BookOpen', tierNote: '(jusqu\'à 10/mois)' },
    { labelKey: 'Mes Réservations', englishKey: 'My Bookings', path: '/bookings', showNotification: false, feature: 'bookings_unlimited', icon: 'BookOpen', tierNote: '(illimitées)' },
    { labelKey: 'Communications Client', englishKey: 'Client Communications', path: '/chat', showNotification: true, feature: 'client_communications', icon: 'MessageSquare' },
    { labelKey: 'Analytiques Avancées', englishKey: 'Advanced Analytics', path: '/analytics', showNotification: false, feature: 'advanced_analytics', icon: 'TrendingUp' },
    { labelKey: 'Intelligence Marché', englishKey: 'Market Intelligence', path: '/market-intelligence', showNotification: false, feature: 'market_intelligence', icon: 'Brain' },
    { labelKey: 'Paramètres', englishKey: 'Settings', path: '/settings', showNotification: false, feature: 'settings', icon: 'Settings' },
  ];

  return allItems.filter(item => hasFeature(plan, item.feature));
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
