/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/client";

const AuthContext = createContext(null);

/** Provide login state to every protected page in the app. */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /** Restore the saved session whenever the application opens. */
    const restoreSession = async () => {
      if (!localStorage.getItem("wealthwise_token")) return setLoading(false);
      try { setUser((await api("/profile")).user); } catch { localStorage.removeItem("wealthwise_token"); } finally { setLoading(false); }
    };
    restoreSession();
  }, []);

  /** Save a successful login response in browser storage and app state. */
  const signIn = (data) => { localStorage.setItem("wealthwise_token", data.token); setUser(data.user); };
  /** Remove the saved session when a user logs out. */
  const signOut = () => { localStorage.removeItem("wealthwise_token"); setUser(null); };

  return <AuthContext.Provider value={{ user, setUser, loading, signIn, signOut }}>{children}</AuthContext.Provider>;
}

/** Read the shared authentication state. */
export const useAuth = () => useContext(AuthContext);
