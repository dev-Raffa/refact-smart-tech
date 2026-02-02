import type { ColumnDef } from "@tanstack/react-table";
import type { getRealmResponse } from "../../../types";
//import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { UpdatePartnerStatus } from "../../update-partner-status-form";

export const partnersTableColumns: ColumnDef<getRealmResponse>[] = [
    {
        id: "select",
        size: 10,
        enableResizing: false,
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
        accessorKey: "realm",
        header: "Tenant",
        enableResizing: false,
        size: 400,
        cell: ({ row }) => {
            const realm = row.original.realm;
            return (
                <div className="flex gap-2 w-full">
                    <p className="w-20 text-base h-6 rounded-2xl">{realm}</p>
                </div>
            );
        }
    },
    {
        accessorKey: "enabled",
        header: () => <div className="pl-1">Status</div>,
        enableResizing: false,
        size: 300,
        cell: ({ row }) => <UpdatePartnerStatus row={row} />
    }
]