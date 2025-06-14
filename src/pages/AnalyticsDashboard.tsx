
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, DollarSign, Calendar } from 'lucide-react';
import { AnalyticsFilter } from '@/components/analytics/AnalyticsFilter';
import { DashboardShortcuts } from '@/components/analytics/DashboardShortcuts';
import { DashboardSearch } from '@/components/analytics/DashboardSearch';
import { DateRange } from 'react-day-picker';
import { isWithinInterval, parseISO } from 'date-fns';

const AnalyticsDashboard = () => {
  const [filters, setFilters] = useState<{
    dateRange?: DateRange;
    serviceType?: string;
    status?: string;
  }>({});
  const [highlightedCategory, setHighlightedCategory] = useState<string>('');

  // Mock data - in real app, this would come from an API
  const mockBookings = [
    { id: 1, date: '2024-01-15', serviceType: 'cleaning', status: 'completed', amount: 120 },
    { id: 2, date: '2024-01-20', serviceType: 'maintenance', status: 'pending', amount: 200 },
    { id: 3, date: '2024-01-25', serviceType: 'cleaning', status: 'confirmed', amount: 150 },
    { id: 4, date: '2024-02-01', serviceType: 'landscaping', status: 'completed', amount: 300 },
    { id: 5, date: '2024-02-05', serviceType: 'cleaning', status: 'cancelled', amount: 0 },
  ];

  const filteredBookings = useMemo(() => {
    return mockBookings.filter(booking => {
      // Date range filter
      if (filters.dateRange?.from && filters.dateRange?.to) {
        const bookingDate = parseISO(booking.date);
        if (!isWithinInterval(bookingDate, {
          start: filters.dateRange.from,
          end: filters.dateRange.to
        })) {
          return false;
        }
      }

      // Service type filter
      if (filters.serviceType && filters.serviceType !== 'all' && booking.serviceType !== filters.serviceType) {
        return false;
      }

      // Status filter
      if (filters.status && filters.status !== 'all' && booking.status !== filters.status) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const stats = useMemo(() => {
    const totalBookings = filteredBookings.length;
    const totalRevenue = filteredBookings.reduce((sum, booking) => sum + booking.amount, 0);
    const completedBookings = filteredBookings.filter(b => b.status === 'completed').length;
    const conversionRate = totalBookings > 0 ? (completedBookings / totalBookings) * 100 : 0;

    return {
      totalBookings,
      totalRevenue,
      completedBookings,
      conversionRate
    };
  }, [filteredBookings]);

  const handleHighlight = (category: string) => {
    setHighlightedCategory(category);
    setTimeout(() => setHighlightedCategory(''), 3000);
  };

  const getCardClassName = (category: string) => {
    return highlightedCategory === category 
      ? 'ring-2 ring-primary ring-offset-2 transition-all duration-300' 
      : '';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Monitor your business performance and insights</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <DashboardSearch onHighlight={handleHighlight} />
        </div>

        {/* Quick Navigation Shortcuts */}
        <div className="mb-8">
          <DashboardShortcuts />
        </div>

        <AnalyticsFilter
          filters={filters}
          onFilterChange={setFilters}
        />

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ${getCardClassName('metrics')}`}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
              <p className="text-xs text-muted-foreground">
                {stats.completedBookings} completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue}</div>
              <p className="text-xs text-muted-foreground">
                From {stats.completedBookings} completed bookings
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.conversionRate.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                Bookings to completion
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className={getCardClassName('recent')}>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredBookings.slice(0, 5).map(booking => (
                  <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{booking.serviceType}</p>
                      <p className="text-sm text-muted-foreground">{booking.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${booking.amount}</p>
                      <p className={`text-sm capitalize ${
                        booking.status === 'completed' ? 'text-green-600' :
                        booking.status === 'pending' ? 'text-yellow-600' :
                        booking.status === 'confirmed' ? 'text-blue-600' :
                        'text-red-600'
                      }`}>
                        {booking.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className={getCardClassName('performance')}>
            <CardHeader>
              <CardTitle>Service Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['cleaning', 'maintenance', 'landscaping'].map(service => {
                  const serviceBookings = filteredBookings.filter(b => b.serviceType === service);
                  const serviceRevenue = serviceBookings.reduce((sum, b) => sum + b.amount, 0);
                  return (
                    <div key={service} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium capitalize">{service}</p>
                        <p className="text-sm text-muted-foreground">{serviceBookings.length} bookings</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${serviceRevenue}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
