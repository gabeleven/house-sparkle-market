
export type SubscriptionTier = 'FREE' | 'STARTER' | 'PRO' | 'PREMIUM';

export interface SubscriptionPlan {
  tier: SubscriptionTier;
  name: string;
  price: number;
  currency: string;
  features: string[];
  isPopular?: boolean;
}

export const SUBSCRIPTION_PLANS: Record<SubscriptionTier, SubscriptionPlan> = {
  FREE: {
    tier: 'FREE',
    name: 'CRA Ready',
    price: 0,
    currency: 'CAD',
    features: [
      'Basic CRA compliance tracking',
      'Up to 10 bookings per month',
      'Basic calendar integration',
      'Email support'
    ]
  },
  STARTER: {
    tier: 'STARTER',
    name: 'Tax Basics',
    price: 5,
    currency: 'CAD',
    features: [
      'Everything in Free PLUS:',
      'Unlimited bookings',
      'Advanced tax compliance',
      'Synchronized calendar',
      'Client communication tools',
      'Priority email support'
    ]
  },
  PRO: {
    tier: 'PRO',
    name: 'Most Popular',
    price: 10,
    currency: 'CAD',
    features: [
      'Everything in Starter PLUS:',
      'Advanced analytics dashboard',
      'Growth tools and insights',
      'QuickBooks integration',
      'Complete tax suite',
      'Professional support'
    ],
    isPopular: true
  },
  PREMIUM: {
    tier: 'PREMIUM',
    name: 'Business Intelligence',
    price: 15,
    currency: 'CAD',
    features: [
      'Everything in Pro PLUS:',
      'AI-powered market intelligence',
      'Automated marketing tools',
      'Predictive analytics',
      'Tax optimization AI',
      'White-glove support'
    ]
  }
};

export interface MenuItemConfig {
  path: string;
  labelKey: string;
  icon: string;
  tierNote?: string;
  showNotification?: boolean;
}

// Helper function to check if tier is Starter or higher
export const hasStarterOrHigher = (tier: SubscriptionTier): boolean => {
  return ['STARTER', 'PRO', 'PREMIUM'].includes(tier);
};

// Helper function to check if tier is Pro or higher
export const hasProOrHigher = (tier: SubscriptionTier): boolean => {
  return ['PRO', 'PREMIUM'].includes(tier);
};

// Helper function to check if tier is Premium
export const isPremium = (tier: SubscriptionTier): boolean => {
  return tier === 'PREMIUM';
};

// Helper function to get tier information
export const getTierInfo = (tier: SubscriptionTier) => {
  return SUBSCRIPTION_PLANS[tier];
};

export const getMenuItems = (tier: SubscriptionTier): MenuItemConfig[] => {
  const baseItems: MenuItemConfig[] = [
    { path: '/my-profile', labelKey: 'Mon Profil', icon: 'User' },
  ];

  switch (tier) {
    case 'FREE':
      return [
        ...baseItems,
        { path: '/calendar', labelKey: 'Calendrier de Base', icon: 'Calendar' },
        { path: '/tax-compliance', labelKey: 'Conformité de Base', icon: 'FileText' },
        { path: '/bookings', labelKey: 'Mes Réservations', icon: 'CalendarCheck', tierNote: 'max 10/mois' },
        { path: '/settings', labelKey: 'Paramètres', icon: 'Settings' },
      ];

    case 'STARTER':
      return [
        ...baseItems,
        { path: '/calendar', labelKey: 'Calendrier Synchronisé', icon: 'Calendar' },
        { path: '/dashboard', labelKey: 'Tableau Prestataire', icon: 'BarChart3' },
        { path: '/tax-compliance', labelKey: 'Conformité Fiscale Avancée', icon: 'FileText' },
        { path: '/bookings', labelKey: 'Mes Réservations', icon: 'CalendarCheck', tierNote: 'illimitées' },
        { path: '/chat', labelKey: 'Communications Client', icon: 'MessageSquare' },
        { path: '/settings', labelKey: 'Paramètres', icon: 'Settings' },
      ];

    case 'PRO':
      return [
        ...baseItems,
        { path: '/calendar', labelKey: 'Calendrier Pro', icon: 'Calendar' },
        { path: '/dashboard', labelKey: 'Tableau Prestataire', icon: 'BarChart3' },
        { path: '/analytics', labelKey: 'Analytiques Avancées', icon: 'TrendingUp' },
        { path: '/growth', labelKey: 'Outils de Croissance', icon: 'Target' },
        { path: '/tax-compliance', labelKey: 'Suite Fiscale Complète', icon: 'Shield' },
        { path: '/bookings', labelKey: 'Gestion Avancée', icon: 'CalendarCheck' },
        { path: '/chat', labelKey: 'Communications Pro', icon: 'MessageSquare' },
        { path: '/settings', labelKey: 'Paramètres', icon: 'Settings' },
      ];

    case 'PREMIUM':
      return [
        ...baseItems,
        { path: '/calendar', labelKey: 'Calendrier IA', icon: 'Calendar' },
        { path: '/dashboard', labelKey: 'Tableau Exécutif', icon: 'BarChart3' },
        { path: '/analytics', labelKey: 'Intelligence Marché', icon: 'Brain', showNotification: true },
        { path: '/growth', labelKey: 'Marketing Automatisé', icon: 'Target' },
        { path: '/tax-compliance', labelKey: 'Optimisation Fiscale IA', icon: 'Shield' },
        { path: '/bookings', labelKey: 'Gestion Intelligente', icon: 'CalendarCheck' },
        { path: '/chat', labelKey: 'Communications IA', icon: 'MessageSquare' },
        { path: '/settings', labelKey: 'Paramètres Avancés', icon: 'Settings' },
      ];

    default:
      return baseItems;
  }
};
