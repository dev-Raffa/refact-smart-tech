import { useMutation } from "@tanstack/react-query"
import type { UseMutationResult } from "@tanstack/react-query"
import { storageKeys } from "@/config/storage-keys"
import { identityClient } from "@/libs/axios"
import { AxiosError } from "axios"
import { loginFormSchema, type LoginFormSchema } from "@/pages/auth/components/login-form/schema"

interface LoginResponse {
  accessToken: string
  expiresIn: number
}

interface ApiErrorResponse {
  code?: string
  description?: string
}

export class LoginError extends Error {
  public code?: string;
  public isCredentialError: boolean;

  constructor(
    message: string,
    code?: string,
    isCredentialError: boolean = false
  ) {
    super(message);
    this.name = 'LoginError';
    this.code = code;
    this.isCredentialError = isCredentialError;
  }
}

async function loginRequest(credentials: LoginFormSchema): Promise<LoginResponse> {
  const parsed = loginFormSchema.safeParse(credentials);
  if (!parsed.success) {
    throw new LoginError("Credenciais inválidas");
  }

  try {
    const { tenant, ...loginData } = parsed.data;    
    const { data } = await identityClient.post<LoginResponse>("/users/login", loginData, {
      headers: {
        Tenant: 'credtotal'
      }
    });
    
    localStorage.setItem(storageKeys.accessToken, data.accessToken);
    localStorage.setItem(storageKeys.tenant, tenant);
    
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiErrorResponse;
      const code = apiError?.code || '';

      if (code === 'User.InvalidUserNameOrPassword' || error.response?.status === 400) {
        throw new LoginError(
          "Email ou senha incorretos. Por favor, verifique suas credenciais e tente novamente.",
          code,
          true
        );
      }

      if (apiError?.description) {
        throw new LoginError(apiError.description, code);
      }
    }

    throw new LoginError("Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.");
  }
}

export function useLogin(): UseMutationResult<LoginResponse, LoginError, LoginFormSchema> {
  return useMutation<LoginResponse, LoginError, LoginFormSchema>({
    mutationFn: loginRequest,
  });
}
