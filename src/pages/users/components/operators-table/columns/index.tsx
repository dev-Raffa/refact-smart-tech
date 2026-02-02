import { Checkbox } from "@/components/ui/checkbox";
//import { maskPascalCase } from "@/utils/masks/mask-pascal-case";
import { maskPhone } from "@/utils/masks/mask-phone";
import type { ColumnDef } from "@tanstack/react-table";
import { EditOperatorPhoneNumber } from "../../edit-operator-phone-number";
import { UpdateOperatorStatus } from "../../update-operator-status";
import type { Operator } from "@/pages/users/types";

export const operatorsColumns = (): ColumnDef<Operator>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Selecionar tudo"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Selecione uma linha"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "worker.name",
    id: "name",
    header: () => (
      <div className="text-sm">Operador</div>
    ),
    cell: ({ row }) => {
      const name: string = row.original.worker?.name;

      return (
        <div className="text-xs truncate sm:text-sm">
          {name}
        </div>
      );
    },
  },
  {
    accessorKey: "worker.username",
    id: "username",
    header: () => <div className="text-sm truncate">E-mail</div>,
    cell: ({ row }) => (
      <div className="text-xs truncate sm:text-sm">
        {row.original.worker?.username}
      </div>
    ),
  },
  {
    accessorKey: "worker.phonenumber",
    id: "phonenumber",
    header: () => (
      <div className="text-sm">Telefone</div>
    ),
    cell: ({ row }) => {
      const phoneNumber = row.original.worker?.phonenumber;
      const maskedPhoneNumber = phoneNumber ? maskPhone(phoneNumber) : "Não informado";

      return (
        <div className="text-xs truncate sm:text-sm">
          {maskedPhoneNumber}
        </div>
      )
    }
  },
  {
    accessorKey: "isActive",
    header: () => (
      <>
        <div className="text-sm text-center sm:hidden">Status</div>
        <div className="hidden sm:flex text-sm text-center">Status do operador</div>
      </>
    ),
    cell: ({ row }) => <UpdateOperatorStatus row={row} />
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-sm text-center">Ações</div>,
    cell: ({ row }) => <EditOperatorPhoneNumber row={row} />
  },
];
