import { identityClient } from "@/libs/axios";
import type { PartnerSchemaType } from "../../components/partner-form/schemas";
import type { getRealmResponse, updatePartnerStatusRequest } from "../../types";

async function registerNewPartner(data: PartnerSchemaType) {
    const basicInfos = {name: data.name.trim().toLowerCase(), description: data.description}
    const replicationConfigurationRequest = { 
        tenant: data.name.trim().toLowerCase(), 
        replicationConfigurationRequest: data.replicationConfigurationRequest
    }
    
    await identityClient.post('/realms', basicInfos).then(async (response) => {
        if(response.status === 201) {
            await identityClient.post('/realms/replicate', replicationConfigurationRequest).catch((error) => {
                console.log("Error ao replicar o parceiro: ", error);
                throw new Error("Error ao replicar o parceiro!")
            });
        }
    }).catch((error) => {
        console.log("Error ao registrar o parceiro: ", error);
        throw new Error("Error ao registrar o parceiro!");
    });    
}

async function getAllPartners(): Promise<getRealmResponse[]> {
    return await identityClient.get<getRealmResponse[]>('/realms').then((response) => {
        const responseData = response.data as getRealmResponse[];
        return responseData;
    }).catch((error) => {
        console.log("Error ao buscar os parceiros: ", error);
        throw new Error("Error ao buscar os parceiros!");
    });
}

async function updatePartnerStatus(data: updatePartnerStatusRequest) {
    await identityClient.post(`/realms/enable`, data).catch((error) => {
        console.log("Error ao atualizar o status do parceiro: ", error);
        throw new Error("Error ao atualizar o status do parceiro!");
    });
}

export const PartnersService = {
    registerNewPartner,
    getAllPartners,
    updatePartnerStatus,
}