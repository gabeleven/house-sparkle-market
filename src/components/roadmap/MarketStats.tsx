
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, DollarSign, Shield } from 'lucide-react';

const MarketStats = () => {
  const marketStats = [
    {
      icon: <Users className="w-8 h-8 text-[#d50067]" />,
      title: "2.9M Self-Employed",
      description: "Canadians who need better financial tools"
    },
    {
      icon: <DollarSign className="w-8 h-8 text-[#0067bd]" />,
      title: "6% vs 15-30%",
      description: "Lowest marketplace fees in the industry"
    },
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: "CRA Compliant",
      description: "Built for Canadian tax requirements"
    }
  ];

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-12">Why HOUSIE? Why Now?</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {marketStats.map((stat, index) => (
          <Card key={index} className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-8">
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{stat.title}</h3>
              <p className="text-gray-600">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MarketStats;
