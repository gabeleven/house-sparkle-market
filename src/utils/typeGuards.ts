
// Type guards for database responses
export function isValidProfileData(data: any): data is {
  id: string;
  full_name: string;
  phone_number: string | null;
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
    (typeof data.phone_number === 'string' || data.phone_number === null) &&
    typeof data.user_role === 'string';
}

export function isValidCleanerProfileData(data: any): data is {
  id: string;
  business_name?: string | null;
  brief_description?: string | null;
  service_area_city?: string | null;
  service_radius_km?: number | null;
  years_experience?: number | null;
  hourly_rate?: number | null;
  latitude?: number | null;
  longitude?: number | null;
} {
  return data &&
    typeof data === 'object' &&
    !('error' in data) &&
    !('message' in data) &&
    typeof data.id === 'string';
}

export function isValidCustomerProfileData(data: any): data is {
  id: string;
  latitude?: number | null;
  longitude?: number | null;
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
  full_name?: string | null;
  business_name?: string | null;
  brief_description?: string | null;
  profile_photo_url?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  service_radius_km?: number | null;
  years_experience?: number | null;
  service_area_city?: string | null;
  services?: string[] | null;
} {
  return data &&
    typeof data === 'object' &&
    !('error' in data) &&
    !('message' in data) &&
    typeof data.id === 'string';
}
