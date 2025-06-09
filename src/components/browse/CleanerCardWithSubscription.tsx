
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Clock, DollarSign, Phone, MessageCircle } from 'lucide-react';
import { CleanerProfile } from '@/hooks/useCleaners';
import { ServiceIcons } from './ServiceIcons';
import { hasStarterOrHigher, SubscriptionTier } from '@/types/subscription';

interface CleanerCardWithSubscriptionProps {
  cleaner: CleanerProfile;
  userSubscription?: SubscriptionTier;
}

export const CleanerCardWithSubscription: React.FC<CleanerCardWithSubscriptionProps> = ({ 
  cleaner, 
  userSubscription = SubscriptionTier.FREE 
}) => {
  const showServiceIcons = hasStarterOrHigher(userSubscription);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-purple-100 to-green-100 flex items-center justify-center">
          {cleaner.profile_photo_url ? (
            <img 
              src={cleaner.profile_photo_url} 
              alt={cleaner.full_name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-500">
                {cleaner.full_name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        {cleaner.average_rating && (
          <Badge className="absolute top-2 right-2 bg-white/90 text-gray-800">
            <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
            {cleaner.average_rating.toFixed(1)}
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {cleaner.business_name || cleaner.full_name}
            </h3>
            {cleaner.business_name && (
              <p className="text-sm text-gray-600">{cleaner.full_name}</p>
            )}
          </div>

          {cleaner.brief_description && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {cleaner.brief_description}
            </p>
          )}

          <ServiceIcons 
            services={cleaner.services} 
            showIcons={showServiceIcons}
          />

          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{cleaner.service_area_city || 'Ville non spécifiée'}</span>
          </div>

          {cleaner.years_experience !== null && (
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              <span>{cleaner.years_experience} ans d'expérience</span>
            </div>
          )}

          {cleaner.hourly_rate && (
            <div className="flex items-center text-sm font-medium text-green-600">
              <DollarSign className="w-4 h-4 mr-1" />
              <span>{cleaner.hourly_rate}$ / heure</span>
            </div>
          )}

          {cleaner.total_reviews && cleaner.total_reviews > 0 && (
            <div className="flex items-center text-sm text-gray-500">
              <span>{cleaner.total_reviews} avis</span>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button size="sm" className="flex-1">
              <Phone className="w-4 h-4 mr-1" />
              Appeler
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              <MessageCircle className="w-4 h-4 mr-1" />
              Message
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
