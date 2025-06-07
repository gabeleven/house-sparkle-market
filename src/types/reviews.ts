
export interface Review {
  id: string;
  booking_id: string | null;
  reviewer_id: string;
  reviewee_id: string;
  reviewer_type: 'customer' | 'cleaner';
  rating: number;
  title: string | null;
  comment: string | null;
  photos: string[];
  cleaner_response: string | null;
  cleaner_response_date: string | null;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  reviewer_profile?: {
    full_name: string;
    profile_photo_url: string | null;
  };
}

export interface ReviewPhoto {
  id: string;
  review_id: string;
  photo_url: string;
  photo_type: 'before' | 'after' | 'general';
  caption: string | null;
  created_at: string;
}

export interface Booking {
  id: string;
  customer_id: string;
  cleaner_id: string;
  service_date: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  total_amount: number | null;
  before_photos: string[];
  after_photos: string[];
  created_at: string;
  updated_at: string;
}
