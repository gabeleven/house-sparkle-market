
import React from 'react';
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
    <div className="flex items-center gap-4">
      {isAnalyticsSubpage && (
        <Link to="/analytics">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>
      )}
      
      <div className="flex gap-1 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-1 shadow-lg">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          
          return (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive ? "default" : "ghost"}
                size="sm"
                className={`flex items-center gap-2 ${
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-gray-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
