
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Target } from 'lucide-react';

const FinTechVision = () => {
  return (
    <Card className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 border-none">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">From Marketplace to Financial Powerhouse</h2>
          <p className="text-lg text-gray-700">
            HOUSIE isn't just connecting customers with service providers - we're building the financial infrastructure 
            for Canadian self-employment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
              The Current Challenge
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Self-employed Canadians pay 15-30% marketplace fees</li>
              <li>• 78% struggle with CRA tax compliance</li>
              <li>• Average 12 hours/month on financial admin</li>
              <li>• $2.3B in missed deductions annually</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-[#d50067]" />
              The HOUSIE Solution
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• 6% transaction fees (industry's lowest)</li>
              <li>• AI-powered CRA compliance automation</li>
              <li>• Complete business intelligence suite</li>
              <li>• Canadian-specific financial tools</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800 text-center italic">
            "We're not just building another app - we're creating the financial backbone for Canadian entrepreneurship. 
            Think Uber for services meets AI business advisor meets CRA compliance wizard." - HOUSIE Team
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinTechVision;
