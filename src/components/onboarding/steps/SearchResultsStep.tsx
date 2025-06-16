
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Star, MapPin, DollarSign } from 'lucide-react';
import { useOnboarding } from '@/hooks/useOnboarding';

const mockProviders = [
  {
    id: 1,
    name: "Clean Pro Services",
    rating: 4.8,
    reviews: 127,
    location: "Toronto, ON",
    price: "$25-35/hr",
    services: ["House Cleaning", "Deep Cleaning"]
  },
  {
    id: 2,
    name: "SparkleHome",
    rating: 4.9,
    reviews: 89,
    location: "Toronto, ON", 
    price: "$30-40/hr",
    services: ["House Cleaning", "Move-in/out"]
  },
  {
    id: 3,
    name: "Elite Cleaning Co",
    rating: 4.7,
    reviews: 156,
    location: "Toronto, ON",
    price: "$28-38/hr",
    services: ["Commercial", "Residential"]
  }
];

export const SearchResultsStep: React.FC = () => {
  const { nextStep, completeOnboarding, onboardingData } = useOnboarding();

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => nextStep('timing_input')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Great! We found some providers for you
          </h2>
          <p className="text-muted-foreground">
            Based on your preferences in {onboardingData.city || 'your area'}
          </p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {mockProviders.map((provider) => (
          <Card key={provider.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{provider.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{provider.rating}</span>
                      <span className="text-muted-foreground">({provider.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {provider.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {provider.price}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {provider.services.map((service, index) => (
                      <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                <Button size="sm">Contact</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={() => nextStep('account_creation')}>
          Create Account to Book
        </Button>
        <Button onClick={completeOnboarding}>
          Browse All Providers
        </Button>
      </div>
    </div>
  );
};
