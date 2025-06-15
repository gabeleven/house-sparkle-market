
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

interface CleanerCardWithSubscriptionProps {
  cleaner: ProviderProfile;
  userSubscription?: SubscriptionTier;
  showSubscriptionBadge?: boolean;
  showServiceIcons?: boolean;
  compact?: boolean;
}

export const CleanerCardWithSubscription: React.FC<CleanerCardWithSubscriptionProps> = ({
  cleaner,
  userSubscription = 'FREE',
  showSubscriptionBadge = false,
  showServiceIcons = true,
  compact = false
}) => {
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleViewProfile = () => {
    // Use user_id if available, otherwise fall back to id
    const profileId = cleaner.user_id || cleaner.id;
    navigate(`/public-profile/${profileId}`);
  };

  const handleBookService = () => {
    setIsBookingOpen(true);
  };

  const displayName = cleaner.business_name || cleaner.full_name;
  const displayRate = cleaner.hourly_rate || 25;

  // Convert ProviderService[] to service names for ServiceIcons compatibility
  const serviceNames = cleaner.services?.map(service => service.service_category?.name).filter(Boolean) || [];

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardContent className={compact ? "p-4" : "p-6"}>
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className={compact ? "w-12 h-12" : "w-16 h-16"}>
                <AvatarImage src={cleaner.profile_photo_url || ''} />
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
                  {cleaner.business_name && (
                    <p className="text-sm text-gray-600">{cleaner.full_name}</p>
                  )}
                </div>
                
                <div className="flex items-center text-sm text-green-600 font-semibold">
                  ${displayRate}/hr
                </div>
              </div>

              <div className="flex items-center gap-4 mb-3">
                {cleaner.average_rating && (
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium ml-1">
                      {cleaner.average_rating.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      ({cleaner.total_reviews || 0})
                    </span>
                  </div>
                )}

                {cleaner.years_experience !== null && cleaner.years_experience > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {cleaner.years_experience} years
                  </Badge>
                )}
              </div>

              {cleaner.service_area_city && (
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{cleaner.service_area_city}</span>
                  {cleaner.distance && (
                    <span className="ml-2 text-primary font-medium">
                      {cleaner.distance.toFixed(1)} km away
                    </span>
                  )}
                </div>
              )}

              {cleaner.brief_description && !compact && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {cleaner.brief_description}
                </p>
              )}

              <ServiceIcons 
                services={serviceNames as ServiceType[]} 
                showIcons={showServiceIcons} 
              />

              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size={compact ? "sm" : "default"}
                  onClick={handleViewProfile}
                  className="flex-1"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Profile
                </Button>
                <Button
                  size={compact ? "sm" : "default"}
                  onClick={handleBookService}
                  className="flex-1"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Now
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
          id: cleaner.user_id || cleaner.id,
          full_name: cleaner.full_name,
          business_name: cleaner.business_name,
          profile_photo_url: cleaner.profile_photo_url
        }}
      />
    </>
  );
};
