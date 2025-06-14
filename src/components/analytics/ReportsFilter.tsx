
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

interface ReportsFilterProps {
  onFilterChange: (filters: { dateRange?: DateRange; reportType?: string }) => void;
}

export const ReportsFilter: React.FC<ReportsFilterProps> = ({ onFilterChange }) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [reportType, setReportType] = useState<string>('all');
  const [isDateOpen, setIsDateOpen] = useState(false);

  const handleDateRangeSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    onFilterChange({ dateRange: range, reportType });
    if (range?.from && range?.to) {
      setIsDateOpen(false);
    }
  };

  const handleReportTypeChange = (type: string) => {
    setReportType(type);
    onFilterChange({ dateRange, reportType: type });
  };

  return (
    <div className="flex gap-2 flex-wrap">
      <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="justify-start text-left font-normal bg-white/80">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
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
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={handleDateRangeSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      <Select value={reportType} onValueChange={handleReportTypeChange}>
        <SelectTrigger className="w-48 bg-white/80">
          <Filter className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Report Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Reports</SelectItem>
          <SelectItem value="tax">Tax Documents</SelectItem>
          <SelectItem value="income">Income Reports</SelectItem>
          <SelectItem value="quarterly">Quarterly Reports</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
