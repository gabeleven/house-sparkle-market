
export enum SubscriptionTier {
  FREE = 'free',
  STARTER = 'starter',
  PROFESSIONAL = 'professional',
  PREMIUM = 'premium'
}

export interface MenuItemConfig {
  path: string;
  labelKey: string;
  icon: string;
  tierNote?: string;
  showNotification?: boolean;
}

// Helper function to check if tier is Starter or higher
export const hasStarterOrHigher = (tier: SubscriptionTier): boolean => {
  return [SubscriptionTier.STARTER, SubscriptionTier.PROFESSIONAL, SubscriptionTier.PREMIUM].includes(tier);
};

// Helper function to get tier information
export const getTierInfo = (tier: SubscriptionTier) => {
  const tierInfo = {
    [SubscriptionTier.FREE]: { 
      name: 'Free', 
      label: 'CRA Ready',
      color: 'secondary' as const
    },
    [SubscriptionTier.STARTER]: { 
      name: 'Starter', 
      label: 'Tax Basics',
      color: 'default' as const
    },
    [SubscriptionTier.PROFESSIONAL]: { 
      name: 'Professional', 
      label: 'Most Popular',
      color: 'default' as const
    },
    [SubscriptionTier.PREMIUM]: { 
      name: 'Premium', 
      label: 'Business Intelligence',
      color: 'destructive' as const
    }
  };
  
  return tierInfo[tier];
};

export const getMenuItems = (tier: SubscriptionTier): MenuItemConfig[] => {
  const baseItems: MenuItemConfig[] = [
    { path: '/my-profile', labelKey: 'Mon Profil', icon: 'User' },
  ];

  switch (tier) {
    case SubscriptionTier.FREE:
      return [
        ...baseItems,
        { path: '/calendar', labelKey: 'Calendrier de Base', icon: 'Calendar' },
        { path: '/tax-compliance', labelKey: 'Conformité de Base', icon: 'FileText' },
        { path: '/bookings', labelKey: 'Mes Réservations', icon: 'CalendarCheck', tierNote: 'max 10/mois' },
        { path: '/settings', labelKey: 'Paramètres', icon: 'Settings' },
      ];

    case SubscriptionTier.STARTER:
      return [
        ...baseItems,
        { path: '/calendar', labelKey: 'Calendrier Synchronisé', icon: 'Calendar' },
        { path: '/provider-dashboard', labelKey: 'Tableau Prestataire', icon: 'BarChart3' },
        { path: '/tax-compliance', labelKey: 'Conformité Fiscale Avancée', icon: 'FileText' },
        { path: '/bookings', labelKey: 'Mes Réservations', icon: 'CalendarCheck', tierNote: 'illimitées' },
        { path: '/chat', labelKey: 'Communications Client', icon: 'MessageSquare' },
        { path: '/settings', labelKey: 'Paramètres', icon: 'Settings' },
      ];

    case SubscriptionTier.PROFESSIONAL:
      return [
        ...baseItems,
        { path: '/calendar', labelKey: 'Calendrier Pro', icon: 'Calendar' },
        { path: '/provider-dashboard', labelKey: 'Tableau Prestataire', icon: 'BarChart3' },
        { path: '/analytics', labelKey: 'Analytiques Avancées', icon: 'TrendingUp' },
        { path: '/growth', labelKey: 'Outils de Croissance', icon: 'Target' },
        { path: '/tax-compliance', labelKey: 'Suite Fiscale Complète', icon: 'Shield' },
        { path: '/bookings', labelKey: 'Gestion Avancée', icon: 'CalendarCheck' },
        { path: '/chat', labelKey: 'Communications Pro', icon: 'MessageSquare' },
        { path: '/settings', labelKey: 'Paramètres', icon: 'Settings' },
      ];

    case SubscriptionTier.PREMIUM:
      return [
        ...baseItems,
        { path: '/calendar', labelKey: 'Calendrier IA', icon: 'Calendar' },
        { path: '/provider-dashboard', labelKey: 'Tableau Exécutif', icon: 'BarChart3' },
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
