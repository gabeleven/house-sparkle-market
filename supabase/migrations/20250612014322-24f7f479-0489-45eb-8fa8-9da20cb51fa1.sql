
-- Create service_categories table first
CREATE TABLE public.service_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon_name TEXT,
  color_class TEXT DEFAULT 'bg-blue-100 text-blue-800',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert initial service categories
INSERT INTO public.service_categories (name, description, icon_name) VALUES
('cleaning', 'House and office cleaning services', 'Home'),
('lawn_care', 'Lawn maintenance and landscaping', 'TreePine'),
('pet_services', 'Pet care and grooming services', 'Heart'),
('construction', 'Construction and handyman services', 'Hammer');

-- Create providers table (replacing cleaners concept)
CREATE TABLE public.providers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name TEXT,
  bio TEXT,
  phone TEXT,
  address TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  service_radius_km INTEGER DEFAULT 25,
  hourly_rate NUMERIC(10,2),
  years_experience INTEGER DEFAULT 0,
  profile_photo_url TEXT,
  banner_image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_profile_complete BOOLEAN DEFAULT false,
  average_rating NUMERIC(3,2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Create provider_services junction table
CREATE TABLE public.provider_services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  provider_id UUID NOT NULL REFERENCES public.providers(id) ON DELETE CASCADE,
  service_category_id UUID NOT NULL REFERENCES public.service_categories(id) ON DELETE CASCADE,
  description TEXT,
  base_price NUMERIC(10,2),
  price_unit TEXT DEFAULT 'hour', -- hour, job, sqft, etc
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(provider_id, service_category_id)
);

-- Migrate existing cleaner data to providers table
INSERT INTO public.providers (
  user_id, business_name, bio, phone, address, latitude, longitude, 
  service_radius_km, hourly_rate, years_experience, profile_photo_url, 
  banner_image_url, is_featured, is_profile_complete, average_rating, total_reviews
)
SELECT 
  cp.id, cp.business_name, cp.brief_description, p.phone_number, 
  cp.service_area_city, cp.latitude, cp.longitude, cp.service_radius_km,
  cp.hourly_rate, cp.years_experience, p.profile_photo_url,
  cp.banner_image_url, cp.is_featured, cp.is_profile_complete,
  cp.average_rating, cp.total_reviews
FROM public.cleaner_profiles cp
JOIN public.profiles p ON cp.id = p.id
WHERE p.user_role = 'cleaner'
ON CONFLICT (user_id) DO NOTHING;

-- Migrate existing cleaner services to provider_services (with DISTINCT to avoid duplicates)
INSERT INTO public.provider_services (provider_id, service_category_id, is_available)
SELECT DISTINCT
  pr.id, 
  sc.id,
  true
FROM public.providers pr
JOIN public.service_categories sc ON sc.name = 'cleaning'
WHERE pr.user_id IN (SELECT DISTINCT cleaner_id FROM public.cleaner_service_types)
ON CONFLICT (provider_id, service_category_id) DO NOTHING;

-- Update bookings table structure
ALTER TABLE public.bookings 
ADD COLUMN IF NOT EXISTS provider_id UUID REFERENCES public.providers(id),
ADD COLUMN IF NOT EXISTS service_category_id UUID REFERENCES public.service_categories(id);

-- Migrate existing booking data
UPDATE public.bookings b
SET 
  provider_id = (SELECT pr.id FROM public.providers pr WHERE pr.user_id = b.cleaner_id),
  service_category_id = (SELECT id FROM public.service_categories WHERE name = 'cleaning')
WHERE b.provider_id IS NULL 
AND EXISTS (SELECT 1 FROM public.providers pr WHERE pr.user_id = b.cleaner_id);

-- Update reviews table to work with providers
ALTER TABLE public.reviews 
ADD COLUMN IF NOT EXISTS provider_id UUID REFERENCES public.providers(id),
ADD COLUMN IF NOT EXISTS service_category_id UUID REFERENCES public.service_categories(id);

-- Migrate existing review data
UPDATE public.reviews r
SET 
  provider_id = (SELECT pr.id FROM public.providers pr WHERE pr.user_id = r.reviewee_id),
  service_category_id = (SELECT id FROM public.service_categories WHERE name = 'cleaning')
WHERE r.provider_id IS NULL
AND r.reviewer_type = 'customer' 
AND EXISTS (SELECT 1 FROM public.providers pr WHERE pr.user_id = r.reviewee_id);

-- Enable Row Level Security
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_services ENABLE ROW LEVEL SECURITY;

-- RLS Policies for service_categories (public read)
CREATE POLICY "Anyone can view service categories"
ON public.service_categories FOR SELECT
USING (true);

-- RLS Policies for providers
CREATE POLICY "Anyone can view providers"
ON public.providers FOR SELECT
USING (true);

CREATE POLICY "Providers can update their own profile"
ON public.providers FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can create provider profile"
ON public.providers FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for provider_services
CREATE POLICY "Anyone can view provider services"
ON public.provider_services FOR SELECT
USING (true);

CREATE POLICY "Providers can manage their own services"
ON public.provider_services FOR ALL
USING (EXISTS (
  SELECT 1 FROM public.providers 
  WHERE id = provider_services.provider_id 
  AND user_id = auth.uid()
));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_providers_user_id ON public.providers(user_id);
CREATE INDEX IF NOT EXISTS idx_providers_location ON public.providers(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_provider_services_provider ON public.provider_services(provider_id);
CREATE INDEX IF NOT EXISTS idx_provider_services_category ON public.provider_services(service_category_id);
CREATE INDEX IF NOT EXISTS idx_bookings_provider ON public.bookings(provider_id);
CREATE INDEX IF NOT EXISTS idx_reviews_provider ON public.reviews(provider_id);

-- Create function to update provider rating when reviews change
CREATE OR REPLACE FUNCTION public.update_provider_rating()
RETURNS TRIGGER AS $$
DECLARE
  avg_rating numeric(3,2);
  review_count integer;
  target_provider_id uuid;
BEGIN
  -- Get the provider_id from NEW or OLD record
  target_provider_id := COALESCE(NEW.provider_id, OLD.provider_id);
  
  -- Skip if no provider_id
  IF target_provider_id IS NULL THEN
    RETURN COALESCE(NEW, OLD);
  END IF;
  
  -- Calculate average rating and count for the provider
  SELECT 
    ROUND(AVG(rating)::numeric, 2),
    COUNT(*)
  INTO avg_rating, review_count
  FROM public.reviews 
  WHERE provider_id = target_provider_id;
  
  -- Update provider profile
  UPDATE public.providers 
  SET 
    average_rating = COALESCE(avg_rating, 0),
    total_reviews = COALESCE(review_count, 0),
    updated_at = now()
  WHERE id = target_provider_id;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for provider rating updates
DROP TRIGGER IF EXISTS update_provider_rating_trigger ON public.reviews;
CREATE TRIGGER update_provider_rating_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_provider_rating();

-- Create function to automatically update updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_providers()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_providers_updated_at ON public.providers;
CREATE TRIGGER update_providers_updated_at
  BEFORE UPDATE ON public.providers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_providers();

DROP TRIGGER IF EXISTS update_service_categories_updated_at ON public.service_categories;
CREATE TRIGGER update_service_categories_updated_at
  BEFORE UPDATE ON public.service_categories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
