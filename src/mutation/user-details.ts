import { useQuery } from "@tanstack/react-query"
import { identityClient } from "@/libs/axios"
import { storageKeys } from "@/config/storage-keys"

interface UserDetails {
  email: string
  firstName: string
  lastName: string
}

interface DecodeTokenResponse {
  email: string
  firstName: string
  lastName: string
}

async function fetchUserDetails(): Promise<UserDetails> {
  const token = localStorage.getItem(storageKeys.accessToken)
  if (!token) throw new Error("Token não encontrado")

  const { data } = await identityClient.get<DecodeTokenResponse>("/users/decode-token", {
    headers: {
      Authorization: `Bearer ${token}`,
      Tenant: import.meta.env.VITE_TENANT,
    },
  })

  return {
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
  }
}

export function useUserDetails() {
  const token = localStorage.getItem(storageKeys.accessToken)

  return useQuery<UserDetails, Error>({
    queryKey: ["user-details"],
    queryFn: fetchUserDetails,
    enabled: !!token,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 2,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 1,
  })
}
