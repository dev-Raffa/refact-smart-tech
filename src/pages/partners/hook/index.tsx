import { useMutation, useQuery } from "@tanstack/react-query"
import { PartnersService } from "../services/partners"
import type { PartnerSchemaType } from "../components/partner-form/schemas"
import { queryClient } from "@/config/react-query"
import type { updatePartnerStatusRequest } from "../types"

export const registerNewPartnerMutation = () => {
    return useMutation({
        mutationFn: (data: PartnerSchemaType) => PartnersService.registerNewPartner(data),
        meta: {
            successMessage: "Parceiro registrado com sucesso! Aguarde a sincronização dos dados, que pode levar entre 2 a 5 minutos."
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["partners"] });
        }
    })
}

export const updatePartnerStatusMutation = () => {
    return useMutation({
        mutationFn: (data: updatePartnerStatusRequest) => PartnersService.updatePartnerStatus(data),
        meta: {
            successMessage: "Status do parceiro atualizado com sucesso!"
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["partners"] });
        }

    })
}

export const getAllPartnersQuery = () => {
    return useQuery({
        queryKey: ["partners"],
        queryFn: () => PartnersService.getAllPartners(),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: false
    })
}
