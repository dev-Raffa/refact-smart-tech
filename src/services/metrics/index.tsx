import type { AssignUserToRoleRequest } from "@/types/role";
import type { InteractionResponse } from "@/types/interactions";
import type { CreateOperatorRoleRequest } from "@/types/roles";


import { httpClient } from "@/libs/axios";
import { AxiosError } from "axios";
import type { OperatorsRolesResponse, Team } from "@/pages/users/types";

export class MetricsService {
  static async getAllOperators() {
    try {
      const { data } = await httpClient.get("/daily-operation");
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {

        if (error.response?.status === 403) {
          error.message = "Você não tem permissão para acessar esses dados.";
        } else {
          error.message = "Erro interno do servidor!";
        }
        throw error;
      }
      throw error;
    }
  }

  static async getAllInteractions() {
    try {
      const { data } = await httpClient.get<InteractionResponse>("/interaction");
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error!");
    }
  }

  static async createOperatorRole({ name, description }: CreateOperatorRoleRequest) {
    try {
      const { data } = await httpClient.post("/roles", {
        name,
        description
      });

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error!");
    }
  }

  static async getAllOperatorsRoles() {
    try {
      const { data } = await httpClient.get<OperatorsRolesResponse>("/roles");

      return data.results;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error!");
    }
  }

  static async assignUserToRole(
    roleId: string,
    { userId, name, username, phonenumber }: AssignUserToRoleRequest
  ) {
    try {
      const { data } = await httpClient.post(
        `/roles/${roleId}/members`,
        {
          userId,
          name,
          username,
          phonenumber
        }
      );

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error!");
    }
  }

  static async updateOperatorRole(
    roleId: string,
    { name, description }: CreateOperatorRoleRequest
  ) {
    try {
      const patchData = [
        {
          op: "replace",
          path: "/name",
          value: name,
        },
        {
          op: "replace",
          path: "/description",
          value: description,
        },
      ];

      const { data } = await httpClient.patch(`/roles/${roleId}`, patchData, {
        headers: {
          "Content-Type": "application/json-patch+json"
        }
      });

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error!");
    }
  }

  static async removeUserInRole(roleId: string, userId: string) {
    try {
      const { data } = await httpClient.delete(`/roles/${roleId}/members/${userId}`);

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error!");
    }
  }

  static async deleteOperatorRole(roleId: string) {
    try {
      const { data } = await httpClient.delete(`/roles?id=${roleId}`);

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error!");
    }
  }

  static async updateDailyOperation() {
    try {
      const { data } = await httpClient.patch("/daily-operation");

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error!");
    }
  }

  static async updateActiveOperator(
    operationId: string,
    workerId: string,
    isWorkingToday: boolean,
  ) {
    try {
      const body = {
        workerId,
        isWorkingToday,
      };

      const { data } = await httpClient.patch(
        `/daily-operation/${operationId}/update-worker-status`,
        body,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error.");
    }
  }

  static async getAllTeams(): Promise<Team[]> {
    try {
      const { data } = await httpClient.get("/teams");
      if (Array.isArray(data)) return data;
      if (data?.results && Array.isArray(data.results)) return data.results;
      return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  static async addNewTeam(teamName: string) {
    try {
      const { data } = await httpClient.post("/teams", { name: teamName });

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error!");
    }
  }

  static async updateTeam(teamId: string, newValue: string) {
    try {
      const patchData = [
        {
          op: "replace",
          path: "/name",
          value: newValue,
        }
      ]

      const { data } = await httpClient.patch(`/teams/${teamId}`, patchData, {
        headers: {
          "Content-Type": "application/json-patch+json"
        }
      });

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error!");
    }
  }

  static async deleteTeam(teamId: string) {
    try {
      const { data } = await httpClient.delete(`/teams?id=${teamId}`);

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error!");
    }
  }

  static async addMemberInTeam(
    teamId: string,
    { member, isTeamLead }: { member: { id: string; name: string; username: string }; isTeamLead: boolean }
  ) {
    try {
      const { data } = await httpClient.post(
        `/teams/${teamId}/members`,
        {
          member,
          isTeamLead
        },
      );

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error!");
    }
  }

  static async deleteMemberInTeam(teamId: string, userId: string) {
    try {
      const { data } = await httpClient.delete(`/teams/${teamId}/members/${userId}`);

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error!");
    }
  }

  static async addTeamLeader(teamId: string, index: number) {
    try {
      const patchData = [
        {
          op: "replace",
          path: `/members/${index}/isTeamLead`,
          value: true
        }
      ]

      const { data } = await httpClient.patch(`/teams/${teamId}`, patchData, {
        headers: {
          "Content-Type": "application/json-patch+json"
        }
      });

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error!");
    }
  }

  static async removeTeamLeader(teamId: string, index: number) {
    try {
      const patchData = [
        {
          op: "replace",
          path: `/members/${index}/isTeamLead`,
          value: false
        }
      ]

      const { data } = await httpClient.patch(`/teams/${teamId}`, patchData, {
        headers: {
          "Content-Type": "application/json-patch+json"
        }
      });

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error!");
    }
  }
}