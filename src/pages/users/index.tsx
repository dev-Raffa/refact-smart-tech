import { PageHeading } from "@/components/shared/page-heading";
import { OperatorsFilters } from "./components/operators-filters";
//import { OperatorsTable } from "./components/operators-table";
import { OperatorsProvider } from "./hooks/operators-context";

import data from "../../data.json"
import { DataTable } from "@/components/data-table";

export function OperatorsContent() {
  return (
    <OperatorsProvider>
    <div className="size-full gap-1 px-4 lg:gap-2 lg:px-6">
          <div className="relative mb-5 flex flex-col space-y-6 py-6 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
            <PageHeading
              title="Operadores"
              description="Gerencie usuários e grupos com controle total sobre permissões e acessos."
            />
          </div>
          <OperatorsFilters />
        </div>
        <DataTable data={data} />
    </OperatorsProvider>
  )
}