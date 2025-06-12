
import React from 'react';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Crown, Lock, TrendingUp, Users, Target, Zap, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RevenueChart } from '@/components/analytics/RevenueChart';
import { BookingChart } from '@/components/analytics/BookingChart';
import { PerformanceChart } from '@/components/analytics/PerformanceChart';

const Intelligence = () => {
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
                <Brain className="w-6 h-6 text-purple-600" />
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Market Intelligence</h1>
                <Crown className="w-5 h-5 text-yellow-500" />
              </div>
              <p className="text-muted-foreground">AI-powered insights for market domination</p>
            </div>
          </div>
          
          <Badge variant="destructive" className="whitespace-nowrap">
            Premium Feature
          </Badge>
        </div>

        {/* Premium Gate */}
        <Card className="mb-8 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <h2 className="text-xl font-bold mb-4">Unlock Market Intelligence</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get AI-powered insights into market trends, competitor analysis, pricing optimization, 
              and demand forecasting to stay ahead of the competition.
            </p>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Upgrade to Premium
            </Button>
          </CardContent>
        </Card>

        {/* Feature Preview with Real Charts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="opacity-75">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="truncate">Market Trends</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <RevenueChart />
              </div>
              <p className="text-sm text-muted-foreground">
                Real-time market demand analysis and seasonal trend predictions for your service area.
              </p>
            </CardContent>
          </Card>

          <Card className="opacity-75">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="truncate">Competitor Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <BookingChart />
              </div>
              <p className="text-sm text-muted-foreground">
                Compare your pricing, availability, and customer satisfaction against local competitors.
              </p>
            </CardContent>
          </Card>

          <Card className="opacity-75">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-600" />
                <span className="truncate">Performance Optimization</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <PerformanceChart />
              </div>
              <p className="text-sm text-muted-foreground">
                AI-recommended strategies to maximize your earnings while maintaining high quality.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Coming Soon Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-600" />
              <span className="truncate">Coming Soon to Premium</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Demand Forecasting</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Predict busy periods up to 3 months ahead</li>
                  <li>• Seasonal demand patterns analysis</li>
                  <li>• Event-based demand spikes prediction</li>
                  <li>• Optimal schedule recommendations</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold">Customer Behavior Insights</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Customer lifetime value analysis</li>
                  <li>• Churn prediction and prevention</li>
                  <li>• Service preference patterns</li>
                  <li>• Optimal communication timing</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Intelligence;
