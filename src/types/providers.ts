
export interface ServiceCategory {
  id: string;
  name: string;
  description: string | null;
  icon_name: string | null;
  color_class: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Provider {
  id: string;
  user_id: string;
  business_name: string | null;
  bio: string | null;
  phone: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  service_radius_km: number;
  hourly_rate: number | null;
  years_experience: number;
  profile_photo_url: string | null;
  banner_image_url: string | null;
  is_featured: boolean;
  is_profile_complete: boolean;
  average_rating: number;
  total_reviews: number;
  created_at: string;
  updated_at: string;
  services?: ProviderService[];
}

export interface ProviderService {
  id: string;
  provider_id: string;
  service_category_id: string;
  description: string | null;
  base_price: number | null;
  price_unit: string;
  is_available: boolean;
  created_at: string;
  service_category?: ServiceCategory;
}

export interface CreateProviderServiceData {
  service_category_id: string;
  description?: string | null;
  base_price?: number | null;
  price_unit?: string;
  is_available?: boolean;
}

export interface ProviderProfile extends Provider {
  full_name: string;
  email: string;
  distance?: number;
  // Required properties for CleanerProfile compatibility
  brief_description: string;
  service_area_city: string;
  // Make services compatible with ServiceType[] (used by CleanerProfile)
  services?: string[] | null;
}
