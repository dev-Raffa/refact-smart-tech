import type { Users } from "@/types/users";

export interface GroupUserFilter {
  usernames: string;
}

export type GroupsResponse = Groups[];

export type GroupsUsersResponse = {
  groups: Groups[];
  users?: Users[];
};

export type GetUsersInGroupResponse = Users;

export interface GetGroupsUsersResponseResult {
  pageSize: number
  pageNumber: number
  totalPages: number
  totalResults: number
  results: GroupsResult[]
}

export interface GroupsResult {
  group: Groups
  users: Users[]
}

export interface Groups {
  id: string;
  name: string;
  path: string;
}

export interface Attributes {
  tenant: string[];
}

export interface CreateNewGroupDTO {
  name: string;
}

export interface AddRoleToGroupDTO {
  clientId: string;
  groupId: string;
  roleId: string;
}
