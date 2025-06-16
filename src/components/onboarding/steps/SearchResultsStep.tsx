
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, CheckCircle } from 'lucide-react';
import { useOnboarding } from '@/hooks/useOnboarding';
import { useNavigate } from 'react-router-dom';

export const SearchResultsStep: React.FC = () => {
  const { onboardingData, completeOnboarding } = useOnboarding();
  const navigate = useNavigate();

  const handleViewAllProviders = () => {
    completeOnboarding();
    navigate('/browse-providers');
  };

  const handleBookNow = () => {
    completeOnboarding();
    navigate('/browse-providers');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <h2 className="text-2xl font-bold text-foreground">
            Great! Here's what we found
          </h2>
        </div>
        <p className="text-muted-foreground">
          Based on your preferences in {onboardingData.city}
        </p>
      </div>

      <div className="space-y-4 mb-6">
        {/* Mock provider results */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">Sarah's Cleaning Services</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">4.9</span>
                    <span className="text-muted-foreground">(127 reviews)</span>
                  </div>
                </div>
              </div>
              <Badge variant="secondary">Available</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">2.3 km away</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Professional house cleaning with eco-friendly products. 8+ years experience.
            </p>
            <div className="flex justify-between items-center">
              <span className="font-medium">$35-45/hour</span>
              <Button size="sm" onClick={handleBookNow}>Book Now</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">Mike's Maintenance Pro</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">4.8</span>
                    <span className="text-muted-foreground">(89 reviews)</span>
                  </div>
                </div>
              </div>
              <Badge variant="secondary">Available</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">1.8 km away</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Reliable handyman services for home repairs and maintenance. Licensed & insured.
            </p>
            <div className="flex justify-between items-center">
              <span className="font-medium">$40-60/hour</span>
              <Button size="sm" onClick={handleBookNow}>Book Now</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-3">
        <Button onClick={handleViewAllProviders} className="w-full">
          View All Providers
        </Button>
        <Button variant="outline" onClick={completeOnboarding} className="w-full">
          Browse Later
        </Button>
      </div>
    </div>
  );
};
