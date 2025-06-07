
import React from 'react';
import { CleanerProfile } from '@/hooks/useCleaners';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star } from 'lucide-react';
import { ContactViaHousieButton } from '@/components/ContactViaHousieButton';

interface CleanerMapPopupProps {
  cleaner: CleanerProfile;
  position: { x: number; y: number };
  onClose: () => void;
}

export const CleanerMapPopup = ({ cleaner, position, onClose }: CleanerMapPopupProps) => {
  const popupStyle = {
    position: 'fixed' as const,
    left: position.x - 150, // Center the popup
    top: position.y - 20,
    zIndex: 20,
    transform: 'translateY(-100%)',
  };

  return (
    <div style={popupStyle}>
      <Card className="w-80 shadow-lg border-2 border-purple-200">
        <CardContent className="p-4">
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
                  <span className="text-sm text-purple-600 font-medium">
                    {cleaner.distance.toFixed(1)} km away
                  </span>
                )}
              </div>
            </div>
          </div>

          {cleaner.brief_description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {cleaner.brief_description}
            </p>
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
            <Button variant="outline" size="sm" className="flex-1">
              View Profile
            </Button>
            <ContactViaHousieButton 
              cleanerId={cleaner.id} 
              className="flex-1 text-xs px-2"
            />
          </div>
        </CardContent>
        
        {/* Arrow pointing down */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
          <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-purple-200"></div>
        </div>
      </Card>
    </div>
  );
};
