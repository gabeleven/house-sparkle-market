
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useMaskedCommunication = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const initiateContact = async (providerId: string) => {
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Connexion requise",
          description: "Vous devez être connecté pour contacter un prestataire",
          variant: "destructive"
        });
        return;
      }

      // Check if communication already exists
      const { data: existing, error: existingError } = await supabase
        .from('masked_communications')
        .select('*')
        .eq('customer_id', user.id)
        .eq('provider_id', providerId)
        .eq('is_active', true)
        .gt('expires_at', new Date().toISOString())
        .maybeSingle();

      if (existingError) {
        console.error('Error checking existing communication:', existingError);
      }

      if (existing) {
        toast({
          title: "Communication active",
          description: `Numéro de contact: ${existing.proxy_phone_number}`,
        });
        return existing;
      }

      // Generate a proxy phone number (in real implementation, this would be from Twilio)
      const proxyNumber = `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;

      const { data: communication, error } = await supabase
        .from('masked_communications')
        .insert({
          customer_id: user.id,
          provider_id: providerId
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating communication:', error);
        toast({
          title: "Erreur",
          description: "Impossible d'initier la communication",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Communication initiée",
        description: `Utilisez ce numéro pour contacter: ${proxyNumber}`,
      });

      return communication;
    } catch (error) {
      console.error('Error initiating contact:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    initiateContact,
    loading
  };
};
