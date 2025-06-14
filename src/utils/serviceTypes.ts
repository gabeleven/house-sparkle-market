
import { Home, Building, Sparkles, Mountain, Droplets, ShirtIcon, Brush, Zap, TreePine, Snowflake, Hammer, Wrench, Heart, Dumbbell, User, Users } from 'lucide-react';

export type ServiceType = 
  | 'residential_cleaning'
  | 'commercial_cleaning'
  | 'window_washing'
  | 'light_housekeeping'
  | 'lawn_mowing'
  | 'snow_removal'
  | 'landscaping'
  | 'yard_cleanup'
  | 'handyman_services'
  | 'home_repairs'
  | 'renovations'
  | 'electrical_work'
  | 'massage_therapy'
  | 'personal_training'
  | 'physiotherapy'
  | 'chiropractic'
  | 'pet_sitting'
  | 'dog_walking'
  | 'pet_grooming'
  | 'elder_care'
  // Legacy services for backward compatibility
  | 'end_of_lease_cleaning'
  | 'chalet_airbnb_cleaning'
  | 'ironing'
  | 'deep_cleaning';

export type ServiceCategory = 'cleaning' | 'lawn_snow' | 'construction' | 'wellness' | 'care_pets';

export const serviceCategoryLabels: Record<ServiceCategory, string> = {
  cleaning: 'Cleaning',
  lawn_snow: 'Lawn/Snow',
  construction: 'Construction',
  wellness: 'Wellness',
  care_pets: 'Care/Pets'
};

export const serviceCategoryIcons: Record<ServiceCategory, React.ComponentType<any>> = {
  cleaning: Sparkles,
  lawn_snow: TreePine,
  construction: Hammer,
  wellness: Heart,
  care_pets: Users
};

export const serviceTypeLabels: Record<ServiceType, string> = {
  // Cleaning services
  residential_cleaning: 'Residential Cleaning',
  commercial_cleaning: 'Commercial Cleaning',
  window_washing: 'Window Washing',
  light_housekeeping: 'Light Housekeeping',
  
  // Lawn/Snow services
  lawn_mowing: 'Lawn Mowing',
  snow_removal: 'Snow Removal',
  landscaping: 'Landscaping',
  yard_cleanup: 'Yard Cleanup',
  
  // Construction services
  handyman_services: 'Handyman Services',
  home_repairs: 'Home Repairs',
  renovations: 'Renovations',
  electrical_work: 'Electrical Work',
  
  // Wellness services
  massage_therapy: 'Massage Therapy',
  personal_training: 'Personal Training',
  physiotherapy: 'Physiotherapy',
  chiropractic: 'Chiropractic',
  
  // Care/Pets services
  pet_sitting: 'Pet Sitting',
  dog_walking: 'Dog Walking',
  pet_grooming: 'Pet Grooming',
  elder_care: 'Elder Care',
  
  // Legacy services
  end_of_lease_cleaning: 'End of Lease Cleaning',
  chalet_airbnb_cleaning: 'Chalet/Airbnb Cleaning',
  ironing: 'Ironing',
  deep_cleaning: 'Deep Cleaning'
};

export const serviceTypeIcons: Record<ServiceType, React.ComponentType<any>> = {
  // Cleaning services
  residential_cleaning: Home,
  commercial_cleaning: Building,
  window_washing: Droplets,
  light_housekeeping: Brush,
  
  // Lawn/Snow services
  lawn_mowing: TreePine,
  snow_removal: Snowflake,
  landscaping: Mountain,
  yard_cleanup: TreePine,
  
  // Construction services
  handyman_services: Hammer,
  home_repairs: Wrench,
  renovations: Building,
  electrical_work: Zap,
  
  // Wellness services
  massage_therapy: Heart,
  personal_training: Dumbbell,
  physiotherapy: User,
  chiropractic: User,
  
  // Care/Pets services
  pet_sitting: Heart,
  dog_walking: User,
  pet_grooming: ShirtIcon,
  elder_care: Users,
  
  // Legacy services
  end_of_lease_cleaning: Sparkles,
  chalet_airbnb_cleaning: Mountain,
  ironing: ShirtIcon,
  deep_cleaning: Zap
};

export const servicesByCategory: Record<ServiceCategory, ServiceType[]> = {
  cleaning: ['residential_cleaning', 'commercial_cleaning', 'window_washing', 'light_housekeeping'],
  lawn_snow: ['lawn_mowing', 'snow_removal', 'landscaping', 'yard_cleanup'],
  construction: ['handyman_services', 'home_repairs', 'renovations', 'electrical_work'],
  wellness: ['massage_therapy', 'personal_training', 'physiotherapy', 'chiropractic'],
  care_pets: ['pet_sitting', 'dog_walking', 'pet_grooming', 'elder_care']
};

export const allServiceTypes: ServiceType[] = [
  ...servicesByCategory.cleaning,
  ...servicesByCategory.lawn_snow,
  ...servicesByCategory.construction,
  ...servicesByCategory.wellness,
  ...servicesByCategory.care_pets,
  'end_of_lease_cleaning',
  'chalet_airbnb_cleaning',
  'ironing',
  'deep_cleaning'
];

export const allServiceCategories: ServiceCategory[] = ['cleaning', 'lawn_snow', 'construction', 'wellness', 'care_pets'];
