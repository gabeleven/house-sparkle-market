
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const RoadmapCTA = () => {
  return (
    <Card className="bg-gradient-to-r from-[#d50067] to-[#0067bd] text-white">
      <CardContent className="text-center p-12">
        <h2 className="text-3xl font-bold mb-4">Ready to Build the Future Together?</h2>
        <p className="text-xl mb-8 opacity-90">
          Join Canada's most innovative platform for self-employed professionals. 
          From marketplace to fintech powerhouse - we're just getting started.
        </p>
        <div className="flex justify-center space-x-4">
          <Button size="lg" variant="secondary">
            Start Free Today
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#d50067]">
            View Pricing
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoadmapCTA;
