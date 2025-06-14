
-- First, let's create specific service categories for each service type
INSERT INTO public.service_categories (name, description, icon_name) VALUES
('residential_cleaning', 'Residential home cleaning services', 'Home'),
('end_of_lease_cleaning', 'End of lease and move-out cleaning', 'Sparkles'),
('commercial_cleaning', 'Office and commercial space cleaning', 'Building'),
('chalet_airbnb_cleaning', 'Vacation rental and Airbnb cleaning', 'Mountain'),
('window_washing', 'Professional window cleaning services', 'Droplets'),
('ironing', 'Clothes ironing and pressing services', 'ShirtIcon'),
('light_housekeeping', 'Light housekeeping and maintenance cleaning', 'Brush'),
('deep_cleaning', 'Deep cleaning and spring cleaning services', 'Zap')
ON CONFLICT (name) DO NOTHING;

-- Migrate cleaner_profiles data to providers table (only if not already exists)
INSERT INTO public.providers (
  user_id, business_name, bio, address, latitude, longitude, 
  service_radius_km, hourly_rate, years_experience, profile_photo_url, 
  banner_image_url, is_featured, is_profile_complete, average_rating, total_reviews
)
SELECT 
  cp.id, cp.business_name, cp.brief_description, cp.service_area_city, 
  cp.latitude, cp.longitude, cp.service_radius_km, cp.hourly_rate, 
  cp.years_experience, cp.profile_photo_url, cp.banner_image_url,
  cp.is_featured, cp.is_profile_complete, cp.average_rating, cp.total_reviews
FROM public.cleaner_profiles cp
WHERE NOT EXISTS (SELECT 1 FROM public.providers p WHERE p.user_id = cp.id)
ON CONFLICT (user_id) DO NOTHING;

-- Convert cleaner_service_types to provider_services
INSERT INTO public.provider_services (provider_id, service_category_id, is_available)
SELECT DISTINCT
  pr.id as provider_id,
  sc.id as service_category_id,
  true as is_available
FROM public.cleaner_service_types cst
JOIN public.providers pr ON pr.user_id = cst.cleaner_id
JOIN public.service_categories sc ON sc.name = cst.service_type::text
WHERE NOT EXISTS (
  SELECT 1 FROM public.provider_services ps 
  WHERE ps.provider_id = pr.id AND ps.service_category_id = sc.id
)
ON CONFLICT (provider_id, service_category_id) DO NOTHING;

-- Update any existing bookings to reference provider_id properly
UPDATE public.bookings b
SET provider_id = (SELECT pr.id FROM public.providers pr WHERE pr.user_id = b.cleaner_id)
WHERE b.provider_id IS NULL 
AND EXISTS (SELECT 1 FROM public.providers pr WHERE pr.user_id = b.cleaner_id);

-- Update any existing reviews to reference provider_id properly
UPDATE public.reviews r
SET provider_id = (SELECT pr.id FROM public.providers pr WHERE pr.user_id = r.reviewee_id)
WHERE r.provider_id IS NULL
AND r.reviewer_type = 'customer' 
AND EXISTS (SELECT 1 FROM public.providers pr WHERE pr.user_id = r.reviewee_id);

-- Clean up: Drop the redundant tables and views (after data migration)
DROP VIEW IF EXISTS public.cleaners_with_profiles;
DROP TABLE IF EXISTS public.cleaner_services;
DROP TABLE IF EXISTS public.cleaner_service_types;
DROP TABLE IF EXISTS public.cleaner_profiles;

-- Create indexes for better performance (skip if they already exist)
CREATE INDEX IF NOT EXISTS idx_providers_location ON public.providers(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_providers_service_radius ON public.providers(service_radius_km);
CREATE INDEX IF NOT EXISTS idx_provider_services_available ON public.provider_services(is_available);
