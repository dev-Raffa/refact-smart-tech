import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import { logout } from "../libs/auth";
import type { JwtTokenPayload } from "../types/decode-token";

const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;

export function useSessionMonitor(token: string | null) {
  const warningShownRef = useRef(false);
  const warningTimeoutRef = useRef<any | null>(null);
  const logoutTimeoutRef = useRef<any | null>(null);

  useEffect(() => {
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
      warningTimeoutRef.current = null;
    }
    if (logoutTimeoutRef.current) {
      clearTimeout(logoutTimeoutRef.current);
      logoutTimeoutRef.current = null;
    }

    warningShownRef.current = false;

    if (!token) {
      return;
    }

    try {
      const decoded = jwtDecode<JwtTokenPayload>(token);
      const expirationTime = decoded.exp * 1000;
      const currentTime = Date.now();
      const timeUntilExpiration = expirationTime - currentTime;

      if (timeUntilExpiration <= 0) {
        logout(true, true);
        return;
      }

      const timeUntilWarning = timeUntilExpiration - FIVE_MINUTES_IN_MS;
      if (timeUntilWarning <= 0 && !warningShownRef.current) {
        warningShownRef.current = true;
        const remainingMinutes = Math.ceil(timeUntilExpiration / 60000);
        
        toast.warning("Sessão expirando em breve", {
          description: `Por motivos de segurança, sua sessão será invalidada em ${remainingMinutes} ${remainingMinutes === 1 ? 'minuto' : 'minutos'}.`,
          duration: 10000,
        });

        logoutTimeoutRef.current = setTimeout(() => {
          logout(true, true);
        }, timeUntilExpiration);
      } else if (timeUntilWarning > 0) {
        warningTimeoutRef.current = setTimeout(() => {
          if (!warningShownRef.current) {
            warningShownRef.current = true;
            toast.warning("Sessão expirando em breve", {
              description: "Por motivos de segurança, sua sessão será invalidada em 5 minutos.",
              duration: 10000,
            });
          }
        }, timeUntilWarning);

        logoutTimeoutRef.current = setTimeout(() => {
          logout(true, true);
        }, timeUntilExpiration);
      }
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      logout(true, true);
    }

    return () => {
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
      }
      if (logoutTimeoutRef.current) {
        clearTimeout(logoutTimeoutRef.current);
      }
    };
  }, [token]);
}
