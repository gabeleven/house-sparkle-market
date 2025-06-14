
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Calendar, Heart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: <Search className="w-5 h-5" />,
      title: 'Find Cleaners',
      description: 'Browse available service providers',
      onClick: () => navigate('/browse-services')
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: 'Schedule Recurring',
      description: 'Set up regular service appointments',
      onClick: () => navigate('/bookings')
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: 'Rebook Favorite',
      description: 'Book with your preferred provider',
      onClick: () => navigate('/browse-services')
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: 'Leave Review',
      description: 'Rate your recent service experience',
      onClick: () => navigate('/bookings')
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-accent/50"
              onClick={action.onClick}
            >
              <div className="text-primary">
                {action.icon}
              </div>
              <div className="text-center">
                <div className="font-medium text-sm">{action.title}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {action.description}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
