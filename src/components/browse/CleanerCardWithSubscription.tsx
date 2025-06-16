
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, Eye, Calendar } from 'lucide-react';
import { ContactViaHousieButton } from '@/components/ContactViaHousieButton';
import { ServiceIcons } from './ServiceIcons';
import { ServiceType } from '@/utils/serviceTypes';
import { useNavigate } from 'react-router-dom';
import { ProviderProfile } from '@/types/providers';
import { SubscriptionTier } from '@/types/subscription';
import { BookingSlideOut } from '@/components/booking/BookingSlideOut';

interface ProviderCardWithSubscriptionProps {
  provider: ProviderProfile;
  userSubscription?: SubscriptionTier;
  showSubscriptionBadge?: boolean;
  showServiceIcons?: boolean;
  compact?: boolean;
}

export const ProviderCardWithSubscription: React.FC<ProviderCardWithSubscriptionProps> = ({
  provider,
  userSubscription = 'FREE',
  showSubscriptionBadge = false,
  showServiceIcons = true,
  compact = false
}) => {
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleViewProfile = () => {
    // Use user_id if available, otherwise fall back to id
    const profileId = provider.user_id || provider.id;
    navigate(`/public-profile/${profileId}`);
  };

  const handleBookService = () => {
    setIsBookingOpen(true);
  };

  const displayName = provider.business_name || provider.full_name;
  const displayRate = provider.hourly_rate || 25;

  // Convert ProviderService[] to service names for ServiceIcons compatibility
  const serviceNames = provider.services?.map(service => service.service_category?.name).filter(Boolean) || [];

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardContent className={compact ? "p-4" : "p-6"}>
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className={compact ? "w-12 h-12" : "w-16 h-16"}>
                <AvatarImage src={provider.profile_photo_url || ''} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {displayName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {showSubscriptionBadge && (
                <div className="absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 text-xs px-1.5 py-0.5 rounded-full font-medium">
                  PRO
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className={`font-semibold text-gray-900 truncate ${compact ? 'text-base' : 'text-lg'}`}>
                    {displayName}
                  </h3>
                  {provider.business_name && (
                    <p className="text-sm text-gray-600">{provider.full_name}</p>
                  )}
                </div>
                
                <div className="flex items-center text-sm text-green-600 font-semibold">
                  ${displayRate}/hr
                </div>
              </div>

              <div className="flex items-center gap-4 mb-3">
                {provider.average_rating && (
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium ml-1">
                      {provider.average_rating.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      ({provider.total_reviews || 0})
                    </span>
                  </div>
                )}

                {provider.years_experience !== null && provider.years_experience > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {provider.years_experience} years
                  </Badge>
                )}
              </div>

              {provider.service_area_city && (
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{provider.service_area_city}</span>
                  {provider.distance && (
                    <span className="ml-2 text-primary font-medium">
                      {provider.distance.toFixed(1)} km away
                    </span>
                  )}
                </div>
              )}

              {provider.brief_description && !compact && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {provider.brief_description}
                </p>
              )}

              <ServiceIcons 
                services={serviceNames as ServiceType[]} 
                showIcons={showServiceIcons} 
              />

              {/* Compact buttons that fit better */}
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleViewProfile}
                  className="text-xs px-3 py-1.5 h-7"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  View
                </Button>
                <Button
                  size="sm"
                  onClick={handleBookService}
                  className="text-xs px-3 py-1.5 h-7"
                >
                  <Calendar className="w-3 h-3 mr-1" />
                  Book
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <BookingSlideOut
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        cleaner={{
          id: provider.user_id || provider.id,
          full_name: provider.full_name,
          business_name: provider.business_name,
          profile_photo_url: provider.profile_photo_url
        }}
      />
    </>
  );
};

// Legacy export for backward compatibility
export const CleanerCardWithSubscription = ProviderCardWithSubscription;
