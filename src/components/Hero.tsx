
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, Star } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
        }}
      ></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Find Quality
              <span className="block text-blue-200">Cleaning Services</span>
              <span className="block text-white">Near You</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-lg">
              Connect with trusted, vetted cleaning professionals in your area. 
              Book instantly, pay securely, and enjoy a spotless home.
            </p>

            {/* Main CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button 
                size="lg" 
                className="bg-white text-blue-700 hover:bg-blue-50 text-lg px-8 py-4 h-auto font-semibold"
              >
                <Search className="w-5 h-5 mr-2" />
                LOOKING FOR SERVICES
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-blue-700 text-lg px-8 py-4 h-auto font-semibold"
              >
                <Star className="w-5 h-5 mr-2" />
                OFFERING SERVICES
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex justify-center lg:justify-start space-x-8 text-blue-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-sm">Verified Cleaners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">2000+</div>
                <div className="text-sm">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">4.9★</div>
                <div className="text-sm">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Search Preview */}
          <div className="lg:pl-8">
            <Card className="bg-white/95 backdrop-blur shadow-2xl border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Start Your Search
                </h3>
                
                {/* Location Input */}
                <div className="relative mb-4">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Enter your city or zip code"
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                  />
                </div>

                {/* Service Type */}
                <select className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg mb-6">
                  <option>Select cleaning service</option>
                  <option>Regular House Cleaning</option>
                  <option>Deep Cleaning</option>
                  <option>Move-in/Move-out</option>
                  <option>Office Cleaning</option>
                  <option>Post-Construction</option>
                </select>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-4 h-auto font-semibold">
                  <Search className="w-5 h-5 mr-2" />
                  Find Cleaners
                </Button>

                <p className="text-center text-sm text-gray-500 mt-4">
                  Free to search • No hidden fees for customers
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
