import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import L from 'leaflet';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ContactViaHousieButton } from '@/components/ContactViaHousieButton';
import { MapPin, Star, DollarSign, Clock, Award } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { ServiceType, serviceTypeIcons, serviceTypeLabels } from '@/utils/serviceTypes';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface PublicProfileData {
  id: string;
  full_name: string;
  profile_photo_url?: string;
  business_name?: string;
  brief_description?: string;
  service_area_city?: string;
  service_radius_km?: number;
  years_experience?: number;
  hourly_rate?: number;
  latitude?: number;
  longitude?: number;
  services?: ServiceType[];
  user_role: string;
}

const PublicProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const [profile, setProfile] = useState<PublicProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      loadProfile();
    }
  }, [userId]);

  const loadProfile = async () => {
    if (!userId) return;

    try {
      // Get basic profile info
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;

      let completeProfile: PublicProfileData = {
        id: profileData.id,
        full_name: profileData.full_name,
        profile_photo_url: profileData.profile_photo_url,
        user_role: profileData.user_role
      };

      // Get role-specific data if it's a cleaner
      if (profileData.user_role === 'cleaner') {
        const { data: cleanerData } = await supabase
          .from('cleaner_profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (cleanerData) {
          completeProfile = {
            ...completeProfile,
            business_name: cleanerData.business_name,
            brief_description: cleanerData.brief_description,
            service_area_city: cleanerData.service_area_city,
            service_radius_km: cleanerData.service_radius_km,
            years_experience: cleanerData.years_experience,
            hourly_rate: cleanerData.hourly_rate,
            latitude: cleanerData.latitude,
            longitude: cleanerData.longitude
          };

          // Get services
          const { data: servicesData } = await supabase
            .from('cleaner_service_types')
            .select('service_type')
            .eq('cleaner_id', userId);

          if (servicesData) {
            completeProfile.services = servicesData.map(s => s.service_type as ServiceType);
          }
        }
      }

      setProfile(completeProfile);
    } catch (error) {
      console.error('Error loading profile:', error);
      setError('Profile not found');
    } finally {
      setLoading(false);
    }
  };

  const getDisplayRate = () => {
    // Use actual hourly_rate from database, fallback to default if not set
    if (profile?.hourly_rate && profile.hourly_rate > 0) {
      return profile.hourly_rate;
    }
    
    // Fallback calculation based on experience
    const baseRate = 25;
    const experienceBonus = (profile?.years_experience || 0) * 2;
    return baseRate + experienceBonus;
  };

  const createCustomIcon = () => {
    if (!profile?.profile_photo_url) return undefined;
    
    return L.divIcon({
      html: `
        <div style="
          width: 50px; 
          height: 50px; 
          background-image: url('${profile.profile_photo_url}'); 
          background-size: cover; 
          background-position: center;
          border-radius: 50%; 
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        "></div>
      `,
      className: 'custom-div-icon',
      iconSize: [50, 50],
      iconAnchor: [25, 25]
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Profile Not Found</h1>
            <p className="text-muted-foreground">The profile you're looking for doesn't exist or isn't available.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardContent className="p-8">
                <div className="flex items-start gap-6 mb-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={profile.profile_photo_url || ''} />
                    <AvatarFallback className="bg-purple-100 text-purple-600 text-2xl font-semibold">
                      {profile.full_name?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                      {profile.full_name}
                    </h1>
                    
                    {profile.business_name && (
                      <p className="text-xl text-purple-600 font-medium mb-3">
                        {profile.business_name}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="text-lg text-foreground ml-1 font-medium">4.8</span>
                        <span className="text-muted-foreground ml-1">(24 reviews)</span>
                      </div>
                      
                      {profile.years_experience && (
                        <Badge variant="secondary" className="text-sm">
                          <Award className="w-4 h-4 mr-1" />
                          {profile.years_experience} years experience
                        </Badge>
                      )}
                    </div>

                    {profile.service_area_city && (
                      <div className="flex items-center text-muted-foreground mb-4">
                        <MapPin className="w-5 h-5 mr-2" />
                        <span>Services {profile.service_area_city}</span>
                        {profile.service_radius_km && (
                          <span className="ml-1">• {profile.service_radius_km}km radius</span>
                        )}
                      </div>
                    )}

                    {profile.user_role === 'cleaner' && (
                      <div className="flex items-center text-green-600 mb-4">
                        <DollarSign className="w-5 h-5 mr-1" />
                        <span className="font-semibold text-lg">${getDisplayRate()}/hour</span>
                        <span className="text-muted-foreground ml-1">
                          {profile.hourly_rate && profile.hourly_rate > 0 ? 'quoted rate' : 'starting rate'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {profile.brief_description && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">About</h3>
                    <p className="text-muted-foreground leading-relaxed">{profile.brief_description}</p>
                  </div>
                )}

                {profile.services && profile.services.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">Services Offered</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {profile.services.map((service, index) => {
                        const Icon = serviceTypeIcons[service];
                        return (
                          <div
                            key={index}
                            className="flex items-center space-x-2 p-3 bg-muted rounded-lg"
                          >
                            <Icon className="w-5 h-5 text-purple-600" />
                            <span className="text-sm font-medium text-foreground">
                              {serviceTypeLabels[service]}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Customer Reviews</h3>
                <div className="space-y-4">
                  <div className="border-b border-border pb-4">
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
                        <p className="text-muted-foreground text-sm">
                          Excellent service! Very thorough and professional. Would definitely hire again.
                        </p>
                        <div className="flex items-center text-muted-foreground text-xs mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          2 weeks ago
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-muted-foreground text-sm">More reviews coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Get in Touch</h3>
                
                {profile.user_role === 'cleaner' && (
                  <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center text-green-700 dark:text-green-400 mb-2">
                      <DollarSign className="w-5 h-5 mr-2" />
                      <span className="font-semibold">
                        {profile.hourly_rate && profile.hourly_rate > 0 ? 'Quoted Rate' : 'Starting Rate'}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">${getDisplayRate()}/hour</p>
                    <p className="text-sm text-green-600 dark:text-green-400">Custom quotes available</p>
                  </div>
                )}

                <ContactViaHousieButton 
                  cleanerId={profile.id}
                  size="lg"
                  className="w-full mb-4"
                />

                <div className="text-center text-sm text-muted-foreground">
                  <p>All communications are handled through Housie's secure messaging system</p>
                </div>
              </CardContent>
            </Card>

            {/* Service Area Map */}
            {profile.latitude && profile.longitude && (
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Service Area</h3>
                  <div className="w-full h-48 rounded-lg overflow-hidden">
                    <MapContainer 
                      center={[profile.latitude, profile.longitude]} 
                      zoom={12}
                      style={{ height: "100%", width: "100%" }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      
                      {/* Service radius circle */}
                      {profile.service_radius_km && (
                        <Circle
                          center={[profile.latitude, profile.longitude]}
                          radius={profile.service_radius_km * 1000}
                          pathOptions={{
                            color: '#6366f1',
                            fillColor: '#6366f1',
                            fillOpacity: 0.1,
                            weight: 2
                          }}
                        />
                      )}

                      {/* Profile photo marker */}
                      <Marker
                        position={[profile.latitude, profile.longitude]}
                        icon={createCustomIcon()}
                      />
                    </MapContainer>
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-sm text-muted-foreground">
                      Located in {profile.service_area_city}
                      {profile.service_radius_km && (
                        <span className="block">Service radius: {profile.service_radius_km} km</span>
                      )}
                    </p>
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
