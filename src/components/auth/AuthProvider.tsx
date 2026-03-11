"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";

import { AuthContext } from "@/components/auth/auth-context";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => createSupabaseBrowserClient());
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadSession = async () => {
      const [{ data: sessionData }, { data: userData }] = await Promise.all([
        client.auth.getSession(),
        client.auth.getUser(),
      ]);

      if (!isMounted) {
        return;
      }

      setSession(sessionData.session);
      setUser(userData.user);
      setLoading(false);
    };

    loadSession();

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [client]);

  return (
    <AuthContext.Provider value={{ client, user, session, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
