import { FormProvider, useForm, type UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PartnerSchema } from "../schemas"
import type z from "zod";
import { createContext, useContext } from "react";
import type { getRealmResponse } from "../../../types";
import { getAllPartnersQuery, registerNewPartnerMutation } from "../../../hook";


type PartnerFormValues = z.infer<typeof PartnerSchema>;

type partnerFormActions = {
    onSubmit: () => void;
}
interface PartnerFormContextType {
    form: UseFormReturn<PartnerFormValues>;
    actions: partnerFormActions;
    partners: getRealmResponse[] | [];
}

const PartnerFormContext = createContext<PartnerFormContextType | null>(null);

interface PartnerFormProps {
    children: React.ReactNode;
}

export const PartnerFormProvider = ({ children }: PartnerFormProps) => {
    const { mutateAsync: registerNewPartner } = registerNewPartnerMutation();
    
    const { data } = getAllPartnersQuery();
    const partners = data || [];
    
    const form = useForm({
        resolver: zodResolver(PartnerSchema),
        defaultValues: {
            name: "",
            description: ""
        }
    })

    const submit = async (data: PartnerFormValues) => {
        await registerNewPartner(data)    
    }

    const actions = {
        onSubmit: form.handleSubmit(submit)
    }


    return (
        <PartnerFormContext.Provider value={{ form, actions, partners }}>
            <FormProvider {...form}>{children}</FormProvider>
        </PartnerFormContext.Provider>
    )
}

export const usePartnerForm = () => {
    const context = useContext(PartnerFormContext);

    if (!context) {
        throw new Error("usePartnerFormContext must be used within a PartnerFormProvider");
    }

    return context;
}