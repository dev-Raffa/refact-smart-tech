import type { GetUsersResponse, UserFilterState } from "@/types/users";
import type { RolesResponse } from "../types/permissions";

import { identityClient } from "@/libs/axios";
import { storageKeys } from "@/config/storage-keys";
import type { GetGroupsUsersResponseResult, GroupsResponse } from "@/pages/groups/types";

export class AuthService {
  public static getAccessToken() {
    const token = localStorage.getItem(storageKeys.accessToken);
    if (!token) return null;

    return token;
  }

  public static clearTokens() {
    localStorage.removeItem(storageKeys.accessToken);
  }

  public static async signUp({ ...props }) {
    try {
      const token = this.getAccessToken();
      const { data } = await identityClient.post(`/users`,
        {
          ...props,
        },
        {
          headers: {
            "Content-Type": "application/json;",
            Authorization: `Bearer ${token}`
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error!");
    }
  }

  public static async getUsers() {
    try {
      const token = this.getAccessToken();
      const { data } = await identityClient.get<GetUsersResponse>(
        `/users`, {
        headers: {
          "Content-Type": "application/json;",
          Authorization: `Bearer ${token}`
        }
      }
      );

      return data.results;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error!");
    }
  }

  public static async getUsersPaginated(page: number = 1, pageSize: number = 20) {
    try {
      const token = this.getAccessToken();

      const { data } = await identityClient.get<GetUsersResponse>(
        `/users?PageFilter.Page=${page}&PageFilter.PageSize=${pageSize}`,
        {
          headers: {
            "Content-Type": "application/json;",
            Authorization: `Bearer ${token}`
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error!");
    }
  }

  static async getUserByEmail(email: string) {
    try {
      const token = this.getAccessToken();

      const { data } = await identityClient.get<GetUsersResponse>(
        `/users?Usernames=${email}`,
        {
          headers: {
            "Content-Type": "application/json;",
            Authorization: `Bearer ${token}`
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error!");
    }
  }

  static async getUserByEmailPaginated(email: string, page: number, pageSize: number) {
    try {
      const token = this.getAccessToken();

      const { data } = await identityClient.get(
        `/users?Usernames=${email}&PageFilter.Page=${page}&PageFilter.PageSize=${pageSize}`,
        {
          headers: {
            "Content-Type": "application/json;",
            Authorization: `Bearer ${token}`
          },
        }
      );

      return data.results;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error!");
    }
  }

  static async getUsersByFilters(filters: UserFilterState) {
    try {
      const token = this.getAccessToken();
      const params = new URLSearchParams();

      if (filters.page && filters.pageSize) {
        params.append("PageFilter.Page", filters.page);
        params.append("PageFilter.PageSize", filters.pageSize);
      }

      if (filters.usernames.length > 0) {
        params.append("Usernames", filters.usernames.join(","));
      }

      if (filters.attributeKeys.length > 0) {
        filters.attributeKeys.forEach((key, index) => {
          params.append("AttributeKeys", key);

          if (index < filters.attributeValues.length) {
            params.append("AttributeValues", filters.attributeValues[index]);
          }
        });
      }

      const { data } = await identityClient.get<GetUsersResponse>(
        `/users?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );

      return data.results;
    } catch (error) {
      console.error("Error fetching users by filters:", error);

      if (error === 401) {
        localStorage.clear();
        throw new Error("Sessão expirada. Por favor, faça login novamente.");
      }

      throw error;
    }
  }

  static async updateUser(userId: string, { ...props }) {
    try {
      const token = this.getAccessToken();

      const { data } = await identityClient.put(`/users?id=${userId}`,
        {
          ...props,
        },
        {
          headers: {
            "Content-Type": "application/json;",
            Authorization: `Bearer ${token}`
          },
        }
      )

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error!");
    }
  }

  static async deleteUser(userId: string) {
    try {
      const token = this.getAccessToken();

      const { data } = await identityClient.delete(
        `/users/${userId}`,
        {
          headers: {
            "Content-Type": "application/json;",
            Authorization: `Bearer ${token}`
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error!");
    }
  }

  static async addUserToGroup(userId: string, groupId: string) {
    try {
      const token = this.getAccessToken();

      const { data } = await identityClient.post(
        `/groups/users`,
        {
          userId,
          groupId,
        },
        {
          headers: {
            "Content-Type": "application/json;",
            Authorization: `Bearer ${token}`
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error!");
    }
  }

  static async addPermissionToGroup(
    clientId: string,
    groupId: string,
    roleId: string
  ) {
    try {
      const token = this.getAccessToken();

      const { data } = await identityClient.post(
        `/groups-roles/${groupId}/role`,
        {
          clientId,
          groupId,
          roleId,
        },
        {
          headers: {
            "Content-Type": "application/json;",
            Authorization: `Bearer ${token}`
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error!");
    }
  }

  static async removeUserFromGroup(userId: string, groupId: string) {
    try {
      const token = this.getAccessToken();

      const { data } = await identityClient.delete(
        `/groups/users`,
        {
          data: { userId, groupId },
          headers: {
            "Content-Type": "application/json;",
            Authorization: `Bearer ${token}`
          },
        },
      );

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error!");
    }
  }

  static async createGroup(name: string) {
    try {
      const token = this.getAccessToken();

      const { data } = await identityClient.post(`/groups`,
        { name },
        {
          headers: {
            "Content-Type": "application/json;",
            Authorization: `Bearer ${token}`
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error!");
    }
  }

  static async getGroups() {
    try {
      const token = this.getAccessToken();

      const { data } = await identityClient.get<GroupsResponse>(
        `/groups`,
        {
          headers: {
            "Content-Type": "application/json;",
            Authorization: `Bearer ${token}`
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error!");
    }
  }

  static async deleteGroup(groupId: string) {
    try {
      const token = this.getAccessToken();

      const { data } = await identityClient.delete(
        `/groups/${groupId}`,
        {
          headers: {
            "Content-Type": "application/json;",
            Authorization: `Bearer ${token}`
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error!");
    }
  }

  static async getUsersInGroupPaginated(
    page: number,
    pageSize: number,
    groupId: string
  ) {
    try {
      const token = this.getAccessToken();

      const { data } = await identityClient.get<GetGroupsUsersResponseResult>(
        `/groups/users?PageFilter.Page=${page}&PageFilter.PageSize=${pageSize}&GroupId=${groupId}`,
        {
          headers: {
            "Content-Type": "application/json;",
            Authorization: `Bearer ${token}`
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error!");
    }
  }

  static async getUserInGroupByUsername(
    page: number,
    pageSize: number,
    groupId: string,
    username: string
  ) {
    try {
      const token = this.getAccessToken();

      const { data } = await identityClient.get<GetGroupsUsersResponseResult>(
        `/groups/users?PageFilter.Page=${page}&PageFilter.PageSize=${pageSize}&GroupId=${groupId}&Usernames=${username}`,
        {
          headers: {
            "Content-Type": "application/json;",
            Authorization: `Bearer ${token}`
          },
        }
      );

      return data.results;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error!");
    }
  }

  static async getGroupPermissions(groupId: string) {
    try {
      const token = this.getAccessToken();

      const { data } = await identityClient.get<RolesResponse>(
        `/groups-roles/${groupId}/roles`,
        {
          headers: {
            "Content-Type": "application/json;",
            Authorization: `Bearer ${token}`
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error!");
    }
  }

  static async deleteGroupPermission(groupId: string, permissionId: string) {
    try {
      const token = this.getAccessToken();

      const { data } = await identityClient.delete(
        `/groups-roles/${groupId}/role/${permissionId}`,
        {
          headers: {
            "Content-Type": "application/json;",
            Authorization: `Bearer ${token}`
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error!");
    }
  }
}