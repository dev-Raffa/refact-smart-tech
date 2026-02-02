export interface GetUsersResponse {
  totalResults: number;
  totalPages: number;
  results: Users[];
}

export interface UserFilterState {
  page?: string
  pageSize?: string
  usernames: string[]
  attributeKeys: string[]
  attributeValues: string[]
}

export interface Users {
  password: any
  id: string
  enabled: boolean
  emailVerified: boolean
  username: string
  email: string
  firstName: string
  lastName: string
  totp: boolean
  disableableCredentialTypes: any[]
  requiredActions: any[]
  notBefore: number
  createdTimestamp: number
  access: any
  attributes: Attributes
}

export interface Attributes {
  zoneinfo?: string[]
  birthdate?: string[]
  phone?: string
  gender?: string[]
  fullname?: string[]
  picture?: string[]
  tenant: string[]
  cpf?: string[]
  cidade?: string[]
  estado?: string[]
  isTeamLeader: string[]
  teamId: string[]
  teamName: string[]
  teamLead: string[]
  additionalProp3?: string[]
  additionalProp2?: string[]
  additionalProp1?: string[]
  zoneInfo?: string[]
  roleId: string
  roleName: string
}