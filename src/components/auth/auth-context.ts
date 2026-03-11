"use client";

import { createContext, useContext } from "react";
import type { Session, SupabaseClient, User } from "@supabase/supabase-js";

type AuthContextValue = {
  client: SupabaseClient;
  user: User | null;
  session: Session | null;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
