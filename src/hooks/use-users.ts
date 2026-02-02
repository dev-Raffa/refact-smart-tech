import * as React from "react";

import { useQuery } from "@tanstack/react-query";
import type { Table } from "@tanstack/react-table";
import type { UserFilterState, Users } from "../types/users";
import { AuthService } from "../services/auth-service";

export function useUsersData() {
  const [table, setTable] = React.useState<Table<Users> | null>(null);
  const [page, setPage] = React.useState(1);
  const [pageSize] = React.useState(200);
  const [filters, setFilters] = React.useState<UserFilterState | undefined>(undefined);

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 100
  });

  const { data, status, refetch } = useQuery({
    queryKey: ["get-all-users", page, pageSize, filters],
    queryFn: async () => {
      if (filters) {
        const response = await AuthService.getUsersByFilters(filters);

        return {
          results: response,
          totalPages: 1,
          totalResults: response.length,
        };
      } else {
        return await AuthService.getUsersPaginated(page, pageSize)
      }
    },
    retry: 1
  });

  const usersData = data?.results

  const handleUserFilter = async (filter: UserFilterState) => {
    setFilters(filter);
    setPage(1);
    await refetch();
  };

  const clearUserFilter = async () => {
    setFilters(undefined);
    setPage(1);
    await refetch();
  };

  return {
    table,
    setTable,
    page,
    setPage,
    pageSize,
    filters,
    pagination,
    setPagination,
    data,
    status,
    usersData,
    handleUserFilter,
    clearUserFilter
  };
}