import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";

import { TQueryResponse } from "@/types";

function useCustomTableSkeleton<TData extends object>(
  data: TQueryResponse<TData[]> | undefined,
  columns: ColumnDef<TData>[],
  isLoading: boolean
) {
  const tableData = useMemo(() => {
    if (isLoading) {
      return Array(10).fill({} as TData);
    }

    return (data as TData[]) || [];
  }, [data, isLoading]);

  const tableColumns = useMemo(
    () =>
      isLoading
        ? columns.map((column) => ({
            ...column,
            Cell: (
              <span
                key={column.id}
                className='w-12 h-12 block bg-gray-600 rounded-full dark:bg-gray-700'
              />
            ),
          }))
        : columns,
    [columns, isLoading]
  );

  return { tableData, tableColumns };
}

export default useCustomTableSkeleton;
