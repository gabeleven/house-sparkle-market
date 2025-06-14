
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Award, MapPin, DollarSign } from 'lucide-react';

interface ProfileHeaderProps {
  profile: {
    full_name: string;
    profile_photo_url?: string;
    business_name?: string;
    average_rating?: number;
    total_reviews?: number;
    years_experience?: number;
    address?: string;
    service_radius_km?: number;
    hourly_rate?: number;
    bio?: string;
  };
  displayRate: number;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, displayRate }) => {
  return (
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
          <span className="font-semibold text-lg">${displayRate}/hour</span>
          <span className="text-gray-500 ml-1">
            {profile.hourly_rate && profile.hourly_rate > 0 ? 'quoted rate' : 'starting rate'}
          </span>
        </div>
      </div>
    </div>
  );
};
