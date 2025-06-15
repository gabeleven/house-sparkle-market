
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { MapPin, ChevronDown, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useCitySelection, CanadianCity } from '@/hooks/useCitySelection';
import { useRealDataSources } from '@/hooks/useRealDataSources';

export const CitySelector = () => {
  const { selectedCity, updateSelectedCity, getCitiesByProvince } = useCitySelection();
  const { businessData } = useRealDataSources(selectedCity);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const citiesByProvince = getCitiesByProvince();
  
  // Filter cities based on search term
  const filteredCitiesByProvince = Object.entries(citiesByProvince).reduce((acc, [province, cities]) => {
    const filteredCities = cities.filter(city =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      province.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (filteredCities.length > 0) {
      acc[province] = filteredCities;
    }
    
    return acc;
  }, {} as Record<string, CanadianCity[]>);

  const handleCitySelect = (city: CanadianCity) => {
    updateSelectedCity(city);
    setIsOpen(false);
    setSearchTerm('');
  };

  const getDataSourceBadge = () => {
    if (!businessData) return null;

    const { dataSource } = businessData;
    let badgeClass = '';
    let badgeText = '';

    switch (dataSource.source) {
      case 'real-time':
        badgeClass = 'bg-green-100 text-green-800';
        badgeText = 'Live Data';
        break;
      case 'historical':
        badgeClass = 'bg-blue-100 text-blue-800';
        badgeText = 'Historical';
        break;
      case 'projected':
        badgeClass = 'bg-yellow-100 text-yellow-800';
        badgeText = 'Projected';
        break;
      case 'estimated':
        badgeClass = 'bg-orange-100 text-orange-800';
        badgeText = 'Estimated';
        break;
      case 'collecting':
        badgeClass = 'bg-gray-100 text-gray-800';
        badgeText = 'Collecting';
        break;
      default:
        badgeClass = 'bg-gray-100 text-gray-800';
        badgeText = 'No Data';
    }

    return (
      <Badge className={`${badgeClass} shadow-md backdrop-blur-sm`}>
        {badgeText}
      </Badge>
    );
  };

  return (
    <div className="flex gap-2">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="bg-white/90 shadow-md backdrop-blur-sm border-gray-200 hover:bg-white/95 transition-all duration-200"
          >
            <MapPin className="w-4 h-4 mr-1" />
            {selectedCity.name}, {selectedCity.code}
            <ChevronDown className="w-4 h-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="w-80 max-h-96 overflow-y-auto">
          <div className="p-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          
          <DropdownMenuSeparator />
          
          {Object.entries(filteredCitiesByProvince).map(([province, cities]) => (
            <div key={province}>
              <DropdownMenuLabel className="text-xs font-medium text-gray-500">
                {province}
              </DropdownMenuLabel>
              {cities.map((city) => (
                <DropdownMenuItem
                  key={`${city.name}-${city.province}`}
                  onClick={() => handleCitySelect(city)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center">
                    <MapPin className="w-3 h-3 mr-2 text-gray-400" />
                    <span>{city.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {city.population ? `${(city.population / 1000).toFixed(0)}k` : ''}
                  </span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      {getDataSourceBadge()}
    </div>
  );
};
