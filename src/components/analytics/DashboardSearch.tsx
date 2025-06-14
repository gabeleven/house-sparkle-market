
import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, TrendingUp, DollarSign, Calendar, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SearchResult {
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
}

interface DashboardSearchProps {
  onHighlight: (category: string) => void;
}

export const DashboardSearch = ({ onHighlight }: DashboardSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const searchableItems: SearchResult[] = [
    {
      title: 'Total Bookings',
      description: 'Number of service bookings',
      category: 'metrics',
      icon: <Calendar className="w-4 h-4" />
    },
    {
      title: 'Total Revenue',
      description: 'Revenue from completed bookings',
      category: 'metrics',
      icon: <DollarSign className="w-4 h-4" />
    },
    {
      title: 'Conversion Rate',
      description: 'Bookings to completion ratio',
      category: 'metrics',
      icon: <TrendingUp className="w-4 h-4" />
    },
    {
      title: 'Active Users',
      description: 'Currently active users',
      category: 'metrics',
      icon: <Users className="w-4 h-4" />
    },
    {
      title: 'Recent Bookings',
      description: 'Latest service bookings',
      category: 'recent',
      icon: <Calendar className="w-4 h-4" />
    },
    {
      title: 'Service Performance',
      description: 'Performance by service type',
      category: 'performance',
      icon: <TrendingUp className="w-4 h-4" />
    }
  ];

  const filteredResults = useMemo(() => {
    if (!searchTerm) return [];
    
    return searchableItems.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleResultClick = (result: SearchResult) => {
    onHighlight(result.category);
    setSearchTerm('');
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search widgets, trackers, analytics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      
      {filteredResults.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-lg">
          <CardContent className="p-2">
            <div className="space-y-1">
              {filteredResults.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleResultClick(result)}
                  className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/50 transition-colors text-left"
                >
                  <div className="text-primary">
                    {result.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{result.title}</div>
                    <div className="text-xs text-muted-foreground">{result.description}</div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {result.category}
                  </Badge>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
