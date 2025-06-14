
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Rocket, 
  Target, 
  TrendingUp, 
  Shield, 
  Brain, 
  Zap,
  MapPin,
  Clock,
  DollarSign,
  FileText,
  Calendar,
  Users,
  Smartphone,
  CreditCard,
  BarChart3,
  Scan,
  Car
} from 'lucide-react';

const Roadmap = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white text-foreground">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
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

        {/* Market Stats */}
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

        {/* Fintech Vision Section */}
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

        {/* Development Roadmap */}
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

        {/* Call to Action */}
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
      </div>
    </div>
  );
};

export default Roadmap;
