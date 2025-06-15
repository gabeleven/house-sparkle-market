
import React from 'react';
import { Button } from '@/components/ui/button';
import { User, Eye } from 'lucide-react';
import { ProviderProfile } from '@/types/providers';

interface CleanerPopupProps {
  cleaner: ProviderProfile;
  onViewProfile: (cleaner: ProviderProfile) => void;
  onClose: () => void;
}

export const CleanerPopup: React.FC<CleanerPopupProps> = ({
  cleaner,
  onViewProfile,
  onClose
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 min-w-[280px] max-w-[320px]">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
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
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">
            {cleaner.business_name || cleaner.full_name}
          </h3>
          {cleaner.business_name && (
            <p className="text-sm text-gray-600 truncate">{cleaner.full_name}</p>
          )}
          {cleaner.service_area_city && (
            <p className="text-sm text-gray-500">{cleaner.service_area_city}</p>
          )}
        </div>
      </div>

      {cleaner.brief_description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {cleaner.brief_description}
        </p>
      )}

      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
        {cleaner.years_experience !== null && (
          <span>{cleaner.years_experience} years exp.</span>
        )}
        {cleaner.hourly_rate && (
          <span className="font-medium text-green-600">${cleaner.hourly_rate}/hr</span>
        )}
      </div>

      <div className="flex gap-2">
        <Button 
          onClick={() => onViewProfile(cleaner)}
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
