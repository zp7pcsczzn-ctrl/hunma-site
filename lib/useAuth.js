'use client';

import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

export function useAuth() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session ? data.session.user : null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session ? session.user : null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { user, loading: user === undefined };
}
