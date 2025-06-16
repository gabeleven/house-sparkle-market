
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, DollarSign } from 'lucide-react';
import { ProviderProfile } from '@/types/providers';

interface ProviderPopupProps {
  provider: ProviderProfile;
  onViewProfile: (provider: ProviderProfile) => void;
  onClose: () => void;
}

export const ProviderPopup: React.FC<ProviderPopupProps> = ({
  provider,
  onViewProfile,
  onClose
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 min-w-80 max-w-sm">
      <div className="flex items-start gap-3 mb-3">
        {provider.profile_photo_url ? (
          <img
            src={provider.profile_photo_url}
            alt={provider.business_name || provider.full_name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-purple-600 font-medium text-sm">
              {(provider.business_name || provider.full_name).charAt(0)}
            </span>
          </div>
        )}
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-sm">
            {provider.business_name || provider.full_name}
          </h3>
          {provider.service_area_city && (
            <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
              <MapPin className="w-3 h-3" />
              <span>{provider.service_area_city}</span>
            </div>
          )}
        </div>

        {provider.is_featured && (
          <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
            Featured
          </Badge>
        )}
      </div>

      {provider.brief_description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {provider.brief_description}
        </p>
      )}

      <div className="flex items-center gap-4 mb-3 text-xs text-gray-600">
        {provider.average_rating && (
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span>{provider.average_rating.toFixed(1)}</span>
            <span>({provider.total_reviews || 0})</span>
          </div>
        )}
        
        {provider.years_experience && (
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{provider.years_experience} years</span>
          </div>
        )}
        
        {provider.hourly_rate && (
          <div className="flex items-center gap-1">
            <DollarSign className="w-3 h-3" />
            <span>${provider.hourly_rate}/hr</span>
          </div>
        )}
      </div>

      {provider.services && provider.services.length > 0 && (
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {provider.services.slice(0, 3).map((service, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {service.service_category?.name || 'Service'}
              </Badge>
            ))}
            {provider.services.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{provider.services.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <Button
          onClick={() => onViewProfile(provider)}
          size="sm"
          className="flex-1"
        >
          View Profile
        </Button>
        <Button
          onClick={onClose}
          variant="outline"
          size="sm"
        >
          Close
        </Button>
      </div>
    </div>
  );
};
