
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Target, Clock, Users, ArrowLeft, TrendingUp, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PerformanceChart } from '@/components/analytics/PerformanceChart';
import { BookingChart } from '@/components/analytics/BookingChart';
import { AnalyticsProvider, useAnalytics } from '@/contexts/AnalyticsContext';
import { DateRangeButton } from '@/components/analytics/DateRangeButton';

const PerformanceContent = () => {
  const { filters } = useAnalytics();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-orange-200 to-yellow-300">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with styled back button */}
        <div className="mb-8">
          <Link to="/analytics">
            <Button className="mb-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full flex items-center gap-2 shadow-lg">
              <ArrowLeft className="h-4 w-4" />
              Retour aux Analytiques
            </Button>
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-orange-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800">Performance Dashboard</h1>
              </div>
              <p className="text-gray-600">Track your business KPIs and performance metrics</p>
              {filters.dateRange && (
                <p className="text-sm text-gray-500 mt-1">
                  Filtered data from {filters.dateRange.from?.toLocaleDateString()} to {filters.dateRange.to?.toLocaleDateString()}
                </p>
              )}
            </div>
            
            <div className="flex gap-2">
              <DateRangeButton />
              <Badge variant="outline" className="bg-white/80">Starter+</Badge>
              <Button variant="outline" size="sm" className="bg-white/80">
                <Target className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Set Goals</span>
              </Button>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Efficiency</p>
                  <p className="text-2xl font-bold text-gray-900">92%</p>
                </div>
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-xs text-green-600 mt-1">Above target (90%)</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Response Time</p>
                  <p className="text-2xl font-bold text-gray-900">12m</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-xs text-blue-600 mt-1">Below target (15m)</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Retention</p>
                  <p className="text-2xl font-bold text-gray-900">87%</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-xs text-purple-600 mt-1">Meeting target (85%)</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                  <p className="text-2xl font-bold text-gray-900">+15%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <p className="text-xs text-orange-600 mt-1">Above target (+12%)</p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span className="truncate">Monthly Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PerformanceChart />
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                <span className="truncate">Booking Trends</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BookingChart />
            </CardContent>
          </Card>
        </div>

        {/* Detailed Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-600" />
                <span className="truncate">Service Quality</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Overall Rating</span>
                  <span className="text-sm font-medium">4.8 ⭐</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Punctuality</span>
                  <span className="text-sm font-medium">4.9 ⭐</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Quality</span>
                  <span className="text-sm font-medium">4.7 ⭐</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Communication</span>
                  <span className="text-sm font-medium">4.8 ⭐</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="truncate">Booking Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Acceptance Rate</span>
                  <span className="text-sm font-medium">94%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Cancellation Rate</span>
                  <span className="text-sm font-medium">2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Repeat Customers</span>
                  <span className="text-sm font-medium">68%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">No-Shows</span>
                  <span className="text-sm font-medium">1%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="truncate">Efficiency Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Avg. Service Time</span>
                  <span className="text-sm font-medium">2.3h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Travel Efficiency</span>
                  <span className="text-sm font-medium">87%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Schedule Utilization</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Peak Hour Usage</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

const Performance = () => {
  return (
    <AnalyticsProvider>
      <PerformanceContent />
    </AnalyticsProvider>
  );
};

export default Performance;
