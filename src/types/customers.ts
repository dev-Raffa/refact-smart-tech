export interface ExportCustomersExcelRequest {
    creationOrigin: string
    creationDateStart: string
    creationDateEnd: string
}

export interface CustomersPageFilter {
    page: number
    pageSize: number
}


export interface CustomersResponse {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalResults: number;
    totalAmount: number;
    results: Customers[];
}

export interface AssignedOperator {
    id: string
    name: string
    username: string
    phonenumber: string
    teamDetails: TeamDetails
    isActiveToday: boolean
  }
  
  export interface TeamDetails {
    teamId: string
    teamName: string
  }
  
  export interface ContractDetails {
    functionalStatus: string
    currentRate: number
    currentInstallment: number
    remainingTerm: number
    institution: string
    affiliation: string
    earnings: string
    cardMargin: number
    loanMargin: number
    amountContractsElegible: number
  }
  
  export interface MarketingDetails {
    utmSource: string
    utmCampaign: string
    utmId: string
    utmContent: string
  }
  
  export interface PublicServantInfo {
    publicServantType: string
    federalServantLink: string
    statePublicServantLink: string
    municipalPublicServantLink: string
    armedForcesPublicServant: string
  }
  
  export interface HuggyDetails {
    contactId: string
    chatId: string
    channelId: string
  }
  

export type Customers = {
    id: string
    creationDate: string
    assignedOperator: AssignedOperator
    creationOrigin: string
    contractDetails: ContractDetails
    marketingDetails: MarketingDetails
    segment: string
    publicServantInfo: PublicServantInfo
    fgtsContractionDetails: any
    cltDetails: CltDetails
    huggyDetails: HuggyDetails
    pix: string
    phoneNumber1: string
    phoneNumber2: string
    cpf: string
    name: string
    bank: string
    city: string
    uf: string
    dateBirth: string
    motherName: string
    gender: string
    zipCode: string
    rg: string
};


export type CltDetails = {
    cpf: string
    name: string
    birthDate: string
    workerCategoryCode: string
    eligible: boolean
    motherName: string
    employmentDurationInMonths: number
    employmentStartDate: string
    marginAvailable: string
    baseMargin: string
    totalEarnings: string
    company: {
        cnpj: string
        registration: string
        cnaeCode: string
        cnaeDescription: string
        companyName: string
        foundationDate: string
        numbersOfWorkers: number
    }
}


export type CustomerOrigin = {
    creationOrigin: string;
    creationDate: string;
    marketingDetails: MarketingDetails;
}

export interface PublicServantInfo {
    publicServantType: string
    federalServantLink: string
    statePublicServantLink: string
    municipalPublicServantLink: string
    armedForcesPublicServant: string
}

export interface ContractDetails {
    functionalStatus: string
    currentRate: number
    currentInstallment: number
    remainingTerm: number
    institution: string
    affiliation: string
    earnings: string
    cardMargin: number
    loanMargin: number
    amountContractsElegible: number
}



export interface FactaCustomerDetails {
    factaCustomerCode: string;
}

export interface HuggyDetails {
    contactId: string;
    chatId: string;
}
