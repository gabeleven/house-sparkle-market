
-- Add the new service categories for the expanded service offerings
INSERT INTO public.service_categories (name, description, icon_name) VALUES
('lawn_mowing', 'Professional lawn mowing services', 'TreePine'),
('snow_removal', 'Snow removal and winter maintenance', 'Snowflake'),
('landscaping', 'Landscaping and garden design services', 'Mountain'),
('yard_cleanup', 'Yard cleanup and maintenance services', 'TreePine'),
('handyman_services', 'General handyman and repair services', 'Hammer'),
('home_repairs', 'Home repair and maintenance services', 'Wrench'),
('renovations', 'Home renovation and improvement services', 'Building'),
('electrical_work', 'Electrical installation and repair services', 'Zap'),
('massage_therapy', 'Professional massage therapy services', 'Heart'),
('personal_training', 'Personal fitness training services', 'Dumbbell'),
('physiotherapy', 'Physiotherapy and rehabilitation services', 'User'),
('chiropractic', 'Chiropractic care and treatment services', 'User'),
('pet_sitting', 'Pet sitting and care services', 'Heart'),
('dog_walking', 'Professional dog walking services', 'User'),
('pet_grooming', 'Pet grooming and styling services', 'ShirtIcon'),
('elder_care', 'Elder care and assistance services', 'Users')
ON CONFLICT (name) DO NOTHING;

-- Update existing cleaning service categories if they need better naming
UPDATE public.service_categories 
SET description = 'Residential home cleaning services'
WHERE name = 'residential_cleaning';

UPDATE public.service_categories 
SET description = 'Commercial office and business cleaning'
WHERE name = 'commercial_cleaning';

UPDATE public.service_categories 
SET description = 'Professional window cleaning services'
WHERE name = 'window_washing';

UPDATE public.service_categories 
SET description = 'Light housekeeping and maintenance cleaning'
WHERE name = 'light_housekeeping';
