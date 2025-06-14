
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, MessageCircle, MapPin, Calendar } from 'lucide-react';

interface ContactSidebarProps {
  profile: {
    hourly_rate?: number;
    address?: string;
    service_radius_km?: number;
    latitude?: number;
    longitude?: number;
  };
  displayRate: number;
  onMessageProvider: () => void;
  onBookNow?: () => void;
}

export const ContactSidebar: React.FC<ContactSidebarProps> = ({ 
  profile, 
  displayRate, 
  onMessageProvider,
  onBookNow 
}) => {
  const handleBookNow = () => {
    if (onBookNow) {
      onBookNow();
    } else {
      // Fallback to messaging if no booking function provided
      onMessageProvider();
    }
  };

  return (
    <div className="lg:col-span-1">
      <Card className="sticky top-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h3>
          
          {/* Rate Display */}
          <div className="mb-4 p-4 bg-green-50 rounded-lg">
            <div className="flex items-center text-green-700 mb-2">
              <DollarSign className="w-5 h-5 mr-2" />
              <span className="font-semibold">
                {profile.hourly_rate && profile.hourly_rate > 0 ? 'Quoted Rate' : 'Starting Rate'}
              </span>
            </div>
            <p className="text-2xl font-bold text-green-600">${displayRate}/hour</p>
            <p className="text-sm text-green-600">Custom quotes available</p>
          </div>

          {/* Contact Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleBookNow}
              size="lg"
              className="w-full"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Now
            </Button>
            
            <Button
              onClick={onMessageProvider}
              variant="outline"
              size="lg"
              className="w-full"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Messages
            </Button>
          </div>

          <div className="text-center text-sm text-gray-500 mt-4">
            <p>All communications are handled through our secure messaging system</p>
          </div>
        </CardContent>
      </Card>

      {/* Service Area Map Placeholder */}
      {profile.latitude && profile.longitude && (
        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Area</h3>
            <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="w-8 h-8 mx-auto mb-2" />
                <p>Interactive map coming soon</p>
                <p className="text-sm">
                  Located in {profile.address}
                </p>
                {profile.service_radius_km && (
                  <p className="text-sm">
                    Service radius: {profile.service_radius_km}km
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
