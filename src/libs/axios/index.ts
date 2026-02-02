import axios from "axios";

import { storageKeys } from "@/config/storage-keys";
import { logout } from "../auth";

export const identityClient = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API,
});

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_GATEWAY_API
});

const apis = [httpClient, identityClient];
let isLoggingOut = false;

for (const api of apis) {
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem(storageKeys.accessToken);
      const tenant = localStorage.getItem(storageKeys.tenant) || "smartconsig";
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      config.headers.Tenant = tenant;
      
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        const isLoginAttempt = error.config?.url?.includes('/login');
        if (error.response.status === 401 && !isLoginAttempt && !isLoggingOut) {
          isLoggingOut = true;
          logout();
        }
      }
      return Promise.reject(error);
    }
  );
}

export function getCurrentTenant(): string {
  return localStorage.getItem(storageKeys.tenant) || "smartconsig";
}

export function setCurrentTenant(tenant: string): void {
  localStorage.setItem(storageKeys.tenant, tenant);
}