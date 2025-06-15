
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, BarChart3, FileText, Target, ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const AnalyticsNavigation = () => {
  const location = useLocation();
  const isAnalyticsSubpage = location.pathname.startsWith('/analytics/');
  const currentTab = location.pathname.split('/analytics/')[1] || 'dashboard';

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
        
        <Tabs value={currentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100">
            <TabsTrigger value="intelligence" asChild>
              <Link to="/analytics/intelligence" className="flex items-center gap-2 data-[state=active]:bg-white">
                <Brain className="w-4 h-4 text-purple-600" />
                <span className="hidden sm:inline">Intelligence</span>
              </Link>
            </TabsTrigger>
            
            <TabsTrigger value="insights" asChild>
              <Link to="/analytics/insights" className="flex items-center gap-2 data-[state=active]:bg-white">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                <span className="hidden sm:inline">Insights</span>
              </Link>
            </TabsTrigger>
            
            <TabsTrigger value="reports" asChild>
              <Link to="/analytics/reports" className="flex items-center gap-2 data-[state=active]:bg-white">
                <FileText className="w-4 h-4 text-green-600" />
                <span className="hidden sm:inline">Reports</span>
              </Link>
            </TabsTrigger>
            
            <TabsTrigger value="performance" asChild>
              <Link to="/analytics/performance" className="flex items-center gap-2 data-[state=active]:bg-white">
                <Target className="w-4 h-4 text-orange-600" />
                <span className="hidden sm:inline">Performance</span>
              </Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardContent>
    </Card>
  );
};
