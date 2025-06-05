
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Phone, MessageCircle, Filter } from 'lucide-react';

// Mock data for cleaners
const mockCleaners = [
  {
    id: '1',
    name: 'Marie Dubois',
    businessName: 'Nettoyage Pro MTL',
    rating: 4.8,
    reviewCount: 127,
    services: ['regular_cleaning', 'deep_cleaning'],
    yearsExperience: 8,
    description: 'Service de nettoyage professionnel avec 8 ans d\'expérience. Spécialisée dans le nettoyage résidentiel.',
    location: 'Plateau Mont-Royal',
    distance: '2.1 km',
    profilePhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    priceRange: '25-35$/h'
  },
  {
    id: '2',
    name: 'Jean Tremblay',
    businessName: 'CleanTeam Montréal',
    rating: 4.9,
    reviewCount: 89,
    services: ['commercial', 'post_construction'],
    yearsExperience: 12,
    description: 'Expert en nettoyage commercial et post-construction. Équipe professionnelle et équipement moderne.',
    location: 'Centre-ville',
    distance: '3.5 km',
    profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    priceRange: '35-50$/h'
  },
  {
    id: '3',
    name: 'Sophie Martin',
    businessName: 'Éclat Ménage',
    rating: 4.7,
    reviewCount: 156,
    services: ['regular_cleaning', 'deep_cleaning', 'move_in_out'],
    yearsExperience: 5,
    description: 'Service personnalisé et éco-responsable. Produits naturels et attention aux détails.',
    location: 'Rosemont',
    distance: '4.2 km',
    profilePhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    priceRange: '30-40$/h'
  }
];

const serviceLabels = {
  regular_cleaning: 'Nettoyage régulier',
  deep_cleaning: 'Grand nettoyage',
  move_in_out: 'Déménagement',
  post_construction: 'Post-construction',
  commercial: 'Commercial'
};

const BrowseCleaners = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [filteredCleaners, setFilteredCleaners] = useState(mockCleaners);

  useEffect(() => {
    let filtered = mockCleaners;

    if (searchTerm) {
      filtered = filtered.filter(cleaner => 
        cleaner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cleaner.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cleaner.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (locationFilter) {
      filtered = filtered.filter(cleaner => 
        cleaner.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    setFilteredCleaners(filtered);
  }, [searchTerm, locationFilter]);

  const handleContact = (cleanerId: string, method: 'phone' | 'message') => {
    // This would trigger the masked communication system
    console.log(`Contacting cleaner ${cleanerId} via ${method}`);
    alert(`Communication masquée initiée avec le nettoyeur (${method})`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Nettoyeurs disponibles près de vous
          </h1>
          <p className="text-gray-600 mb-6">
            Trouvez le professionnel idéal pour vos besoins de nettoyage
          </p>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Rechercher par nom, entreprise ou service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="md:w-64">
              <Input
                placeholder="Filtrer par localisation..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full"
              />
            </div>
            <Button variant="outline" className="md:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Filtres avancés
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCleaners.map((cleaner) => (
            <Card key={cleaner.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={cleaner.profilePhoto}
                    alt={cleaner.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <CardTitle className="text-lg">{cleaner.name}</CardTitle>
                    <CardDescription className="text-sm text-purple-600 font-medium">
                      {cleaner.businessName}
                    </CardDescription>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">{cleaner.rating}</span>
                      <span className="ml-1 text-sm text-gray-500">({cleaner.reviewCount})</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Location and Distance */}
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  {cleaner.location} • {cleaner.distance}
                </div>

                {/* Services */}
                <div className="flex flex-wrap gap-1">
                  {cleaner.services.map((service) => (
                    <Badge key={service} variant="secondary" className="text-xs">
                      {serviceLabels[service as keyof typeof serviceLabels]}
                    </Badge>
                  ))}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-2">
                  {cleaner.description}
                </p>

                {/* Experience and Price */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {cleaner.yearsExperience} ans d'expérience
                  </span>
                  <span className="font-medium text-green-600">
                    {cleaner.priceRange}
                  </span>
                </div>

                {/* Contact Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleContact(cleaner.id, 'phone')}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Appeler
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                    onClick={() => handleContact(cleaner.id, 'message')}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCleaners.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun nettoyeur trouvé
            </h3>
            <p className="text-gray-600">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BrowseCleaners;
