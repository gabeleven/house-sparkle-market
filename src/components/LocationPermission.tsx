
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, X } from 'lucide-react';

interface LocationPermissionProps {
  onLocationGranted: (lat: number, lng: number) => void;
  onPostalCode: (postalCode: string) => void;
  onDismiss: () => void;
}

const LocationPermission = ({ onLocationGranted, onPostalCode, onDismiss }: LocationPermissionProps) => {
  const [showPostalForm, setShowPostalForm] = useState(false);
  const [postalCode, setPostalCode] = useState('');
  const [loading, setLoading] = useState(false);

  const requestLocation = () => {
    setLoading(true);
    
    if (!navigator.geolocation) {
      setShowPostalForm(true);
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onLocationGranted(position.coords.latitude, position.coords.longitude);
        setLoading(false);
      },
      () => {
        setShowPostalForm(true);
        setLoading(false);
      }
    );
  };

  const handlePostalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postalCode.trim()) {
      onPostalCode(postalCode.trim());
    }
  };

  if (showPostalForm) {
    return (
      <Card className="fixed inset-4 z-50 mx-auto max-w-md top-1/2 transform -translate-y-1/2 shadow-lg">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-2"
            onClick={onDismiss}
          >
            <X className="w-4 h-4" />
          </Button>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Code postal
          </CardTitle>
          <CardDescription>
            Entrez votre code postal pour voir les service providers près de vous
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePostalSubmit} className="space-y-4">
            <Input
              placeholder="H1A 1A1"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              pattern="[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]"
              title="Format: A1A 1A1"
            />
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                Confirmer
              </Button>
              <Button type="button" variant="outline" onClick={onDismiss}>
                Ignorer
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="fixed inset-4 z-50 mx-auto max-w-md top-1/2 transform -translate-y-1/2 shadow-lg">
      <CardHeader className="relative">
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-2"
          onClick={onDismiss}
        >
          <X className="w-4 h-4" />
        </Button>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Trouvez des service providers près de vous
        </CardTitle>
        <CardDescription>
          Autorisez l'accès à votre localisation pour voir les service providers les plus proches
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={requestLocation} 
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Localisation en cours...' : 'Autoriser la localisation'}
        </Button>
        <Button 
          variant="outline" 
          onClick={() => setShowPostalForm(true)}
          className="w-full"
        >
          Utiliser mon code postal
        </Button>
        <Button 
          variant="ghost" 
          onClick={onDismiss}
          className="w-full text-sm"
        >
          Ignorer pour le moment
        </Button>
      </CardContent>
    </Card>
  );
};

export default LocationPermission;
