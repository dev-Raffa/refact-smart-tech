import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import { storageKeys } from "@/config/storage-keys";
import type { JwtTokenPayload } from "../types/decode-token";

const AUTH_STORAGE_KEYS = [
  storageKeys.accessToken,
  storageKeys.loggedUserFirstName,
  storageKeys.loggedUserLastName
];

export function logout(showToast = true, redirectToLogin = true) {
  for (const key of AUTH_STORAGE_KEYS) {
    localStorage.removeItem(key);
  }

  if (showToast) {
    toast.error("Sua sessão expirou, faça login novamente");
  }

  if (redirectToLogin) {
    globalThis.location.replace('/login');
  }
}

export function decodeToken(token: string): JwtTokenPayload | null {
  try {
    return jwtDecode<JwtTokenPayload>(token);
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token);
  if (!decoded) return true;

  const expirationTime = decoded.exp * 1000;
  return Date.now() >= expirationTime;
}

export function getTimeUntilExpiration(token: string): number | null {
  const decoded = decodeToken(token);
  if (!decoded) return null;

  const expirationTime = decoded.exp * 1000;
  return expirationTime - Date.now();
}

export function getCurrentOperatorId(): string | null {
  const token = localStorage.getItem(storageKeys.accessToken);
  if (!token) return null;

  const decoded = decodeToken(token);
  return decoded?.sub || null;
}

