import { z as validator } from "zod";

const envSchema = validator.object({
  VITE_AUTH_API: validator.string(),
  VITE_GATEWAY_API: validator.string(),
});

export const env = envSchema.parse({
  VITE_AUTH_API: import.meta.env.VITE_AUTH_API,
  VITE_GATEWAY_API: import.meta.env.VITE_GATEWAY_API
});
