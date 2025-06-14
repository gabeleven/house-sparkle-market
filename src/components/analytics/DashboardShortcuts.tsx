
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, FileText, Brain, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

export const DashboardShortcuts = () => {
  const navigate = useNavigate();

  const shortcuts = [
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: 'Insights Avancées',
      description: 'Analyses détaillées de performance',
      path: '/analytics/insights',
      color: 'text-blue-500'
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: 'Rapports Professionnels',
      description: 'Rapports détaillés et exportables',
      path: '/analytics/reports',
      color: 'text-green-500'
    },
    {
      icon: <Brain className="w-5 h-5" />,
      title: 'Business Intelligence',
      description: 'IA marketing + intelligence marché',
      path: '/analytics/intelligence',
      color: 'text-purple-500',
      isPremium: true
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: 'Performance Optimization',
      description: 'Optimisation intelligente des performances',
      path: '/analytics/performance',
      color: 'text-orange-500',
      isPremium: true
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Navigation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {shortcuts.map((shortcut, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 flex flex-col items-start space-y-2 hover:bg-accent/50 relative"
              onClick={() => navigate(shortcut.path)}
            >
              {shortcut.isPremium && (
                <Badge variant="secondary" className="absolute top-2 right-2 text-xs">
                  Premium
                </Badge>
              )}
              <div className={shortcut.color}>
                {shortcut.icon}
              </div>
              <div className="text-left">
                <div className="font-medium text-sm">{shortcut.title}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {shortcut.description}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
