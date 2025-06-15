
import React from 'react';
import { BaseWidget } from '../BaseWidget';
import { Calculator, TrendingUp } from 'lucide-react';

interface TaxComparisonWidgetProps {
  onConfigure?: () => void;
  data?: {
    currentYear: number;
    lastYear: number;
    change: number;
  };
}

export const TaxComparisonWidget = ({ onConfigure, data }: TaxComparisonWidgetProps) => {
  const mockData = data || {
    currentYear: 14945,
    lastYear: 12340,
    change: 21.1
  };

  return (
    <BaseWidget 
      title="Year-over-Year Tax Analysis" 
      onConfigure={onConfigure}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Calculator className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">${mockData.currentYear.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Estimated tax 2024</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">2023 Tax</p>
            <p className="font-semibold">${mockData.lastYear.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-600">Change</p>
            <p className={`font-semibold ${mockData.change > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {mockData.change > 0 ? '+' : ''}{mockData.change}%
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <TrendingUp className="w-3 h-3" />
          <span>Based on current earnings trend</span>
        </div>
      </div>
    </BaseWidget>
  );
};
