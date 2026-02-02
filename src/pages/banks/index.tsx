import { PageHeading } from "@/components/shared/page-heading";
import { BanksContent } from "./components/bank-tab";
import { AddNewBankContent } from "./components/manager-bank";

export function BanksRulesTab() {
  return (
    <div className="size-full gap-1 px-4 lg:gap-2 lg:px-6">
      <div className="relative mb-5 flex flex-col space-y-6 py-6 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
        <PageHeading
          title="Produtos"
          description="Gerencie de forma centralizada os produtos, instituições financeiras e regras que compõem sua operação."
        />
        <div className="absolute bottom-0 right-6 ">
          <AddNewBankContent />
        </div>
      </div>

      <BanksContent />
    </div>
  )
}