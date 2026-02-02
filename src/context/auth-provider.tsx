import { storageKeys } from "@/config/storage-keys";
import { createContext, useContext, useState, useMemo, type ReactNode } from "react";
import { useSessionMonitor } from "../hooks/use-session-monitor";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(storageKeys.accessToken)
  );

  useSessionMonitor(token);

  const value = useMemo(() => ({ token, setToken }), [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
