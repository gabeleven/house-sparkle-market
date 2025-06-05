
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useMaskedCommunication = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const initiateContact = async (cleanerId: string) => {
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Connexion requise",
          description: "Vous devez être connecté pour contacter un nettoyeur",
          variant: "destructive"
        });
        return;
      }

      // Check if communication already exists
      const { data: existing } = await supabase
        .from('masked_communications')
        .select('*')
        .eq('customer_id', user.id)
        .eq('cleaner_id', cleanerId)
        .eq('is_active', true)
        .gt('expires_at', new Date().toISOString())
        .single();

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
          cleaner_id: cleanerId,
          proxy_phone_number: proxyNumber
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
