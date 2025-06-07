
import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface UserPresence {
  user_id: string;
  is_online: boolean;
  last_seen: string;
}

export const usePresence = () => {
  const { user, session } = useAuth();
  const [presenceData, setPresenceData] = useState<Record<string, UserPresence>>({});
  const presenceChannelRef = useRef<any>(null);
  const isSubscribedRef = useRef(false);

  // Validate session before operations
  const validateSession = useCallback(async () => {
    if (!session) {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        return currentSession;
      } catch (error) {
        console.error('Session validation failed:', error);
        return null;
      }
    }
    return session;
  }, [session]);

  // Update user's online status
  const updatePresence = useCallback(async (isOnline: boolean) => {
    const validSession = await validateSession();
    if (!validSession || !user) return;

    try {
      await supabase
        .from('user_presence')
        .upsert({
          user_id: user.id,
          is_online: isOnline,
          last_seen: new Date().toISOString()
        } as any);
    } catch (error) {
      console.error('Error updating presence:', error);
    }
  }, [user, validateSession]);

  // Get presence for specific users
  const getPresence = useCallback(async (userIds: string[]) => {
    const validSession = await validateSession();
    if (!validSession || userIds.length === 0) return;
    
    const { data, error } = await supabase
      .from('user_presence')
      .select('*')
      .in('user_id', userIds as any);

    if (error) {
      console.error('Error fetching presence:', error);
      return;
    }

    if (data) {
      const presenceMap = data
        .filter((presence): presence is UserPresence => 
          presence && 
          typeof presence === 'object' && 
          'user_id' in presence &&
          'is_online' in presence &&
          'last_seen' in presence
        )
        .reduce((acc, presence) => {
          acc[presence.user_id] = presence;
          return acc;
        }, {} as Record<string, UserPresence>);
      
      setPresenceData(prev => ({ ...prev, ...presenceMap }));
    }
  }, [validateSession]);

  // Set up real-time presence updates
  useEffect(() => {
    // Clean up existing subscription
    if (presenceChannelRef.current) {
      supabase.removeChannel(presenceChannelRef.current);
      presenceChannelRef.current = null;
      isSubscribedRef.current = false;
    }

    if (!user || !session || isSubscribedRef.current) return;

    console.log('Setting up presence for user:', user.id);
    isSubscribedRef.current = true;

    // Set user online when hook mounts
    updatePresence(true);

    // Create unique channel name to avoid conflicts
    const timestamp = Date.now();
    const tabId = Math.random().toString(36).substr(2, 9);
    const channelName = `presence-${user.id}-${timestamp}-${tabId}`;

    // Subscribe to presence updates
    presenceChannelRef.current = supabase
      .channel(channelName)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'user_presence'
      }, (payload) => {
        const presence = payload.new as UserPresence;
        if (presence && typeof presence === 'object' && 'user_id' in presence) {
          setPresenceData(prev => ({
            ...prev,
            [presence.user_id]: presence
          }));
        }
      })
      .subscribe();

    // Handle page visibility changes
    const handleVisibilityChange = () => {
      updatePresence(!document.hidden);
    };

    // Handle beforeunload to set offline
    const handleBeforeUnload = () => {
      // Use sendBeacon for more reliable offline status update
      navigator.sendBeacon?.('/api/presence/offline') || updatePresence(false);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      updatePresence(false);
      if (presenceChannelRef.current) {
        supabase.removeChannel(presenceChannelRef.current);
        presenceChannelRef.current = null;
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      isSubscribedRef.current = false;
    };
  }, [user, session, updatePresence]);

  const isUserOnline = useCallback((userId: string): boolean => {
    const presence = presenceData[userId];
    if (!presence) return false;
    
    const lastSeen = new Date(presence.last_seen);
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    
    return presence.is_online && lastSeen > fiveMinutesAgo;
  }, [presenceData]);

  return {
    presenceData,
    updatePresence,
    getPresence,
    isUserOnline
  };
};
