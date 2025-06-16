import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ServicesOfferedCard } from '@/components/profile/ServicesOfferedCard';
import { ReviewsSection } from '@/components/profile/ReviewsSection';
import { ContactSidebar } from '@/components/profile/ContactSidebar';
import { BookingSlideOut } from '@/components/booking/BookingSlideOut';

interface PublicProfileData {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  profile_photo_url?: string;
  business_name?: string;
  bio?: string;
  address?: string;
  service_radius_km?: number;
  years_experience?: number;
  hourly_rate?: number;
  latitude?: number;
  longitude?: number;
  average_rating?: number;
  total_reviews?: number;
  services?: any[];
  user_role: string;
}

const PublicProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<PublicProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    if (id) {
      loadProfile();
    }
  }, [id]);

  const loadProfile = async () => {
    if (!id) return;

    try {
      console.log('PublicProfile: Loading profile for ID:', id);
      
      // First try to get provider data using user_id
      const { data: providerData, error: providerError } = await supabase
        .from('providers')
        .select(`
          *,
          profiles!providers_user_id_fkey(
            full_name,
            email,
            user_role
          )
        `)
        .eq('user_id', id)
        .maybeSingle();

      console.log('PublicProfile: Provider query result:', { providerData, providerError });

      // If no provider found by user_id, try by provider id
      let finalProviderData = providerData;
      if (!providerData && !providerError) {
        const { data: providerByIdData, error: providerByIdError } = await supabase
          .from('providers')
          .select(`
            *,
            profiles!providers_user_id_fkey(
              full_name,
              email,
              user_role
            )
          `)
          .eq('id', id)
          .maybeSingle();

        console.log('PublicProfile: Provider by ID query result:', { providerByIdData, providerByIdError });
        finalProviderData = providerByIdData;
      }

      // Get the profile data separately if needed
      let profileData = null;
      if (!finalProviderData) {
        const { data: directProfileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        console.log('PublicProfile: Direct profile query result:', { directProfileData, profileError });

        if (profileError) {
          console.error('PublicProfile: Profile error:', profileError);
          throw profileError;
        }
        profileData = directProfileData;
      }

      // Load services if we have provider data
      let services = [];
      if (finalProviderData) {
        const { data: servicesData, error: servicesError } = await supabase
          .from('provider_services')
          .select(`
            *,
            service_categories(*)
          `)
          .eq('provider_id', finalProviderData.id)
          .eq('is_available', true);

        if (servicesError) {
          console.error('PublicProfile: Services error:', servicesError);
        } else {
          services = servicesData || [];
          console.log('PublicProfile: Loaded services:', services);
        }
      }

      // Combine the data
      if (finalProviderData) {
        const profileInfo = Array.isArray(finalProviderData.profiles) ? finalProviderData.profiles[0] : finalProviderData.profiles;
        
        const profileResult = {
          id: finalProviderData.id,
          user_id: finalProviderData.user_id,
          full_name: profileInfo?.full_name || '',
          email: profileInfo?.email || '',
          profile_photo_url: finalProviderData.profile_photo_url,
          business_name: finalProviderData.business_name,
          bio: finalProviderData.bio,
          address: finalProviderData.address,
          service_radius_km: finalProviderData.service_radius_km,
          years_experience: finalProviderData.years_experience,
          hourly_rate: finalProviderData.hourly_rate,
          latitude: finalProviderData.latitude,
          longitude: finalProviderData.longitude,
          average_rating: finalProviderData.average_rating,
          total_reviews: finalProviderData.total_reviews,
          services: services,
          user_role: profileInfo?.user_role || 'cleaner'
        };

        console.log('PublicProfile: Setting final profile data:', profileResult);
        setProfile(profileResult);
      } else if (profileData) {
        // Fallback to basic profile if no provider profile exists
        const basicProfile = {
          id: profileData.id,
          user_id: profileData.id,
          full_name: profileData.full_name,
          email: profileData.email,
          profile_photo_url: profileData.profile_photo_url,
          user_role: profileData.user_role,
          services: [],
          service_radius_km: profileData.service_radius_km,
          business_name: profileData.business_name,
          bio: profileData.brief_description,
          address: profileData.service_area_city,
          years_experience: profileData.years_experience
        };

        console.log('PublicProfile: Setting basic profile data:', basicProfile);
        setProfile(basicProfile);
      } else {
        throw new Error('No profile found');
      }
    } catch (error) {
      console.error('PublicProfile: Error loading profile:', error);
      setError('Profile not found');
    } finally {
      setLoading(false);
    }
  };

  const getDisplayRate = () => {
    if (profile?.hourly_rate && profile.hourly_rate > 0) {
      return profile.hourly_rate;
    }
    
    const baseRate = 25;
    const experienceBonus = (profile?.years_experience || 0) * 2;
    return baseRate + experienceBonus;
  };

  const handleMessageProvider = () => {
    navigate(`/chat?provider=${id}`);
  };

  const handleBookNow = () => {
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h1>
            <p className="text-gray-600">The profile you're looking for doesn't exist or isn't available.</p>
            <Button 
              onClick={() => navigate('/browse-providers')} 
              className="mt-4"
            >
              Browse Service Providers
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Profile Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Provider Basic Information */}
              <Card>
                <CardContent className="p-8">
                  <ProfileHeader profile={profile} displayRate={getDisplayRate()} />

                  {/* Brief Description */}
                  {profile.bio && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                      <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Services Offered */}
              <ServicesOfferedCard services={profile.services || []} />

              {/* Reviews Section */}
              <ReviewsSection />
            </div>

            {/* Contact Sidebar */}
            <ContactSidebar 
              profile={profile} 
              displayRate={getDisplayRate()} 
              onMessageProvider={handleMessageProvider}
              onBookNow={handleBookNow}
            />
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {profile && (
        <BookingSlideOut
          isOpen={isBookingOpen}
          onClose={handleCloseBooking}
          cleaner={{
            id: profile.user_id,
            full_name: profile.full_name,
            business_name: profile.business_name,
            profile_photo_url: profile.profile_photo_url
          }}
        />
      )}
    </>
  );
};

export default PublicProfile;
