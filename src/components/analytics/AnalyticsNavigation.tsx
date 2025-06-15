
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, BarChart3, FileText, Target, ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const AnalyticsNavigation = () => {
  const location = useLocation();
  const isAnalyticsSubpage = location.pathname.startsWith('/analytics/');
  const currentPath = location.pathname;

  const navigationItems = [
    {
      path: '/analytics/intelligence',
      icon: Brain,
      label: 'Intelligence'
    },
    {
      path: '/analytics/insights',
      icon: BarChart3,
      label: 'Insights'
    },
    {
      path: '/analytics/reports',
      icon: FileText,
      label: 'Reports'
    },
    {
      path: '/analytics/performance',
      icon: Target,
      label: 'Performance'
    }
  ];

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg">
      <CardContent className="p-6">
        {isAnalyticsSubpage && (
          <div className="mb-4">
            <Link to="/analytics">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        )}
        
        <div className="flex gap-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  className={`flex items-center gap-2 ${
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
        </div>
      </CardContent>
    </Card>
  );
};
