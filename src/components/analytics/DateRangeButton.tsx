
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { useAnalytics } from '@/contexts/AnalyticsContext';

export const DateRangeButton: React.FC = () => {
  const { filters, applyDateRange } = useAnalytics();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleDateRangeSelect = (range: DateRange | undefined) => {
    applyDateRange(range);
    if (range?.from && range?.to) {
      setIsOpen(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-start text-left font-normal bg-white/80 shadow-md hover:shadow-lg transition-shadow duration-300">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {filters.dateRange?.from ? (
            filters.dateRange.to ? (
              <>
                {format(filters.dateRange.from, "LLL dd, y")} -{" "}
                {format(filters.dateRange.to, "LLL dd, y")}
              </>
            ) : (
              format(filters.dateRange.from, "LLL dd, y")
            )
          ) : (
            <span>Date Range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={filters.dateRange?.from}
          selected={filters.dateRange}
          onSelect={handleDateRangeSelect}
          numberOfMonths={2}
          className="pointer-events-auto"
        />
      </PopoverContent>
    </Popover>
  );
};
