
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { useOnboarding } from '@/hooks/useOnboarding';

const timingOptions = [
  { id: 'asap', label: 'As soon as possible', icon: Clock },
  { id: 'this_week', label: 'This week', icon: Calendar },
  { id: 'next_week', label: 'Next week', icon: Calendar },
  { id: 'this_month', label: 'This month', icon: Calendar },
  { id: 'flexible', label: 'I\'m flexible', icon: Clock }
];

export const TimingInputStep: React.FC = () => {
  const { updateOnboardingData, nextStep } = useOnboarding();
  const [selectedTiming, setSelectedTiming] = useState<string>('');

  const handleTimingSelect = (timingId: string) => {
    setSelectedTiming(timingId);
    updateOnboardingData('timing', timingId);
    setTimeout(() => {
      nextStep('search_results');
    }, 300);
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => nextStep('location_input')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            When would you like the service?
          </h2>
          <p className="text-muted-foreground">This helps us prioritize providers</p>
        </div>
      </div>

      <div className="max-w-md mx-auto space-y-3">
        {timingOptions.map((option) => {
          const Icon = option.icon;
          
          return (
            <Card 
              key={option.id}
              className={`cursor-pointer transition-all hover:shadow-md hover:border-primary/50 ${
                selectedTiming === option.id ? 'border-primary bg-primary/5' : ''
              }`}
              onClick={() => handleTimingSelect(option.id)}
            >
              <CardContent className="flex items-center gap-3 p-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  selectedTiming === option.id ? 'bg-primary text-white' : 'bg-muted'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-medium">{option.label}</span>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center mt-6">
        <Button variant="ghost" onClick={() => nextStep('search_results')}>
          Skip this step
        </Button>
      </div>
    </div>
  );
};
