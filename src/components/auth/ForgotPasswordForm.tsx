
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

const ForgotPasswordForm = ({ onBackToLogin }: ForgotPasswordFormProps) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await resetPassword(email);
    
    if (!error) {
      setSent(true);
    }

    setLoading(false);
  };

  if (sent) {
    return (
      <div className="text-center space-y-4">
        <p className="text-green-600">
          Un email de réinitialisation a été envoyé à votre adresse.
        </p>
        <Button onClick={onBackToLogin} className="w-full">
          Retour à la connexion
        </Button>
      </div>
    );
  }

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

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Envoi...' : 'Envoyer le lien'}
      </Button>

      <Button
        type="button"
        variant="ghost"
        className="w-full"
        onClick={onBackToLogin}
      >
        Retour à la connexion
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
