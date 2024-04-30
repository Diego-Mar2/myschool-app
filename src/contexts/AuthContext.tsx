import { createContext, useContext, useState, useEffect } from "react";

import { supabase } from "../config/supabase";

import type { PropsWithChildren } from "react";
import type { Session } from "@supabase/supabase-js";

interface AuthContextProps {
  session: Session | null;
}

export const initialValue: AuthContextProps = {
  session: null,
};

const AuthContext = createContext<AuthContextProps>(initialValue);

export const AuthContextProvider = ({
  children,
}: PropsWithChildren<AuthContextProps>) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('session changed', session)
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }

  return context;
};
