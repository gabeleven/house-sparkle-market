
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/useAuth';
import { 
  validatePhone, 
  validatePostalCode, 
  validateEmail,
  validateHourlyRate, 
  validateYearsExperience,
  formatPhoneNumber,
  formatPostalCode 
} from '@/utils/validation';

interface SignupFormProps {
  userType: string;
  onSwitchToLogin: () => void;
}

const SignupForm = ({ userType, onSwitchToLogin }: SignupFormProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    // Cleaner specific fields
    businessName: '',
    serviceAreaCity: '',
    serviceAreaPostalCode: '',
    yearsExperience: '',
    briefDescription: '',
    // Customer specific fields
    serviceLocationAddress: '',
    serviceLocationPostalCode: '',
    preferredContactMethod: 'email'
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const serviceTypes = [
    { id: 'regular_cleaning', label: 'Nettoyage régulier' },
    { id: 'deep_cleaning', label: 'Grand nettoyage' },
    { id: 'move_in_out', label: 'Déménagement' },
    { id: 'post_construction', label: 'Post-construction' },
    { id: 'commercial', label: 'Commercial' }
  ];

  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};

    if (!validateEmail(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!validatePhone(formData.phoneNumber)) {
      errors.phoneNumber = "Invalid phone number format";
    }

    if (userType === 'cleaner') {
      if (formData.serviceAreaPostalCode && !validatePostalCode(formData.serviceAreaPostalCode)) {
        errors.serviceAreaPostalCode = "Invalid postal code format (e.g., H1A 1A1)";
      }

      if (formData.yearsExperience && !validateYearsExperience(parseInt(formData.yearsExperience))) {
        errors.yearsExperience = "Years of experience must be between 0 and 50";
      }
    } else {
      if (formData.serviceLocationPostalCode && !validatePostalCode(formData.serviceLocationPostalCode)) {
        errors.serviceLocationPostalCode = "Invalid postal code format (e.g., H1A 1A1)";
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'phoneNumber') {
      value = formatPhoneNumber(value);
    } else if (field === 'serviceAreaPostalCode' || field === 'serviceLocationPostalCode') {
      value = formatPostalCode(value);
    }
    
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setValidationErrors({ confirmPassword: 'Les mots de passe ne correspondent pas' });
      return;
    }

    if (userType === 'cleaner' && selectedServices.length === 0) {
      setValidationErrors({ services: 'Veuillez sélectionner au moins un service' });
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const userData = {
      full_name: formData.fullName,
      user_role: userType,
      phone_number: formData.phoneNumber,
      ...(userType === 'cleaner' ? {
        business_name: formData.businessName,
        service_area_city: formData.serviceAreaCity,
        service_area_postal_code: formData.serviceAreaPostalCode,
        years_experience: parseInt(formData.yearsExperience) || 0,
        brief_description: formData.briefDescription,
        services: selectedServices
      } : {
        service_location_address: formData.serviceLocationAddress,
        service_location_postal_code: formData.serviceLocationPostalCode,
        preferred_contact_method: formData.preferredContactMethod
      })
    };

    const { error } = await signUp(formData.email, formData.password, userData);
    
    if (!error) {
      // Show success message and redirect to login
      setTimeout(() => {
        onSwitchToLogin();
      }, 2000);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Common fields */}
      <div className="space-y-2">
        <Label htmlFor="fullName">Nom complet</Label>
        <Input
          id="fullName"
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          required
          placeholder="Jean Dupont"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          required
          placeholder="jean@example.com"
        />
        {validationErrors.email && (
          <p className="text-sm text-destructive">{validationErrors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Mot de passe</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          required
          placeholder="••••••••"
          minLength={6}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          required
          placeholder="••••••••"
        />
        {validationErrors.confirmPassword && (
          <p className="text-sm text-destructive">{validationErrors.confirmPassword}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Numéro de téléphone</Label>
        <Input
          id="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
          placeholder="(514) 123-4567"
        />
        {validationErrors.phoneNumber && (
          <p className="text-sm text-destructive">{validationErrors.phoneNumber}</p>
        )}
      </div>

      {/* Cleaner specific fields */}
      {userType === 'cleaner' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="businessName">Nom d'entreprise (optionnel)</Label>
            <Input
              id="businessName"
              value={formData.businessName}
              onChange={(e) => handleInputChange('businessName', e.target.value)}
              placeholder="Nettoyage Pro Inc."
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label htmlFor="serviceAreaCity">Ville de service</Label>
              <Input
                id="serviceAreaCity"
                value={formData.serviceAreaCity}
                onChange={(e) => handleInputChange('serviceAreaCity', e.target.value)}
                required
                placeholder="Montréal"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceAreaPostalCode">Code postal</Label>
              <Input
                id="serviceAreaPostalCode"
                value={formData.serviceAreaPostalCode}
                onChange={(e) => handleInputChange('serviceAreaPostalCode', e.target.value)}
                required
                placeholder="H1A 1A1"
              />
              {validationErrors.serviceAreaPostalCode && (
                <p className="text-sm text-destructive">{validationErrors.serviceAreaPostalCode}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Services offerts</Label>
            <div className="grid grid-cols-1 gap-2">
              {serviceTypes.map((service) => (
                <div key={service.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={service.id}
                    checked={selectedServices.includes(service.id)}
                    onCheckedChange={() => handleServiceToggle(service.id)}
                  />
                  <Label htmlFor={service.id} className="text-sm">{service.label}</Label>
                </div>
              ))}
            </div>
            {validationErrors.services && (
              <p className="text-sm text-destructive">{validationErrors.services}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="yearsExperience">Années d'expérience</Label>
            <Input
              id="yearsExperience"
              type="number"
              value={formData.yearsExperience}
              onChange={(e) => handleInputChange('yearsExperience', e.target.value)}
              min="0"
              max="50"
              placeholder="5"
            />
            {validationErrors.yearsExperience && (
              <p className="text-sm text-destructive">{validationErrors.yearsExperience}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="briefDescription">Brève description</Label>
            <Textarea
              id="briefDescription"
              value={formData.briefDescription}
              onChange={(e) => handleInputChange('briefDescription', e.target.value)}
              placeholder="Décrivez vos services et votre expérience..."
              rows={3}
            />
          </div>
        </>
      )}

      {/* Customer specific fields */}
      {userType === 'customer' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="serviceLocationAddress">Adresse de service</Label>
            <Input
              id="serviceLocationAddress"
              value={formData.serviceLocationAddress}
              onChange={(e) => handleInputChange('serviceLocationAddress', e.target.value)}
              placeholder="123 Rue Saint-Denis, Montréal"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceLocationPostalCode">Code postal</Label>
            <Input
              id="serviceLocationPostalCode"
              value={formData.serviceLocationPostalCode}
              onChange={(e) => handleInputChange('serviceLocationPostalCode', e.target.value)}
              placeholder="H1A 1A1"
            />
            {validationErrors.serviceLocationPostalCode && (
              <p className="text-sm text-destructive">{validationErrors.serviceLocationPostalCode}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredContactMethod">Méthode de contact préférée</Label>
            <Select
              value={formData.preferredContactMethod}
              onValueChange={(value) => handleInputChange('preferredContactMethod', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Téléphone</SelectItem>
                <SelectItem value="app_messaging">Messagerie de l'app</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Inscription...' : "S'inscrire"}
      </Button>

      <div className="text-center text-sm text-gray-600">
        Déjà un compte ?{' '}
        <Button
          type="button"
          variant="link"
          className="p-0"
          onClick={onSwitchToLogin}
        >
          Se connecter
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
