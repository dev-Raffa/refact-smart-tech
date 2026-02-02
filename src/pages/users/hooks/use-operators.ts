import * as React from "react";

import type { Table } from "@tanstack/react-table";
import type { Operator } from "../types";
import { operators } from "../consts";

export function useOperatorsData() {
  const [table, setTable] = React.useState<Table<Operator> | null>(null);
  const [page, setPage] = React.useState(1);
  const [pageSize] = React.useState(60);

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 100
  });

  const data =  operators

  const operatorsData = React.useMemo(
    () => data?.results.flatMap((result) => result) || [],
    [data]
  );

  return {
    table,
    setTable,
    page,
    setPage,
    pageSize,
    pagination,
    setPagination,
    data,
    status,
    operatorsData
  };
}