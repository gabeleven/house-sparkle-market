
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart, FileText, Brain, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DashboardShortcuts = () => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Quick Navigation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/analytics/insights">
            <div className="p-4 border border-gray-200 rounded-lg bg-white/80 hover:bg-white/90 cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg shadow-sm">
                  <LineChart className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Insights Avancées</h3>
                  <p className="text-xs text-gray-600">Analyses détaillées de performance</p>
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
                  <h3 className="font-semibold text-sm">Rapports Professionnels</h3>
                  <p className="text-xs text-gray-600">Rapports détaillés et exportables</p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/analytics/intelligence">
            <div className="p-4 border border-gray-200 rounded-lg bg-white/80 hover:bg-white/90 cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-100 rounded-lg shadow-sm">
                  <Brain className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm">Business Intelligence</h3>
                    <Badge className="text-xs px-2 py-0.5 bg-teal-100 text-teal-800 shadow-sm">Premium</Badge>
                  </div>
                  <p className="text-xs text-gray-600">IA marketing + intelligence marché</p>
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
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm">Performance Optimization</h3>
                    <Badge className="text-xs px-2 py-0.5 bg-teal-100 text-teal-800 shadow-sm">Premium</Badge>
                  </div>
                  <p className="text-xs text-gray-600">Optimisation intelligente des performances</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
