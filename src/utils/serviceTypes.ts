
import { Home, Building, Sparkles, Mountain, Droplets, ShirtIcon, Brush, Zap } from 'lucide-react';

export type ServiceType = 
  | 'residential_cleaning'
  | 'end_of_lease_cleaning'
  | 'commercial_cleaning'
  | 'chalet_airbnb_cleaning'
  | 'window_washing'
  | 'ironing'
  | 'light_housekeeping'
  | 'deep_cleaning';

export const serviceTypeLabels: Record<ServiceType, string> = {
  residential_cleaning: 'Residential Cleaning',
  end_of_lease_cleaning: 'End of Lease Cleaning',
  commercial_cleaning: 'Commercial Cleaning',
  chalet_airbnb_cleaning: 'Chalet/Airbnb Cleaning',
  window_washing: 'Window Washing',
  ironing: 'Ironing',
  light_housekeeping: 'Light Housekeeping',
  deep_cleaning: 'Deep Cleaning'
};

export const serviceTypeIcons: Record<ServiceType, React.ComponentType<any>> = {
  residential_cleaning: Home,
  end_of_lease_cleaning: Sparkles,
  commercial_cleaning: Building,
  chalet_airbnb_cleaning: Mountain,
  window_washing: Droplets,
  ironing: ShirtIcon,
  light_housekeeping: Brush,
  deep_cleaning: Zap
};

export const allServiceTypes: ServiceType[] = [
  'residential_cleaning',
  'end_of_lease_cleaning',
  'commercial_cleaning',
  'chalet_airbnb_cleaning',
  'window_washing',
  'ironing',
  'light_housekeeping',
  'deep_cleaning'
];
