
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const bookingData = [
  { month: 'Jul', bookings: 98 },
  { month: 'Aug', bookings: 112 },
  { month: 'Sep', bookings: 119 },
  { month: 'Oct', bookings: 124 },
  { month: 'Nov', bookings: 127 },
  { month: 'Dec', bookings: 135 }
];

const chartConfig = {
  bookings: {
    label: "Bookings",
    color: "hsl(var(--chart-2))",
  },
};

export const BookingChart = () => {
  return (
    <ChartContainer config={chartConfig} className="h-64 w-full">
      <BarChart data={bookingData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip 
          content={<ChartTooltipContent />}
          formatter={(value) => [`${value}`, 'Bookings']}
        />
        <Bar dataKey="bookings" fill="#10b981" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
};
