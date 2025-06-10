
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Clock, DollarSign, User, Calendar } from 'lucide-react';
import { ContactViaHousieButton } from './ContactViaHousieButton';
import { ProfileViewDialog } from './ProfileViewDialog';
import { useProfileDialog } from '@/hooks/useProfileDialog';
import { BookingSlideOut } from './booking/BookingSlideOut';

interface CleanerCardProps {
  cleaner: {
    id: string;
    full_name: string;
    email: string;
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
    is_profile_complete?: boolean;
  };
  distance?: number;
}

const CleanerCard: React.FC<CleanerCardProps> = ({ cleaner, distance }) => {
  const { 
    isDialogOpen, 
    selectedUserName, 
    openProfileDialog, 
    closeProfileDialog, 
    confirmViewProfile 
  } = useProfileDialog();
  
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleViewProfile = () => {
    openProfileDialog(cleaner.id, cleaner.business_name || cleaner.full_name);
  };

  const handleNameClick = () => {
    openProfileDialog(cleaner.id, cleaner.business_name || cleaner.full_name);
  };

  const handleBookNow = () => {
    setIsBookingOpen(true);
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-green-700 rounded-full flex items-center justify-center">
                {cleaner.profile_photo_url ? (
                  <img 
                    src={cleaner.profile_photo_url} 
                    alt={cleaner.full_name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                <h3 
                  className="font-semibold text-lg text-foreground cursor-pointer hover:text-primary transition-colors"
                  onClick={handleNameClick}
                >
                  {cleaner.business_name || cleaner.full_name}
                </h3>
                {cleaner.average_rating && cleaner.total_reviews && (
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-muted-foreground">
                      {cleaner.average_rating.toFixed(1)} ({cleaner.total_reviews} reviews)
                    </span>
                  </div>
                )}
              </div>
            </div>
            {distance && (
              <Badge variant="outline" className="text-xs">
                {distance.toFixed(1)} km away
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {cleaner.brief_description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {cleaner.brief_description}
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            {cleaner.services?.slice(0, 3).map((service, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {service}
              </Badge>
            ))}
            {cleaner.services && cleaner.services.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{cleaner.services.length - 3} more
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
            {cleaner.service_area_city && (
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{cleaner.service_area_city}</span>
              </div>
            )}
            {cleaner.years_experience !== undefined && (
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{cleaner.years_experience} years exp.</span>
              </div>
            )}
            {cleaner.hourly_rate && (
              <div className="flex items-center space-x-1">
                <DollarSign className="w-4 h-4" />
                <span>${cleaner.hourly_rate}/hour</span>
              </div>
            )}
          </div>

          <div className="flex space-x-2 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={handleViewProfile}
            >
              View Profile
            </Button>
            <Button 
              onClick={handleBookNow}
              size="sm" 
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book now
            </Button>
          </div>
        </CardContent>
      </Card>

      <ProfileViewDialog
        isOpen={isDialogOpen}
        onClose={closeProfileDialog}
        onConfirm={confirmViewProfile}
        userName={selectedUserName}
      />

      <BookingSlideOut
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        cleaner={cleaner}
      />
    </>
  );
};

export default CleanerCard;
