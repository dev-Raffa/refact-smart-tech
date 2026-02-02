import { Input } from "@/components/ui/input";
import { MailIcon, UserIcon } from "lucide-react";
import { UpdateDailyOperation } from "../update-dayli-operation";
import { useOperators } from "../../hooks/operators-context";
export function OperatorsFilters() {
  const { table } = useOperators();

  if (!table) return;

  return (
    <div className="w-full py-8 flex flex-col items-center space-y-4 px-4 sm:flex-row sm:space-y-0 sm:gap-4 sm:pl-6 sm:pr-4">
      <div className="relative flex-1 w-full sm:max-w-72 xl:max-w-80">
        <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4" />
        <Input
          className="pl-9 h-9 w-full"
          placeholder="Digite o nome do operador"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)}
        />
      </div>

      <div className="relative flex-1 w-full sm:max-w-72 xl:max-w-80">
        <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4" />
        <Input
          className="pl-9 h-9 w-full"
          placeholder="Digite o e-mail do operador"
          value={(table.getColumn("username")?.getFilterValue() as string) ?? ""}
          onChange={(e) => table.getColumn("username")?.setFilterValue(e.target.value)}
        />
      </div>

      <UpdateDailyOperation />
    </div>
  )
}