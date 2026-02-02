import { PageHeading } from "@/components/shared/page-heading";
import { AddPartner } from "../../partners/components/add-partner";
import { PartnerFormProvider } from "../../partners/components/partner-form/hook";
import { PartnersTable } from "../../partners/components/partners-table";
//import { getAllPartnersQuery } from "../hook";
import { PartnerTableSkeleton } from "../../partners/components/partner-table-skeleton";
import { partners } from "../mock";
//import { getCurrentTenant } from "@/libs/axios";
//import { Navigate } from "react-router";

export const PartnersPage = () => {
/*
    const { data: partners,isPending } = getAllPartnersQuery();
    const tenant = "smartconsig"; //getCurrentTenant();

    if (tenant !== "smartconsig") {
        return <Navigate to="/" replace />;
    }
*/
    return (
        <PartnerFormProvider>
            <div className="size-full gap-1 px-4 lg:gap-2 lg:px-6">
                <div className="relative mb-5 flex flex-col space-y-6 py-6 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
                    <PageHeading
                        title="Gerenciar parceiros"
                        description="Gerencie de forma centralizada os seus parceiros."
                    />
                    <div className="absolute bottom-0 right-0 ">
                        <AddPartner />
                    </div>
                </div>
                <div className="h-[calc(100vh-252px)] pt-2">
                    {/*isPending ? <PartnerTableSkeleton /> : <PartnersTable partners={partners || []}/>*/}
                    <PartnersTable partners={partners || []}/>
                </div>
            </div>
        </PartnerFormProvider>
    );
};