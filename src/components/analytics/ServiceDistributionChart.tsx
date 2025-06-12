
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const serviceData = [
  { name: 'Regular Cleaning', value: 45, color: '#3b82f6' },
  { name: 'Deep Cleaning', value: 30, color: '#10b981' },
  { name: 'Move-in/out', value: 15, color: '#f59e0b' },
  { name: 'Commercial', value: 10, color: '#ef4444' }
];

const chartConfig = {
  service: {
    label: "Service Type",
    color: "hsl(var(--chart-1))",
  },
};

export const ServiceDistributionChart = () => {
  return (
    <ChartContainer config={chartConfig} className="h-64 w-full">
      <PieChart>
        <Pie
          data={serviceData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {serviceData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <ChartTooltip 
          content={<ChartTooltipContent />}
          formatter={(value) => [`${value}%`, 'Percentage']}
        />
      </PieChart>
    </ChartContainer>
  );
};
