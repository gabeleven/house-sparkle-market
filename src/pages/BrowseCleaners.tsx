
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, MessageCircle, Filter, Loader2 } from 'lucide-react';
import { useCleaners } from '@/hooks/useCleaners';
import { useLocation } from '@/hooks/useLocation';
import { useMaskedCommunication } from '@/hooks/useMaskedCommunication';
import LocationPermission from '@/components/LocationPermission';
import { useAuth } from '@/hooks/useAuth';

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
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);
  const { user } = useAuth();
  const { location, requestLocation, saveLocation } = useLocation();
  const { cleaners, isLoading, error } = useCleaners({ 
    userLocation: location, 
    searchTerm, 
    locationFilter 
  });
  const { initiateContact, loading: contactLoading } = useMaskedCommunication();

  // Show location prompt on first visit for customers
  useEffect(() => {
    const hasShownPrompt = localStorage.getItem('hasShownLocationPrompt');
    if (user && !hasShownPrompt && !location) {
      setShowLocationPrompt(true);
    }
  }, [user, location]);

  const handleLocationGranted = async (lat: number, lng: number) => {
    await saveLocation(lat, lng);
    setShowLocationPrompt(false);
    localStorage.setItem('hasShownLocationPrompt', 'true');
  };

  const handlePostalCode = (postalCode: string) => {
    // In a real implementation, we'd geocode the postal code
    console.log('Postal code entered:', postalCode);
    setLocationFilter(postalCode);
    setShowLocationPrompt(false);
    localStorage.setItem('hasShownLocationPrompt', 'true');
  };

  const handleDismissLocation = () => {
    setShowLocationPrompt(false);
    localStorage.setItem('hasShownLocationPrompt', 'true');
  };

  const handleContact = async (cleanerId: string) => {
    if (!user) {
      // Redirect to auth page
      window.location.href = '/auth';
      return;
    }
    
    await initiateContact(cleanerId);
  };

  const formatDistance = (distance?: number) => {
    if (!distance) return '';
    if (distance < 1) return '< 1 km';
    return `${distance.toFixed(1)} km`;
  };

  const getDefaultProfilePhoto = (name: string) => {
    // Generate a placeholder based on initials
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=7c3aed&color=fff&size=150`;
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Erreur de chargement
            </h3>
            <p className="text-gray-600">
              Impossible de charger les nettoyeurs. Veuillez réessayer.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Header />
      
      {showLocationPrompt && (
        <LocationPermission
          onLocationGranted={handleLocationGranted}
          onPostalCode={handlePostalCode}
          onDismiss={handleDismissLocation}
        />
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Nettoyeurs disponibles{location ? ' près de vous' : ''}
          </h1>
          <p className="text-gray-600 mb-6">
            Trouvez le professionnel idéal pour vos besoins de nettoyage
          </p>

          {/* Location Status */}
          {location && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center text-green-700">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">Tri par proximité activé</span>
              </div>
            </div>
          )}

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

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            <span>Chargement des nettoyeurs...</span>
          </div>
        )}

        {/* Results */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cleaners.map((cleaner) => (
              <Card key={cleaner.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start space-x-4">
                    <img
                      src={cleaner.profile_photo_url || getDefaultProfilePhoto(cleaner.full_name)}
                      alt={cleaner.full_name}
                      className="w-16 h-16 rounded-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = getDefaultProfilePhoto(cleaner.full_name);
                      }}
                    />
                    <div className="flex-1">
                      <CardTitle className="text-lg">{cleaner.full_name}</CardTitle>
                      {cleaner.business_name && (
                        <CardDescription className="text-sm text-purple-600 font-medium">
                          {cleaner.business_name}
                        </CardDescription>
                      )}
                      <div className="flex items-center mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-medium">Nouveau</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Location and Distance */}
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {cleaner.service_area_city || 'Localisation non spécifiée'}
                    {cleaner.distance && (
                      <>
                        {' • '}
                        <span className="text-green-600 font-medium">
                          {formatDistance(cleaner.distance)}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Services */}
                  {cleaner.services && cleaner.services.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {cleaner.services.map((service) => (
                        <Badge key={service} variant="secondary" className="text-xs">
                          {serviceLabels[service as keyof typeof serviceLabels] || service}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  {cleaner.brief_description && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {cleaner.brief_description}
                    </p>
                  )}

                  {/* Experience and Service Radius */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {cleaner.years_experience ? `${cleaner.years_experience} ans d'expérience` : 'Nouveau professionnel'}
                    </span>
                    {cleaner.service_radius_km && (
                      <span className="text-gray-600">
                        Rayon: {cleaner.service_radius_km}km
                      </span>
                    )}
                  </div>

                  {/* Contact Button */}
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => handleContact(cleaner.id)}
                    disabled={contactLoading}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {contactLoading ? 'Connexion...' : 'Contacter via Housie'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && cleaners.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun nettoyeur trouvé
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || locationFilter 
                ? 'Essayez de modifier vos critères de recherche' 
                : 'Aucun nettoyeur n\'est encore inscrit dans votre région'}
            </p>
            {!searchTerm && !locationFilter && (
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/auth?type=cleaner'}
              >
                Devenir nettoyeur partenaire
              </Button>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BrowseCleaners;
