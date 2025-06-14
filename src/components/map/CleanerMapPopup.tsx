
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Eye, Calendar } from 'lucide-react';
import { useProfileDialog } from '@/hooks/useProfileDialog';
import { ProfileViewDialog } from '@/components/ProfileViewDialog';

interface CleanerMapPopupProps {
  cleaner: {
    id: string;
    full_name: string;
    business_name?: string;
    brief_description?: string;
    profile_photo_url?: string;
    service_area_city?: string;
    latitude?: number;
    longitude?: number;
    service_radius_km?: number;
    years_experience?: number;
    services?: string[];
    average_rating?: number;
    total_reviews?: number;
    hourly_rate?: number;
    distance?: number;
  };
  position?: { x: number; y: number };
  onClose?: () => void;
}

export const CleanerMapPopup: React.FC<CleanerMapPopupProps> = ({ cleaner, position, onClose }) => {
  const { 
    isDialogOpen, 
    selectedUserName, 
    openProfileDialog, 
    closeProfileDialog, 
    confirmViewProfile 
  } = useProfileDialog();

  const handleViewProfile = () => {
    openProfileDialog(cleaner.id, cleaner.business_name || cleaner.full_name);
  };

  const handleBookNow = () => {
    // Navigate to booking page or open booking modal
    window.location.href = `/booking?provider=${cleaner.id}`;
  };

  return (
    <>
      <div className="w-80 p-4">
        <div className="flex items-start gap-3 mb-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={cleaner.profile_photo_url || ''} />
            <AvatarFallback>
              {cleaner.full_name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">
              {cleaner.business_name || cleaner.full_name}
            </h3>
            {cleaner.business_name && (
              <p className="text-sm text-gray-600">{cleaner.full_name}</p>
            )}
            
            <div className="flex items-center gap-2 mt-1">
              {cleaner.service_area_city && (
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-3 h-3 mr-1" />
                  {cleaner.service_area_city}
                </div>
              )}
              {cleaner.distance && (
                <span className="text-sm text-primary font-medium">
                  {cleaner.distance.toFixed(1)} km away
                </span>
              )}
            </div>

            {/* Rating Display */}
            {cleaner.average_rating && (
              <div className="flex items-center mt-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium ml-1">
                  {cleaner.average_rating.toFixed(1)}
                </span>
                <span className="text-sm text-gray-500 ml-1">
                  ({cleaner.total_reviews || 0})
                </span>
              </div>
            )}
          </div>
        </div>

        {cleaner.brief_description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {cleaner.brief_description}
          </p>
        )}

        {/* Hourly Rate */}
        {cleaner.hourly_rate && (
          <div className="mb-3">
            <span className="text-sm font-medium text-green-600">
              ${cleaner.hourly_rate}/hour
            </span>
          </div>
        )}

        {cleaner.services && cleaner.services.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {cleaner.services.slice(0, 2).map((service, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {service}
              </Badge>
            ))}
            {cleaner.services.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{cleaner.services.length - 2}
              </Badge>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1" 
            onClick={handleViewProfile}
          >
            <Eye className="w-3 h-3 mr-1" />
            View Profile
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
            onClick={handleBookNow}
          >
            <Calendar className="w-3 h-3 mr-1" />
            Book Now
          </Button>
        </div>
      </div>

      <ProfileViewDialog
        isOpen={isDialogOpen}
        onClose={closeProfileDialog}
        onConfirm={confirmViewProfile}
        userName={selectedUserName}
      />
    </>
  );
};
