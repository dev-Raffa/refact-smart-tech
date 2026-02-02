import type { Operator } from "@/pages/users/types";
import type { Customers } from "./customers";
export interface InteractionResponse {
  pageNumber: number
  pageSize: number
  totalPages: number
  totalResults: number
  results: Interaction[]
}

export interface Interaction {
  id: string;
  operator: Operator;
  customer: Customers;
  leadStatus: InteractionLeadStatus;
}

export const InteractionLeadStatus = {
  New: "New",
  EmptyProposals: "EmptyProposals",
  PotentialSale: "PotentialSale",
  InNegotiation: "InNegotiation",
  NoAnswer: "NoAnswer",
  NoInterest: "NoInterest",
  SaleCompleted: "SaleCompleted"
} as const;

export type InteractionLeadStatus = typeof InteractionLeadStatus[keyof typeof InteractionLeadStatus];