
import React from 'react';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Target, Clock, Users, ArrowLeft, TrendingUp, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Performance = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/provider-dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-6 h-6 text-orange-600" />
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Performance Dashboard</h1>
              </div>
              <p className="text-muted-foreground">Track your business KPIs and performance metrics</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Badge variant="outline">Starter+</Badge>
            <Button variant="outline" size="sm">
              <Target className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Set Goals</span>
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Efficiency</p>
                  <p className="text-2xl font-bold">92%</p>
                </div>
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-xs text-green-600 mt-1">Above target (90%)</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Response Time</p>
                  <p className="text-2xl font-bold">12m</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-xs text-blue-600 mt-1">Below target (15m)</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Retention</p>
                  <p className="text-2xl font-bold">87%</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-xs text-purple-600 mt-1">Meeting target (85%)</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Growth Rate</p>
                  <p className="text-2xl font-bold">+15%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <p className="text-xs text-orange-600 mt-1">Above target (+12%)</p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span className="truncate">Monthly Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Performance chart coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                <span className="truncate">Goal Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Monthly Revenue</span>
                    <span className="text-sm">$28,750 / $30,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '96%' }}></div>
                  </div>
                  <p className="text-xs text-green-600 mt-1">96% completed</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Customer Rating</span>
                    <span className="text-sm">4.8 / 5.0</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                  </div>
                  <p className="text-xs text-yellow-600 mt-1">Excellent performance</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Response Time</span>
                    <span className="text-sm">12m / 15m</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">Exceeding target</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
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

          <Card>
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

          <Card>
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

      <Footer />
    </div>
  );
};

export default Performance;
