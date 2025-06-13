
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/hooks/useAuth';

interface LoginFormProps {
  userType: string;
  onSwitchToSignup: () => void;
  onSwitchToForgot: () => void;
  onSuccess?: () => void;
}

const LoginForm = ({ userType, onSwitchToSignup, onSwitchToForgot, onSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn(email, password);
    
    if (!error) {
      if (onSuccess) {
        onSuccess();
      } else {
        // Default redirect behavior
        if (userType === 'cleaner') {
          navigate('/cleaner/onboarding');
        } else {
          navigate('/browse-cleaners');
        }
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="votre@email.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Mot de passe</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
          />
          <Label htmlFor="remember" className="text-sm">Se souvenir de moi</Label>
        </div>
        <Button
          type="button"
          variant="link"
          className="text-sm p-0"
          onClick={onSwitchToForgot}
        >
          Mot de passe oublié ?
        </Button>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Connexion...' : 'Se connecter'}
      </Button>

      <div className="text-center text-sm text-gray-600">
        Pas encore de compte ?{' '}
        <Button
          type="button"
          variant="link"
          className="p-0"
          onClick={onSwitchToSignup}
        >
          S'inscrire
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
