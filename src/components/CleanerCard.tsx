
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Star, MessageCircle, DollarSign } from 'lucide-react';
import { CleanerProfile } from '@/hooks/useCleaners';
import { ContactViaHousieButton } from './ContactViaHousieButton';
import { useNavigate } from 'react-router-dom';

interface CleanerCardProps {
  cleaner: CleanerProfile;
}

export const CleanerCard = ({ cleaner }: CleanerCardProps) => {
  const navigate = useNavigate();

  const formatDistance = (distance?: number) => {
    if (!distance) return null;
    return distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance.toFixed(1)}km`;
  };

  const getDisplayRate = () => {
    // Use actual hourly_rate from database, fallback to default if not set
    if (cleaner.hourly_rate && cleaner.hourly_rate > 0) {
      return cleaner.hourly_rate;
    }
    
    // Fallback calculation based on experience
    const baseRate = 25;
    const experienceBonus = (cleaner.years_experience || 0) * 2;
    return baseRate + experienceBonus;
  };

  const handleViewProfile = () => {
    navigate(`/profile/${cleaner.id}`);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 bg-white border border-gray-200">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={cleaner.profile_photo_url || ''} />
            <AvatarFallback className="bg-purple-100 text-purple-600 text-lg font-semibold">
              {cleaner.full_name?.charAt(0)?.toUpperCase() || 'C'}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {cleaner.full_name}
              </h3>
              {cleaner.distance && (
                <span className="text-sm text-gray-500 flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {formatDistance(cleaner.distance)} away
                </span>
              )}
            </div>
            
            {cleaner.business_name && (
              <p className="text-sm text-purple-600 font-medium mb-1">
                {cleaner.business_name}
              </p>
            )}
            
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600 ml-1">4.8 (24 reviews)</span>
              </div>
              {cleaner.years_experience && (
                <Badge variant="secondary" className="text-xs">
                  {cleaner.years_experience} years exp.
                </Badge>
              )}
            </div>

            {/* Location */}
            {cleaner.service_area_city && (
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span>Services {cleaner.service_area_city}</span>
                {cleaner.service_radius_km && (
                  <span className="ml-1">• {cleaner.service_radius_km}km radius</span>
                )}
              </div>
            )}

            {/* Rate */}
            <div className="flex items-center text-sm text-gray-700 mb-2">
              <DollarSign className="w-4 h-4 mr-1 text-green-600" />
              <span className="font-medium">${getDisplayRate()}/hour</span>
              <span className="text-gray-500 ml-1">
                {cleaner.hourly_rate && cleaner.hourly_rate > 0 ? 'quoted rate' : 'starting rate'}
              </span>
            </div>
          </div>
        </div>

        {/* Services */}
        {cleaner.services && cleaner.services.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Services:</p>
            <div className="flex flex-wrap gap-1">
              {cleaner.services.slice(0, 3).map((service, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {service}
                </Badge>
              ))}
              {cleaner.services.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{cleaner.services.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Description */}
        {cleaner.brief_description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {cleaner.brief_description}
          </p>
        )}

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={handleViewProfile}>
            <MessageCircle className="w-4 h-4 mr-2" />
            View Profile
          </Button>
          <ContactViaHousieButton 
            cleanerId={cleaner.id}
            size="sm"
            className="flex-1"
          />
        </div>
      </CardContent>
    </Card>
  );
};
