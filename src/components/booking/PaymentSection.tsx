
import React from 'react';
import { CreditCard } from 'lucide-react';

export const PaymentSection: React.FC = () => {
  return (
    <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
      <div className="flex items-center space-x-2 mb-2">
        <CreditCard className="w-5 h-5 text-blue-600" />
        <h3 className="font-medium text-blue-900 dark:text-blue-100">Payment</h3>
      </div>
      <p className="text-sm text-blue-700 dark:text-blue-300">
        Secure payment with Stripe integration coming soon. 
        For now, payment will be arranged directly with your cleaner.
      </p>
    </div>
  );
};
