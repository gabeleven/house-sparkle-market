
import React from 'react';
import { Button } from '@/components/ui/button';
import { User, Eye } from 'lucide-react';
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
    <div className="bg-white rounded-lg shadow-lg p-4 min-w-[280px] max-w-[320px]">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
          {provider.profile_photo_url ? (
            <img 
              src={provider.profile_photo_url} 
              alt={provider.full_name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <User className="w-6 h-6 text-white" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">
            {provider.business_name || provider.full_name}
          </h3>
          {provider.business_name && (
            <p className="text-sm text-gray-600 truncate">{provider.full_name}</p>
          )}
          {provider.service_area_city && (
            <p className="text-sm text-gray-500">{provider.service_area_city}</p>
          )}
        </div>
      </div>

      {provider.brief_description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {provider.brief_description}
        </p>
      )}

      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
        {provider.years_experience !== null && (
          <span>{provider.years_experience} years exp.</span>
        )}
        {provider.hourly_rate && (
          <span className="font-medium text-green-600">${provider.hourly_rate}/hr</span>
        )}
      </div>

      <div className="flex gap-2">
        <Button 
          onClick={() => onViewProfile(provider)}
          size="sm" 
          className="flex-1"
        >
          <Eye className="w-4 h-4 mr-1" />
          View Profile
        </Button>
      </div>
    </div>
  );
};
