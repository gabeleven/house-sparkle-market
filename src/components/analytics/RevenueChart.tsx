
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const revenueData = [
  { month: 'Jul', revenue: 22000 },
  { month: 'Aug', revenue: 24500 },
  { month: 'Sep', revenue: 26000 },
  { month: 'Oct', revenue: 27200 },
  { month: 'Nov', revenue: 28750 },
  { month: 'Dec', revenue: 29500 }
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
};

export const RevenueChart = () => {
  return (
    <ChartContainer config={chartConfig} className="h-64 w-full">
      <LineChart data={revenueData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip 
          content={<ChartTooltipContent />}
          formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
        />
        <Line 
          type="monotone" 
          dataKey="revenue" 
          stroke="#3b82f6" 
          strokeWidth={2}
          dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
        />
      </LineChart>
    </ChartContainer>
  );
};
