
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format, addDays, isToday, isTomorrow } from 'date-fns';
import { CalendarIcon, Clock } from 'lucide-react';

interface DateTimeSelectorProps {
  selectedDate?: Date;
  onDateSelect: (date: Date | undefined) => void;
  selectedTime: string;
  onTimeSelect: (time: string) => void;
}

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', 
  '12:00', '13:00', '14:00', '15:00', 
  '16:00', '17:00', '18:00'
];

export const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({
  selectedDate,
  onDateSelect,
  selectedTime,
  onTimeSelect
}) => {
  const today = new Date();
  const minDate = today;
  const maxDate = addDays(today, 30);

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'MMM d');
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CalendarIcon className="w-5 h-5" />
            Select Date & Time
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Date Selection */}
          <div>
            <h4 className="font-medium mb-3">Choose Date</h4>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={onDateSelect}
              disabled={(date) => 
                date < today || date > maxDate
              }
              className="rounded-md border"
            />
            {selectedDate && (
              <p className="text-sm text-muted-foreground mt-2">
                Selected: {getDateLabel(selectedDate)}, {format(selectedDate, 'EEEE, MMMM d, yyyy')}
              </p>
            )}
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Choose Time
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => {
                  const isSelected = selectedTime === time;
                  const isPastTime = isToday(selectedDate) && 
                    new Date().getHours() >= parseInt(time.split(':')[0]);
                  
                  return (
                    <Button
                      key={time}
                      variant={isSelected ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => onTimeSelect(time)}
                      disabled={isPastTime}
                      className={`text-sm ${
                        isSelected ? 'bg-purple-600 hover:bg-purple-700' : ''
                      } ${isPastTime ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {time}
                    </Button>
                  );
                })}
              </div>
              {selectedTime && (
                <p className="text-sm text-muted-foreground mt-2">
                  Selected time: {selectedTime}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
