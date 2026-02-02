export interface Partner {
    realm: string;
    name: string;
    enabled: boolean;
}


export type getRealmResponse = {
    realm: string;
    enabled: boolean;
}

export type updatePartnerStatusRequest = {
    realm: string;
    enabled: boolean;
}