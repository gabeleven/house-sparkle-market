
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DateRangeFilter } from './DateRangeFilter';
import { Filter } from 'lucide-react';
import { DateRange } from 'react-day-picker';

interface AnalyticsFilterProps {
  onFilterChange: (filters: {
    dateRange?: DateRange;
    serviceType?: string;
    status?: string;
  }) => void;
  filters: {
    dateRange?: DateRange;
    serviceType?: string;
    status?: string;
  };
}

export const AnalyticsFilter: React.FC<AnalyticsFilterProps> = ({
  onFilterChange,
  filters
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDateRangeChange = (dateRange: DateRange | undefined) => {
    onFilterChange({ ...filters, dateRange });
  };

  const handleServiceTypeChange = (serviceType: string) => {
    onFilterChange({ ...filters, serviceType });
  };

  const handleStatusChange = (status: string) => {
    onFilterChange({ ...filters, status });
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Hide' : 'Show'} Filters
          </Button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <DateRangeFilter
                dateRange={filters.dateRange}
                onDateRangeChange={handleDateRangeChange}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Service Type</label>
              <Select value={filters.serviceType} onValueChange={handleServiceTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="All services" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="landscaping">Landscaping</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={filters.status} onValueChange={handleStatusChange}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
