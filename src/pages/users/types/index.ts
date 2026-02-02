export interface OperatorsRolesResponse {
  pageNumber: number
  pageSize: number
  totalPages: number
  totalResults: number
  results: OperatorRoles[]
}

export interface OperatorRoles {
  id: string
  name: string
  description: string
  employees: Employee[]
}

export interface Employee {
  userId: string
  name?: string
  username?: string
}

export interface OperatorsResponse {
  pageNumber: number
  pageSize: number
  totalPages: number
  totalResults: number
  results: OperatorsResult[]
}

export interface OperatorsResult {
  id: string
  date: string
  operators: Operator[]
}

export interface Operator {
  worker: {
    id: string
    name: string
    username: string
    phonenumber?: string
  }
  isActive: boolean
  teamDetails?: {
    teamId: string
    teamName: string
  }
}


export interface AddMemberInTeamRequest {
  userId: string;
  name: string;
  username: string;
}

export interface GetTeamsResponse {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalResults: number;
  results: Team[];
}

export interface Team {
  teamId: string;
  teamName: string;
  groupId: string;
  groupName: string;
  members: TeamMember[];
}

export interface TeamMember {
  member: {
    id: string;
    name: string;
    username: string;
  };
  isTeamLead: boolean;
}

// Manter Member para retrocompatibilidade
export interface Member {
  userId: string;
  name: string;
  username: string;
  isTeamLead: boolean;
}