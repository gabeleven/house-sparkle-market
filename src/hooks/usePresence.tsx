
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface UserPresence {
  user_id: string;
  is_online: boolean;
  last_seen: string;
}

export const usePresence = () => {
  const { user } = useAuth();
  const [presenceData, setPresenceData] = useState<Record<string, UserPresence>>({});

  // Update user's online status
  const updatePresence = async (isOnline: boolean) => {
    if (!user) return;

    await supabase
      .from('user_presence')
      .upsert({
        user_id: user.id,
        is_online: isOnline,
        last_seen: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
  };

  // Get presence for specific users
  const getPresence = async (userIds: string[]) => {
    const { data } = await supabase
      .from('user_presence')
      .select('*')
      .in('user_id', userIds);

    if (data) {
      const presenceMap = data.reduce((acc, presence) => {
        acc[presence.user_id] = presence;
        return acc;
      }, {} as Record<string, UserPresence>);
      
      setPresenceData(prev => ({ ...prev, ...presenceMap }));
    }
  };

  // Set up real-time presence updates
  useEffect(() => {
    if (!user) return;

    // Set user online when hook mounts
    updatePresence(true);

    // Subscribe to presence updates
    const presenceSubscription = supabase
      .channel('user-presence')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'user_presence'
      }, (payload) => {
        const presence = payload.new as UserPresence;
        setPresenceData(prev => ({
          ...prev,
          [presence.user_id]: presence
        }));
      })
      .subscribe();

    // Handle page visibility changes
    const handleVisibilityChange = () => {
      updatePresence(!document.hidden);
    };

    // Handle beforeunload to set offline
    const handleBeforeUnload = () => {
      updatePresence(false);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      updatePresence(false);
      presenceSubscription.unsubscribe();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [user]);

  const isUserOnline = (userId: string): boolean => {
    const presence = presenceData[userId];
    if (!presence) return false;
    
    const lastSeen = new Date(presence.last_seen);
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    
    return presence.is_online && lastSeen > fiveMinutesAgo;
  };

  return {
    presenceData,
    updatePresence,
    getPresence,
    isUserOnline
  };
};
