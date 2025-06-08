
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

export const hasFeature = (plan: string, feature: string) => {
  const features = {
    [SubscriptionTier.FREE]: ['messages', 'profile'],
    [SubscriptionTier.STARTER]: ['messages', 'profile', 'calendar'],
    [SubscriptionTier.PROFESSIONAL]: ['messages', 'profile', 'calendar', 'bookmarks', 'earnings', 'position'],
    [SubscriptionTier.PREMIUM]: ['messages', 'profile', 'calendar', 'bookmarks', 'earnings', 'position', 'dashboard']
  };
  return features[plan as keyof typeof features]?.includes(feature) || false;
};

export const getMenuItems = (plan: string) => {
  const baseItems = [
    { label: 'Messages', path: '/chat', showNotification: true, feature: 'messages' },
    { label: 'Mon Profil', path: '/my-profile', feature: 'profile' },
  ];

  const tierItems = [
    { label: 'Calendar', path: '/calendar', feature: 'calendar' },
    { label: 'Bookmarks', path: '/bookmarks', feature: 'bookmarks' },
    { label: 'My Earnings', path: '/earnings', feature: 'earnings' },
    { label: 'Position', path: '/position', feature: 'position' },
    { label: 'My Dashboard', path: '/dashboard', feature: 'dashboard' },
  ];

  return [
    ...baseItems,
    ...tierItems.filter(item => hasFeature(plan, item.feature))
  ];
};
