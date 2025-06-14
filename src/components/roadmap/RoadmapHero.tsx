
import React from 'react';
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';

const RoadmapHero = () => {
  return (
    <div className="text-center mb-16">
      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#d50067] to-[#0067bd] text-white px-6 py-2 rounded-full mb-6">
        <Rocket className="w-5 h-5" />
        <span className="font-semibold">HOUSIE ROADMAP 2025-2026</span>
      </div>
      
      <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#d50067] to-[#0067bd] bg-clip-text text-transparent">
        The Financial Platform for Canadian Self-Employment
      </h1>
      
      <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
        From marketplace to fintech powerhouse. We're building the complete ecosystem that Canada's 2.9 million 
        self-employed professionals need to thrive - starting with services, evolving into the ultimate business intelligence platform.
      </p>

      <div className="flex justify-center space-x-4">
        <Button size="lg" className="bg-[#d50067] hover:bg-[#b8005a]">
          Start Your Journey
        </Button>
        <Button size="lg" variant="outline">
          View Demo
        </Button>
      </div>
    </div>
  );
};

export default RoadmapHero;
