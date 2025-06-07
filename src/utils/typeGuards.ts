
// Type guards for database responses
export function isValidProfileData(data: any): data is {
  id: string;
  full_name: string;
  phone_number: string;
  user_role: string;
  business_name?: string;
  brief_description?: string;
  service_area_city?: string;
  service_radius_km?: number;
  years_experience?: number;
  hourly_rate?: number;
  latitude?: number;
  longitude?: number;
  profile_photo_url?: string;
} {
  return data &&
    typeof data === 'object' &&
    !('error' in data) &&
    !('message' in data) &&
    typeof data.id === 'string' &&
    typeof data.full_name === 'string' &&
    typeof data.phone_number === 'string' &&
    typeof data.user_role === 'string';
}

export function isValidCleanerProfileData(data: any): data is {
  id: string;
  business_name?: string;
  brief_description?: string;
  service_area_city?: string;
  service_radius_km?: number;
  years_experience?: number;
  hourly_rate?: number;
  latitude?: number;
  longitude?: number;
} {
  return data &&
    typeof data === 'object' &&
    !('error' in data) &&
    !('message' in data) &&
    typeof data.id === 'string';
}

export function isValidCustomerProfileData(data: any): data is {
  id: string;
  latitude?: number;
  longitude?: number;
} {
  return data &&
    typeof data === 'object' &&
    !('error' in data) &&
    !('message' in data) &&
    typeof data.id === 'string';
}

export function isValidMessageData(data: any): data is {
  message_content: string;
  message_type: string;
} {
  return data &&
    typeof data === 'object' &&
    !('error' in data) &&
    !('message' in data) &&
    typeof data.message_content === 'string' &&
    typeof data.message_type === 'string';
}

export function isValidConversationData(data: any): data is {
  id: string;
} {
  return data &&
    typeof data === 'object' &&
    !('error' in data) &&
    !('message' in data) &&
    typeof data.id === 'string';
}

export function isValidCleanerData(data: any): data is {
  id: string;
  full_name?: string;
  business_name?: string;
  brief_description?: string;
  profile_photo_url?: string;
  latitude?: number;
  longitude?: number;
  service_radius_km?: number;
  years_experience?: number;
  service_area_city?: string;
  services?: string[];
} {
  return data &&
    typeof data === 'object' &&
    !('error' in data) &&
    !('message' in data) &&
    typeof data.id === 'string';
}
