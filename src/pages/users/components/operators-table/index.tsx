import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";

import { cn } from "@/utils/cn";
import { useOperators } from "../../hooks/operators-context";
import { operatorsColumns } from "./columns";
import { OperatorsTablePagination } from "../operators-pagination";
import { OperatorsTableSkeleton } from "../operators-table-skeleton";

export function OperatorsTable() {
  const {
    setTable,
    page,
    setPage,
    pageSize,
    pagination,
    setPagination,
    data,
    status,
    operatorsData
  } = useOperators();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  const table = useReactTable({
    data: operatorsData,
    //@ts-expect-error ts-migrate(2345) FIXME: Argument of type 'Operator[]' is not assignable to p... Remove this comment to see the full error message
    columns: operatorsColumns(),
    state: {
      sorting,
      columnVisibility,
      columnFilters,
      pagination,
    },
    onPaginationChange: setPagination,
    enableRowSelection: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  React.useEffect(() => {
    //@ts-expect-error ts-migrate(2345) FIXME: Argument of type 'Table<Operator>' is not assignable to... Remove this comment to see the full error message
    setTable(table);
  }, [table, setTable]);

  if (status === "pending") return <OperatorsTableSkeleton />;

  return (
    <div className="mt-3 space-y-3">
      <div className="rounded-md border-y">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className={cn(
                      header.id !== "select" && header.id !== "name"
                        ? "border-l" : "border-none"
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        cell.id.endsWith("select") || cell.id.split("_")[1] === "name"
                          ? "border-none" : "border-l"
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  )
                  )}
                </TableRow>
              )
              )) : (
              <TableRow className="w-full">
                <TableCell
                  className="h-36 text-center text-muted-foreground"
                  colSpan={8}
                >
                  Nenhum resultado relacionado aos seus operadores foi encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <OperatorsTablePagination
        currentPage={page}
        totalPages={data?.totalPages || 0}
        onPageChange={setPage}
        pageSize={pageSize}
        totalResults={operatorsData.length}
      />
    </div>
  );
}

