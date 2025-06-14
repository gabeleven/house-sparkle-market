
import React from 'react';
import RoadmapHero from '@/components/roadmap/RoadmapHero';
import MarketStats from '@/components/roadmap/MarketStats';
import FinTechVision from '@/components/roadmap/FinTechVision';
import RoadmapItems from '@/components/roadmap/RoadmapItems';
import RoadmapCTA from '@/components/roadmap/RoadmapCTA';

const Roadmap = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-orange-200 to-yellow-300 text-foreground">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <RoadmapHero />
        <MarketStats />
        <FinTechVision />
        <RoadmapItems />
        <RoadmapCTA />
      </div>
    </div>
  );
};

export default Roadmap;
