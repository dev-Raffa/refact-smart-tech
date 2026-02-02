export interface CreateBankRequest {
  name: string
  code: number
  product: string
  agreement: string
  coefficients: number[]
  active?: boolean
}

export type BankItem = {
  id: string
  bank: {
    relevance: number
    code: number
    name: string
    product: string
    agreement: string
    coefficients: number[]
  }
}

export interface BankResponse {
  pageNumber: number
  pageSize: number
  totalPages: number
  totalResults: number
  totalAmount: number
  results: BankItem[]
}

export type BankRule = {
  id: string;
  subRegras: BankSubRule[];
  criadoEm: string;
  usuarioId: string;
  banco: BankItem;
  descricao: string;
  nome: string;
  valueType: string;
  operador: string;
  valor: string;
  registroAtivo: boolean;
};

export type BankSubRule = {
  id: string;
  criadoEm: string;
  descricao: string;
  nome: string;
  valueType: string;
  operador: string;
  valor: string;
  registroAtivo: boolean;
};

export interface BankRulesResponse {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalResults: number;
  totalAmount: number;
  results: BankRule[];
}