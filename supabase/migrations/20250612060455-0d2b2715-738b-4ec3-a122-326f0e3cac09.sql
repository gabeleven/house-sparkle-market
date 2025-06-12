
-- Fix the critical database relationship issue between providers and profiles
-- This will resolve the "0 cleaners found across Quebec" error

-- 1. Add the missing foreign key constraint linking providers.user_id to profiles.id
ALTER TABLE public.providers 
ADD CONSTRAINT fk_providers_user_id 
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- 2. Add proper indexing for query optimization
CREATE INDEX IF NOT EXISTS idx_providers_user_id_profiles ON public.providers(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_user_role ON public.profiles(user_role);

-- 3. Create weather data storage tables for historical weather tracking
CREATE TABLE public.weather_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  city TEXT NOT NULL DEFAULT 'Montreal',
  date DATE NOT NULL,
  temperature NUMERIC(5,2),
  precipitation NUMERIC(8,2) DEFAULT 0,
  weather_condition TEXT,
  humidity INTEGER,
  wind_speed NUMERIC(5,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(city, date)
);

-- 4. Create booking demand correlation table
CREATE TABLE public.daily_demand_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  city TEXT NOT NULL DEFAULT 'Montreal',
  booking_count INTEGER DEFAULT 0,
  total_bookings_value NUMERIC(10,2) DEFAULT 0,
  weather_correlation_score NUMERIC(3,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(city, date)
);

-- 5. Enable Row Level Security
ALTER TABLE public.weather_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_demand_stats ENABLE ROW LEVEL SECURITY;

-- 6. Create RLS policies for weather data (public read access)
CREATE POLICY "Anyone can view weather data"
ON public.weather_data FOR SELECT
USING (true);

CREATE POLICY "Anyone can view demand stats"
ON public.daily_demand_stats FOR SELECT
USING (true);

-- 7. Create function to calculate weather-demand correlation
CREATE OR REPLACE FUNCTION public.calculate_weather_demand_correlation()
RETURNS TABLE (
  date DATE,
  precipitation NUMERIC,
  booking_count INTEGER,
  correlation_score NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    w.date,
    w.precipitation,
    COALESCE(d.booking_count, 0) as booking_count,
    CASE 
      WHEN w.precipitation > 5 THEN 1.5
      WHEN w.precipitation > 2 THEN 1.2
      WHEN w.precipitation > 0 THEN 1.1
      ELSE 1.0
    END::NUMERIC(3,2) as correlation_score
  FROM public.weather_data w
  LEFT JOIN public.daily_demand_stats d ON w.date = d.date AND w.city = d.city
  WHERE w.date >= CURRENT_DATE - INTERVAL '30 days'
  ORDER BY w.date DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Create indexes for performance
CREATE INDEX idx_weather_data_date_city ON public.weather_data(date, city);
CREATE INDEX idx_daily_demand_date_city ON public.daily_demand_stats(date, city);

-- 9. Refresh the schema cache to fix the relationship error
NOTIFY pgrst, 'reload schema';
