
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock } from "lucide-react";
import { CleanerProfile } from "@/hooks/useCleaners";
import { ContactViaHousieButton } from "./ContactViaHousieButton";

interface CleanerCardProps {
  cleaner: CleanerProfile;
}

export const CleanerCard = ({ cleaner }: CleanerCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={cleaner.profile_photo_url || ''} />
            <AvatarFallback>
              {cleaner.full_name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900">
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
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {cleaner.brief_description}
          </p>
        )}

        {cleaner.services && cleaner.services.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {cleaner.services.slice(0, 3).map((service, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {service}
              </Badge>
            ))}
            {cleaner.services.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{cleaner.services.length - 3} more
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {cleaner.years_experience && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {cleaner.years_experience} years exp.
              </div>
            )}
          </div>
          
          <ContactViaHousieButton cleanerId={cleaner.id} />
        </div>
      </CardContent>
    </Card>
  );
};
