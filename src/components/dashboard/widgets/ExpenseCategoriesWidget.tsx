
import React from 'react';
import { BaseWidget } from '../BaseWidget';
import { Receipt, DollarSign } from 'lucide-react';

interface ExpenseCategoriesWidgetProps {
  onConfigure?: () => void;
  data?: {
    categories: { name: string; amount: number; color: string }[];
    totalExpenses: number;
  };
}

export const ExpenseCategoriesWidget = ({ onConfigure, data }: ExpenseCategoriesWidgetProps) => {
  const mockData = data || {
    categories: [
      { name: 'Supplies', amount: 1247, color: 'bg-blue-500' },
      { name: 'Fuel', amount: 892, color: 'bg-green-500' },
      { name: 'Equipment', amount: 654, color: 'bg-purple-500' },
      { name: 'Insurance', amount: 423, color: 'bg-orange-500' }
    ],
    totalExpenses: 3216
  };

  return (
    <BaseWidget 
      title="Expense Categories" 
      onConfigure={onConfigure}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Receipt className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">${mockData.totalExpenses.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Total expenses</p>
          </div>
        </div>
        
        <div className="space-y-2">
          {mockData.categories.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                <span className="text-sm">{category.name}</span>
              </div>
              <span className="text-sm font-semibold">${category.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </BaseWidget>
  );
};
