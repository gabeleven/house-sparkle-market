
import React from 'react';
import { BaseWidget } from '../BaseWidget';
import { ParkingCircle, AlertTriangle, TrendingDown } from 'lucide-react';

interface ParkyTicketsWidgetProps {
  onConfigure?: () => void;
  data?: {
    ticketCount: number;
    totalFees: number;
    disputeSuccessRate: number;
  };
}

export const ParkyTicketsWidget = ({ onConfigure, data }: ParkyTicketsWidgetProps) => {
  const mockData = data || {
    ticketCount: 3,
    totalFees: 285,
    disputeSuccessRate: 67
  };

  return (
    <BaseWidget 
      title="Parky Parking Analysis" 
      onConfigure={onConfigure}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <ParkingCircle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">{mockData.ticketCount}</p>
            <p className="text-sm text-gray-600">Tickets this year</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Total Fees</p>
            <p className="font-semibold text-red-600">${mockData.totalFees}</p>
          </div>
          <div>
            <p className="text-gray-600">Dispute Success</p>
            <p className="font-semibold text-green-600">{mockData.disputeSuccessRate}%</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <AlertTriangle className="w-3 h-3" />
          <span>Powered by Parky OCR analysis</span>
        </div>
      </div>
    </BaseWidget>
  );
};
