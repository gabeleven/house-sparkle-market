
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, DollarSign, Users, Calendar, FileText, Brain, Target, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardShortcuts } from '@/components/analytics/DashboardShortcuts';
import { DashboardSearch } from '@/components/analytics/DashboardSearch';

const AnalyticsDashboard = () => {
  const [highlightedCategory, setHighlightedCategory] = useState<string>('');

  const handleHighlight = (category: string) => {
    setHighlightedCategory(category);
    // Clear highlight after 2 seconds
    setTimeout(() => setHighlightedCategory(''), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-orange-200 to-yellow-300">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Back Button */}
        <div className="mb-8">
          <Link to="/">
            <Button className="mb-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full flex items-center gap-2 shadow-lg">
              <ArrowLeft className="h-4 w-4" />
              Retour aux Analytiques
            </Button>
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800">Business Analytics</h1>
              </div>
              <p className="text-gray-600">Comprehensive business intelligence and performance insights</p>
            </div>
            
            <Badge className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2">
              Alimenté par IA
            </Badge>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <DashboardSearch onHighlight={handleHighlight} />
        </div>

        {/* Quick Navigation Shortcuts */}
        <div className="mb-8">
          <DashboardShortcuts />
        </div>

        {/* Metrics Cards */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transition-all duration-500 ${
          highlightedCategory === 'metrics' ? 'ring-2 ring-blue-500 ring-opacity-50 bg-blue-50/50 rounded-lg p-4' : ''
        }`}>
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">127</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-xs text-green-600 mt-1">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">$28,750</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-xs text-green-600 mt-1">+18% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">87%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-xs text-green-600 mt-1">+5% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-gray-900">1,247</p>
                </div>
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <p className="text-xs text-green-600 mt-1">+8% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className={`grid lg:grid-cols-2 gap-8 mb-8 transition-all duration-500 ${
          highlightedCategory === 'recent' ? 'ring-2 ring-blue-500 ring-opacity-50 bg-blue-50/50 rounded-lg p-4' : ''
        }`}>
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Recent Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Deep Cleaning - Downtown</p>
                    <p className="text-sm text-gray-600">Today, 2:30 PM</p>
                  </div>
                  <Badge variant="outline">Confirmed</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Regular Cleaning - Westside</p>
                    <p className="text-sm text-gray-600">Tomorrow, 10:00 AM</p>
                  </div>
                  <Badge variant="outline">Pending</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Move-out Cleaning - Uptown</p>
                    <p className="text-sm text-gray-600">Dec 16, 1:00 PM</p>
                  </div>
                  <Badge variant="outline">Scheduled</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg transition-all duration-500 ${
            highlightedCategory === 'performance' ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
          }`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Service Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Regular Cleaning</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Deep Cleaning</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Move-in/out</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Link to="/analytics/insights">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-accent/50 w-full">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  <span className="text-sm font-medium">View Insights</span>
                </Button>
              </Link>
              
              <Link to="/analytics/reports">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-accent/50 w-full">
                  <FileText className="w-6 h-6 text-green-600" />
                  <span className="text-sm font-medium">Generate Report</span>
                </Button>
              </Link>
              
              <Link to="/analytics/intelligence">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-accent/50 w-full">
                  <Brain className="w-6 h-6 text-purple-600" />
                  <span className="text-sm font-medium">AI Intelligence</span>
                </Button>
              </Link>
              
              <Link to="/analytics/performance">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-accent/50 w-full">
                  <Target className="w-6 h-6 text-orange-600" />
                  <span className="text-sm font-medium">Performance</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AnalyticsDashboard;
