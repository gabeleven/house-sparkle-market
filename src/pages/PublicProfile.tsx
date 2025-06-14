
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, DollarSign, Clock, Award, MessageCircle, User } from 'lucide-react';
import { Loader2 } from 'lucide-react';

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

  useEffect(() => {
    if (id) {
      loadProfile();
    }
  }, [id]);

  const loadProfile = async () => {
    if (!id) return;

    try {
      console.log('Loading public profile for user ID:', id);
      
      // Get provider profile with services
      const { data: providerData, error: providerError } = await supabase
        .from('providers')
        .select(`
          *,
          profiles!providers_user_id_fkey(
            full_name,
            email,
            user_role
          ),
          provider_services(
            *,
            service_categories(*)
          )
        `)
        .eq('user_id', id)
        .single();

      if (providerData && providerData.profiles) {
        const profiles = Array.isArray(providerData.profiles) ? providerData.profiles[0] : providerData.profiles;
        setProfile({
          id: providerData.id,
          user_id: providerData.user_id,
          full_name: profiles.full_name,
          email: profiles.email,
          profile_photo_url: providerData.profile_photo_url,
          business_name: providerData.business_name,
          bio: providerData.bio,
          address: providerData.address,
          service_radius_km: providerData.service_radius_km,
          years_experience: providerData.years_experience,
          hourly_rate: providerData.hourly_rate,
          latitude: providerData.latitude,
          longitude: providerData.longitude,
          average_rating: providerData.average_rating,
          total_reviews: providerData.total_reviews,
          services: providerData.provider_services || [],
          user_role: profiles.user_role
        });
      } else {
        // Fallback to basic profile if no provider profile exists
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', id)
          .single();

        if (profileError) {
          console.error('Profile error:', profileError);
          throw profileError;
        }

        setProfile({
          id: profileData.id,
          user_id: profileData.id,
          full_name: profileData.full_name,
          email: profileData.email,
          profile_photo_url: profileData.profile_photo_url,
          user_role: profileData.user_role,
          services: []
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
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
              onClick={() => navigate('/browse-services')} 
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Provider Basic Information */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-6 mb-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={profile.profile_photo_url || ''} />
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
                      {profile.full_name?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {profile.full_name}
                    </h1>
                    
                    {profile.business_name && (
                      <p className="text-xl text-primary font-medium mb-3">
                        {profile.business_name}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="text-lg text-gray-700 ml-1 font-medium">
                          {profile.average_rating ? profile.average_rating.toFixed(1) : '4.8'}
                        </span>
                        <span className="text-gray-500 ml-1">
                          ({profile.total_reviews || 0} reviews)
                        </span>
                      </div>
                      
                      {profile.years_experience && profile.years_experience > 0 && (
                        <Badge variant="secondary" className="text-sm">
                          <Award className="w-4 h-4 mr-1" />
                          {profile.years_experience} years experience
                        </Badge>
                      )}
                    </div>

                    {/* Service Area Information */}
                    {profile.address && (
                      <div className="flex items-center text-gray-600 mb-4">
                        <MapPin className="w-5 h-5 mr-2" />
                        <span>Services {profile.address}</span>
                        {profile.service_radius_km && (
                          <span className="ml-1">• {profile.service_radius_km}km radius</span>
                        )}
                      </div>
                    )}

                    {/* Hourly Rate */}
                    <div className="flex items-center text-green-600 mb-4">
                      <DollarSign className="w-5 h-5 mr-1" />
                      <span className="font-semibold text-lg">${getDisplayRate()}/hour</span>
                      <span className="text-gray-500 ml-1">
                        {profile.hourly_rate && profile.hourly_rate > 0 ? 'quoted rate' : 'starting rate'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Brief Description */}
                {profile.bio && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                    <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Services Offered - Prominent Section */}
            {profile.services && profile.services.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Services Offered</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {profile.services.map((service, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border"
                      >
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">
                            {service.service_categories?.name || 'Service'}
                          </span>
                          {service.description && (
                            <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                          )}
                          {service.base_price && (
                            <p className="text-sm text-green-600 font-medium">
                              From ${service.base_price}/{service.price_unit || 'hour'}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Reviews Section */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Reviews</h3>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">John D.</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">
                          Excellent service! Very thorough and professional. Would definitely hire again.
                        </p>
                        <div className="flex items-center text-gray-400 text-xs mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          2 weeks ago
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-gray-500 text-sm">More reviews coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h3>
                
                {/* Rate Display */}
                <div className="mb-4 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center text-green-700 mb-2">
                    <DollarSign className="w-5 h-5 mr-2" />
                    <span className="font-semibold">
                      {profile.hourly_rate && profile.hourly_rate > 0 ? 'Quoted Rate' : 'Starting Rate'}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">${getDisplayRate()}/hour</p>
                  <p className="text-sm text-green-600">Custom quotes available</p>
                </div>

                {/* Contact Button */}
                <div className="space-y-3">
                  <Button
                    onClick={handleMessageProvider}
                    size="lg"
                    className="w-full"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Messages
                  </Button>
                </div>

                <div className="text-center text-sm text-gray-500 mt-4">
                  <p>All communications are handled through our secure messaging system</p>
                </div>
              </CardContent>
            </Card>

            {/* Service Area Map Placeholder */}
            {profile.latitude && profile.longitude && (
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Area</h3>
                  <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <MapPin className="w-8 h-8 mx-auto mb-2" />
                      <p>Interactive map coming soon</p>
                      <p className="text-sm">
                        Located in {profile.address}
                      </p>
                      {profile.service_radius_km && (
                        <p className="text-sm">
                          Service radius: {profile.service_radius_km}km
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
