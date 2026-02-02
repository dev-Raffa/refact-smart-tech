import { DataTable, DataTableContent,  DataTableSelectFilter, DataTableTextFilter, PaginationControllers } from "@/components/shared/datatable";
import { partnersTableColumns } from "./columns";
import { getCoreRowModel, getExpandedRowModel, getFilteredRowModel, getGroupedRowModel, getPaginationRowModel, getSortedRowModel } from "@tanstack/react-table";
import type { getRealmResponse } from "../../types";

export const PartnersTable = ({ partners }: { partners: getRealmResponse[] }) => {
    const options = {
        columns: partnersTableColumns,
        data: partners,
        initialState: {
            pagination: {
                pageSize: 10
            }
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getExpandedRowModel: getExpandedRowModel()
    }
    return (
        <DataTable tableOptions={options} >
            <div className="relative min-h-full pb-16">
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between bg-card rounded-sm ">
                    <div className="flex flex-1 flex-col sm:flex-row gap-4 sm:justify-between w-full lg:w-auto">
                        <DataTableTextFilter placeholder="Buscar por nome" column="realm" className="max-w-150 items-center flex" />
                        <DataTableSelectFilter
                            column="enabled"
                            placeholder="Status"
                            className="py-3"
                            options={[
                                {
                                    value: 'all',
                                    label: 'Todos os tipos'
                                },
                                {
                                    value: true,
                                    label: 'Ativo'
                                },
                                {
                                    value: false,
                                    label: 'Inativo'
                                }
                            ]}
                        />
                    </div>
                </div>

                <section className="my-2.5 border rounded-sm  overflow-hidden">
                    <DataTableContent />
                </section>

                <section className="absolute bottom-0 left-0 right-0 w-full py-2">
                    <PaginationControllers />
                </section>
            </div>
        </DataTable>
    );
};