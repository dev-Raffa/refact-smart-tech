export interface GetAccessTokenResponse {
  token: string
  userDetails: DecodeTokenResponse
}

export interface DecodeTokenResponse {
  id: string
  enabled: boolean
  emailVerified: boolean
  username: string
  email: string
  firstName: string
  lastName: string
  tenant: string
  totp: boolean
  disableableCredentialTypes: string[]
  requiredActions: string[]
  notBefore: number
  createdTimestamp: number
  access: Access
  attributes: Attributes
}

export interface Access {
  manageGroupMembership: boolean
  view: boolean
  mapRoles: boolean
  impersonate: boolean
  manage: boolean
}

export interface Attributes {
  additionalProp1: string[]
  additionalProp2: string[]
  additionalProp3: string[]
}

interface ResourceAccess {
  account: {
    roles: string[];
  };
}

interface RealmAccess {
  roles: string[];
}

export interface JwtTokenPayload {
  exp: number;
  iat: number;
  jti: string;
  iss: string;
  aud: string[];
  sub: string;
  typ: string;
  azp: string;
  session_state: string;
  acr: string;
  'allowed-origins': string[];
  realm_access: RealmAccess;
  resource_access: ResourceAccess;
  scope: string;
  sid: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  tenant: string;
  email: string;
}