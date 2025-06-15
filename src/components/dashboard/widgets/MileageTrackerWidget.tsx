
import React from 'react';
import { BaseWidget } from '../BaseWidget';
import { Car, TrendingUp } from 'lucide-react';

interface MileageTrackerWidgetProps {
  onConfigure?: () => void;
  data?: {
    monthlyMileage: number;
    totalMileage: number;
    deductibleAmount: number;
  };
}

export const MileageTrackerWidget = ({ onConfigure, data }: MileageTrackerWidgetProps) => {
  const mockData = data || {
    monthlyMileage: 1247,
    totalMileage: 14865,
    deductibleAmount: 8919
  };

  return (
    <BaseWidget 
      title="Mileage Tracking" 
      onConfigure={onConfigure}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Car className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">{mockData.monthlyMileage.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Miles this month</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Total Miles</p>
            <p className="font-semibold">{mockData.totalMileage.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-600">Tax Deductible</p>
            <p className="font-semibold text-green-600">${mockData.deductibleAmount.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-xs text-green-600">
          <TrendingUp className="w-3 h-3" />
          <span>+12% from last month</span>
        </div>
      </div>
    </BaseWidget>
  );
};
