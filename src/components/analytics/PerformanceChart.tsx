
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const performanceData = [
  { month: 'Jul', efficiency: 87, satisfaction: 92 },
  { month: 'Aug', efficiency: 89, satisfaction: 93 },
  { month: 'Sep', efficiency: 91, satisfaction: 94 },
  { month: 'Oct', efficiency: 90, satisfaction: 95 },
  { month: 'Nov', efficiency: 92, satisfaction: 94 },
  { month: 'Dec', efficiency: 94, satisfaction: 96 }
];

const chartConfig = {
  efficiency: {
    label: "Efficiency",
    color: "hsl(var(--chart-1))",
  },
  satisfaction: {
    label: "Satisfaction",
    color: "hsl(var(--chart-2))",
  },
};

export const PerformanceChart = () => {
  return (
    <ChartContainer config={chartConfig} className="h-64 w-full">
      <AreaChart data={performanceData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip 
          content={<ChartTooltipContent />}
          formatter={(value, name) => [`${value}%`, name === 'efficiency' ? 'Efficiency' : 'Satisfaction']}
        />
        <Area
          type="monotone"
          dataKey="efficiency"
          stroke="#3b82f6"
          fill="#3b82f680"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="satisfaction"
          stroke="#10b981"
          fill="#10b98180"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  );
};
