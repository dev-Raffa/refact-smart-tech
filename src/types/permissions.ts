export type RolesResponse = Roles[]

export interface Roles {
  id: string
  client: string
  mappings: Mapping[]
}

export interface Mapping {
  id: string
  name: string
  description: string
  composite: boolean
  clientRole: boolean
  containerId: string
}

export type PermissionsResponse = Permissions[]

export interface Permissions {
  clientName: string
  clientId: string
  roles: PermissionsRoles[]
}

export interface PermissionsRoles {
  id: string
  name: string
  description: string
  composite: boolean
  clientRole: boolean
  containerId: string
}