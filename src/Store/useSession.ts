'use client';

import { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();
      setSession(currentSession);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('authListener', event, currentSession);
        setSession(currentSession);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  return session;
};
