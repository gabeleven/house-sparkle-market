
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, Eye, Calendar } from 'lucide-react';
import { ContactViaHousieButton } from '@/components/ContactViaHousieButton';
import { ServiceIcons } from './ServiceIcons';
import { ServiceType } from '@/utils/serviceTypes';
import { useNavigate } from 'react-router-dom';

interface CleanerProfile {
  id: string;
  user_id?: string;
  full_name: string;
  business_name?: string;
  brief_description?: string;
  profile_photo_url?: string;
  service_area_city?: string;
  years_experience?: number;
  services?: ServiceType[];
  average_rating?: number;
  total_reviews?: number;
  hourly_rate?: number;
  distance?: number;
}

interface CleanerCardWithSubscriptionProps {
  cleaner: CleanerProfile;
  showSubscriptionBadge?: boolean;
  showServiceIcons?: boolean;
  compact?: boolean;
}

export const CleanerCardWithSubscription: React.FC<CleanerCardWithSubscriptionProps> = ({
  cleaner,
  showSubscriptionBadge = false,
  showServiceIcons = true,
  compact = false
}) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    // Use user_id if available, otherwise fall back to id
    const profileId = cleaner.user_id || cleaner.id;
    navigate(`/public-profile/${profileId}`);
  };

  const handleBookService = () => {
    // Navigate to booking page with the provider ID
    const providerId = cleaner.user_id || cleaner.id;
    navigate(`/booking?provider=${providerId}`);
  };

  const displayName = cleaner.business_name || cleaner.full_name;
  const displayRate = cleaner.hourly_rate || 25;

  return (
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
              services={cleaner.services || null} 
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
  );
};
