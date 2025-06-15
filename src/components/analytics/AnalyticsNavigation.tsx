
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, BarChart3, FileText, Target, ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const AnalyticsNavigation = () => {
  const location = useLocation();
  const isAnalyticsSubpage = location.pathname.startsWith('/analytics/');

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/analytics/intelligence">
            <div className="p-4 border border-gray-200 rounded-lg bg-white/80 hover:bg-white/90 cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-100 rounded-lg shadow-sm">
                  <Brain className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Market Intelligence</h3>
                  <p className="text-xs text-gray-600">AI-powered market insights</p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/analytics/insights">
            <div className="p-4 border border-gray-200 rounded-lg bg-white/80 hover:bg-white/90 cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg shadow-sm">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Business Insights</h3>
                  <p className="text-xs text-gray-600">Advanced analytics and trends</p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/analytics/reports">
            <div className="p-4 border border-gray-200 rounded-lg bg-white/80 hover:bg-white/90 cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg shadow-sm">
                  <FileText className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Tax & Reports</h3>
                  <p className="text-xs text-gray-600">CRA compliance documents</p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/analytics/performance">
            <div className="p-4 border border-gray-200 rounded-lg bg-white/80 hover:bg-white/90 cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-orange-100 rounded-lg shadow-sm">
                  <Target className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Performance</h3>
                  <p className="text-xs text-gray-600">KPIs and optimization</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
