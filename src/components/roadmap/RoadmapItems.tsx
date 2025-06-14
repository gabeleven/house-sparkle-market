
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users,
  Smartphone,
  BarChart3,
  Brain,
  Rocket
} from 'lucide-react';

const RoadmapItems = () => {
  const roadmapItems = [
    {
      phase: "Phase 1",
      title: "Service Marketplace",
      status: "LIVE",
      timeline: "Q1 2025",
      icon: <Users className="w-6 h-6" />,
      description: "Multi-service marketplace foundation",
      features: [
        "Multi-service categories (Cleaning, Lawn/Snow, Construction, Wellness, Pets)",
        "Provider profiles with ratings and portfolios",
        "Service area mapping and filtering",
        "Basic booking and messaging system"
      ],
      joke: "Where Canadian self-employed heroes find their customers (and customers find heroes who actually show up)."
    },
    {
      phase: "Phase 2", 
      title: "Mobile & Payments",
      status: "BETA",
      timeline: "Q2 2025",
      icon: <Smartphone className="w-6 h-6" />,
      description: "Native mobile experience with secure payments",
      features: [
        "Native mobile app (iOS & Android)",
        "Stripe escrow payment system",
        "Photo verification for completed work",
        "Real-time booking notifications"
      ],
      joke: "Because managing your business from your phone shouldn't feel like solving a Rubik's cube blindfolded."
    },
    {
      phase: "Phase 3",
      title: "Business Intelligence",
      status: "COMING Q3 2025",
      timeline: "Q3 2025",
      icon: <BarChart3 className="w-6 h-6" />,
      description: "Tax automation and business insights",
      features: [
        "Automated GST/HST tracking",
        "Expense categorization and tracking",
        "CRA-ready quarterly reports",
        "Basic market demand analytics"
      ],
      joke: "Making tax season less scary than a Toronto housing market report."
    },
    {
      phase: "Phase 4",
      title: "Advanced AI Suite",
      status: "COMING Q4 2025",
      timeline: "Q4 2025",
      icon: <Brain className="w-6 h-6" />,
      description: "AI-powered business optimization",
      features: [
        "OCR invoice scanner with auto-categorization",
        "Custom expense tracking widgets",
        "Parking ticket verification system",
        "Smart business notifications and alerts"
      ],
      joke: "Our AI is so smart, it can probably dispute your parking tickets better than you can (and definitely better than that lawyer cousin who 'knows stuff')."
    },
    {
      phase: "Phase 5",
      title: "Platform Evolution",
      status: "COMING Q1 2026",
      timeline: "Q1 2026",
      icon: <Rocket className="w-6 h-6" />,
      description: "Complete business ecosystem",
      features: [
        "Predictive market analytics",
        "Weather-based scheduling optimization",
        "White-label licensing platform",
        "Advanced enterprise features"
      ],
      joke: "By this point, HOUSIE will know your business better than you do (but in a helpful way, not a creepy surveillance way)."
    }
  ];

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-12">5-Phase Development Strategy</h2>
      
      <div className="space-y-8">
        {roadmapItems.map((item, index) => (
          <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#d50067] to-[#0067bd]"></div>
            
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex items-center space-x-3">
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                      <Badge 
                        variant={item.status === 'LIVE' ? 'default' : item.status === 'BETA' ? 'secondary' : 'outline'}
                        className={item.status === 'LIVE' ? 'bg-green-500' : ''}
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{item.phase} • {item.timeline}</p>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-gray-700 mb-4">{item.description}</p>
              
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Key Features:</h4>
                <ul className="space-y-1">
                  {item.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm text-gray-600 flex items-center">
                      <span className="w-1.5 h-1.5 bg-[#d50067] rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-700 italic">💡 {item.joke}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoadmapItems;
