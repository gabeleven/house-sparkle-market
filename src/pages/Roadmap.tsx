
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
  Users
} from 'lucide-react';

const Roadmap = () => {
  const roadmapItems = [
    {
      phase: "Phase 1",
      title: "Tax Revolution",
      status: "LIVE",
      icon: <Shield className="w-6 h-6" />,
      description: "Making CRA compliance as easy as ordering poutine",
      features: [
        "Automated GST/HST tracking",
        "Real-time tax calculations", 
        "Quarterly report generation",
        "Direct CRA filing integration"
      ],
      joke: "Because nobody wants to explain to Revenue Canada why they forgot to track that $5 Tim Hortons receipt... again."
    },
    {
      phase: "Phase 2", 
      title: "AI-Powered Intelligence",
      status: "BETA",
      icon: <Brain className="w-6 h-6" />,
      description: "Smarter than your accountant's calculator",
      features: [
        "Market demand prediction",
        "Pricing optimization AI",
        "Weather-based scheduling",
        "Tax optimization recommendations"
      ],
      joke: "Our AI is so smart, it probably knows more about Canadian tax law than most humans (and definitely more than that one friend who 'knows about taxes')."
    },
    {
      phase: "Phase 3",
      title: "Banking & Payments",
      status: "COMING Q2 2025",
      icon: <DollarSign className="w-6 h-6" />,
      description: "Your money, managed like a pro",
      features: [
        "Integrated business banking",
        "Instant payment processing",
        "Expense categorization",
        "Investment recommendations"
      ],
      joke: "Finally, a bank account that understands the difference between 'business lunch' and 'I was really hungry after cleaning Mrs. Johnson's basement'."
    },
    {
      phase: "Phase 4",
      title: "Marketplace Evolution",
      status: "COMING Q4 2025",
      icon: <Users className="w-6 h-6" />,
      description: "The Uber of everything (but better)",
      features: [
        "Multi-service marketplace",
        "Advanced matching algorithms",
        "Insurance integration",
        "Performance analytics"
      ],
      joke: "Like Uber, but for people who actually know what they're doing with a mop."
    }
  ];

  const visionPoints = [
    {
      icon: <MapPin className="w-8 h-8 text-[#d50067]" />,
      title: "Coast to Coast",
      description: "From St. John's to Victoria, every self-employed Canadian deserves financial freedom"
    },
    {
      icon: <Zap className="w-8 h-8 text-[#0067bd]" />,
      title: "Lightning Fast",
      description: "Tax compliance faster than you can say 'double-double'"
    },
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: "CRA Approved",
      description: "We speak fluent bureaucracy so you don't have to"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white text-foreground">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#d50067] to-[#0067bd] text-white px-6 py-2 rounded-full mb-6">
            <Rocket className="w-5 h-5" />
            <span className="font-semibold">HOUSIE ROADMAP 2025</span>
          </div>
          
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#d50067] to-[#0067bd] bg-clip-text text-transparent">
            Revolutionizing Self-Employment
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We're not just another app. We're the financial backbone for Canada's 2.9 million self-employed heroes. 
            From house cleaners to handypeople, we're making taxes, payments, and business management as Canadian as maple syrup.
          </p>

          <div className="flex justify-center space-x-4">
            <Button size="lg" className="bg-[#d50067] hover:bg-[#b8005a]">
              Join the Revolution
            </Button>
            <Button size="lg" variant="outline">
              View Demo
            </Button>
          </div>
        </div>

        {/* Vision Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Vision</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {visionPoints.map((point, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-8">
                  <div className="flex justify-center mb-4">
                    {point.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{point.title}</h3>
                  <p className="text-gray-600">{point.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Why FinTech Section */}
        <Card className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 border-none">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Why FinTech? Why Now?</h2>
              <p className="text-lg text-gray-700">
                Because self-employed Canadians deserve better than Excel spreadsheets and shoeboxes full of receipts.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                  The Problem
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 78% of self-employed Canadians struggle with tax compliance</li>
                  <li>• Average 12 hours/month spent on financial admin</li>
                  <li>• $2.3B in missed deductions annually</li>
                  <li>• Complex CRA requirements = stress and penalties</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-[#d50067]" />
                  Our Solution
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• AI-powered tax automation</li>
                  <li>• Real-time financial insights</li>
                  <li>• Integrated banking & payments</li>
                  <li>• CRA-compliant by design</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800 text-center italic">
                "Fun fact: The average Canadian self-employed person spends more time doing taxes than watching hockey. 
                That's not just wrong, it's un-Canadian." - Our CEO (probably)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Roadmap Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Development Roadmap</h2>
          
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
                        <p className="text-sm text-gray-500">{item.phase}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-700 mb-4">{item.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
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
            <h2 className="text-3xl font-bold mb-4">Ready to Join the Future?</h2>
            <p className="text-xl mb-8 opacity-90">
              Stop fighting with spreadsheets. Start building your empire.
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" variant="secondary">
                Get Early Access
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#d50067]">
                Schedule Demo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Roadmap;
