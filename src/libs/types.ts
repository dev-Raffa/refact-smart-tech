import type { Customers } from "@/types/customers"

export interface FgtsResponse {
  success: boolean
  message: string
  timeProcess: number
  requestId: string
  objectReturn: ObjectReturn
}

export interface ObjectReturn {
  code: string
  description: string
  simulationReturn: SimulationReturn[]
}

export interface SimulationReturn {
  bank: string
  tableId: number
  simulationId: string
  guid: string
  netValue: number
  tableTitle: string
  details: Details
  tableCode: string
}

export interface Details {
  tc: number
  cet: number
  iof: number
  rate: number
  installments: Installment[]
  totalBlockedBalance: number
  selectedInstallments: number
}

export interface Installment {
  transferDate: string
  value: number
}

export interface FgtsFlowResponse {
  pageNumber: number
  pageSize: number
  totalPages: number
  totalResults: number
  results: FgtsFlowResult[]
}

export interface FgtsFlowResult {
  id: string
  date: string
  customerDetails: FlowCustomerDetails
  flowExecutionDetails: FlowExecutionDetails
}

export interface FlowCustomerDetails {
  cpf: string
  name: string
  phoneNumber: string
  contactId: string
  chatId: string
}

export interface FlowExecutionDetails {
  attempt: number
  currentFlowName: typeof FgtsFlowName | "UnknownFlow"
  executionStatus: typeof FgtsExecutionStatus | "RunWithErrorsMarkForRetry" | "RunWithSucessfully"
  stageName: typeof FgtsStageName
}

export const FgtsBank = {
  None: "None",
  Simplix: "Simplix",
  Facta: "Facta",
} as const;

export const FgtsStageName = {
  None: "None",
  NewLead: "NewLead",
  Negotiation: "Negotiation",
  Digitation: "Digitation",
  Signature: "Signature",
  Payed: "Payed",
  Cadence: "Cadence",
} as const;

export const FgtsFlowName = {
  StartingCefConsumationApiToRetrieveInformationsFlow: "StartingCefConsumationApiToRetrieveInformationsFlow",
  ShowAvailableFgtsAntecipationOfferFlow: "ShowAvailableFgtsAntecipationOfferFlow",
  NotHaveSufficientBalanceToWithdrawFlow: "NotHaveSufficientBalanceToWithdrawFlow",
  NotAuthorizedTheFinancialInstitutionFlow: "NotAuthorizedTheFinancialInstitutionFlow",
  OptingForRescissionWithdrawalFlow: "OptingForRescissionWithdrawalFlow",
  ShowDigitalizationProcessFlow: "ShowDigitalizationProcessFlow",
} as const;

export const FgtsExecutionStatus = {
  RunningNow: "RunningNow",
  RunSuccessfully: "RunSuccessfully",
  RunFailedMarkedForRetry: "RunFailedMarkedForRetry",
  AllAttemptsExceededRetryIn1Hour: "AllAttemptsExceededRetryIn1Hour",
} as const;

export interface StepInfo {
  bank: string,
  flowName: keyof typeof StepNames,
  status: string,
  executedAt: string,
  attempt: number,
  cadence?: string,
  needsHumanHelp?: boolean,
}

export interface FactaUsefulInformations {
  factaFgtsSimulationId: number,
  factaFgtsSimulatorId: number,
  factaFgtsFormalizationCode: number
}

export interface FailureReasonItem {
  BankFailed: string;
  Reasons: string[];
}

export interface FailureReasons {
  failureReasons: FailureReasonItem[];
}

export interface BankPartnerInformations {
  bank: string,
  factaUsefulInformations: FactaUsefulInformations,
  failureReasons: FailureReasons | null
}

export interface LeadInformations {
  id: string
  date: string,
  stagename: typeof FgtsStageName,
  availlableBalance: string,
  customer: Customers,
  lastFlow: StepInfo | null
  partnerInformations: BankPartnerInformations
}

export const StepNames = {
  ValidCpf: "ValidCpf",
  InvalidCpf: "InvalidCpf",
  TryingGetSimulationInformationsOnCef: "TryingGetSimulationInformationsOnCef",
  ShowingAvailableFgtsAntecipationOffer: "ShowingAvailableFgtsAntecipationOffer",
  ShowingDigitalizationProcess: "ShowingDigitalizationProcess",
  ValidatingCustomerZipCodeUsingViaCep: "ValidatingCustomerZipCodeUsingViaCep",
  TryingGeneratingFormalizationLink: "TryingGeneratingFormalizationLink",
  ValidatingCustomerCityUsingFacta: "ValidatingCustomerCityUsingFacta",
  TryingGeneratingFormalizationLinkAutomatically: "TryingGeneratingFormalizationLinkAutomatically",
  TryingGeneratingFormalizationLinkManually: "TryingGeneratingFormalizationLinkManually",
  EnrichCustomerPesonalDataViaNovaVidaApi: "EnrichCustomerPesonalDataViaNovaVidaApi",
  WaitingForFormalizationCustomerSignContract: "WaitingForFormalizationCustomerSignContract",
  NotHaveSufficientBalanceToWithdrawFlow: "NotHaveSufficientBalanceToWithdrawFlow",
  NotAuthorizedTheFinancialInstitutionFlow: "NotAuthorizedTheFinancialInstitutionFlow",
  NotOptantForRescissionWithdrawalFlow: "NotOptantForRescissionWithdrawalFlow",
  ValidatingNewPixProvided: "ValidatingNewPixProvided",
  GeneratingDataPrevLink: "GeneratingDataPrevLink",
  ConfirmingDataPrevAuthorization: "ConfirmingDataPrevAuthorization",
  UnknownFlow: "UnknownFlow",
} as const;