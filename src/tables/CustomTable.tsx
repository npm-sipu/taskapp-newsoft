"use client";

import React from "react";

import { Text } from "@/components/Common/Text";
import { useRouter } from "next/navigation";

import {
  ArrowSmallDownIcon,
  ArrowSmallUpIcon,
  ArrowsUpDownIcon,
} from "@heroicons/react/24/outline";
import { rankItem } from "@tanstack/match-sorter-utils";
import {
  ColumnDef,
  FilterFn,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { MAX_PAGE_SIZE } from "@/utils/contsants";
import { FilterInputBox } from "./FilterInputBox";
import TablePagination from "./TablePagination";
import { TCommonResponseSchema } from "@/schemas/common.schema";

interface ICustomTable<Data extends object> {
  data: Data[];
  columns: ColumnDef<Data>[];
  isLoading: boolean;
  searchProps: {
    placeholder: string;
    className?: string;
  };
  modalButton?: React.ReactNode;
  title?: string | React.ReactNode;
  centerAlignedColumns?: string[];
  showWarningParam?: string;
  tableSubHeader?: string | React.ReactNode;
  showPagination?: boolean;
  showGlobalFilter?: boolean;
  pageNumbers?: Number;
  showAdditionalFilters?: boolean;
  additionalFilters?: React.ReactNode;
  ShowPageSizeMenu?: boolean;
  showSearchMenu?: boolean;
  tableActionButton?: React.ReactNode;
  statusFilter?: React.ReactNode;
  customheight?: TCommonResponseSchema;
}

// A debounced input react component

function CustomTable<Data extends object>(props: ICustomTable<Data>) {
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const {
    columns,
    data,
    isLoading,
    searchProps,
    modalButton,
    title,
    showWarningParam,
    tableSubHeader,
    showPagination,
    tableActionButton,
    statusFilter,
    customheight,
    centerAlignedColumns = [],
    showGlobalFilter = true,
    showAdditionalFilters,
    additionalFilters,
    ShowPageSizeMenu,
    showSearchMenu,
  } = props;

  const navigate = useRouter();

  const fuzzyFilter: FilterFn<Data> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the itemRank info
    addMeta({
      itemRank,
    });

    // Return if the item should be filtered in/out
    return itemRank.passed;
  };

  let pagination = showPagination
    ? {
        pagination: {
          pageSize: MAX_PAGE_SIZE,
        },
      }
    : {};

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
    initialState: pagination,
  });

  return (
    <div className='w-full p-1'>
      <div className='flex  	items-center flex-wrap gap-2'>
        <Text as='h3' className=''>
          {title || ""}
        </Text>
      </div>
      <div
        className={"flex flex-wrap gap-6 mb-6 " + `${searchProps.className}`}
      >
        <div className={"flex flex-wrap  gap-4 " + `${searchProps.className}`}>
          {showSearchMenu && (
            <FilterInputBox
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              placeholder={`${searchProps.placeholder}`}
            />
          )}
          {statusFilter}
        </div>
        {tableActionButton}
        {modalButton && modalButton}
      </div>
      {tableSubHeader && (
        <div className='mt-10'>
          <Text as='h3'>{tableSubHeader}</Text>
        </div>
      )}
      <div className='flow-root mt-6 rounded-sm overflow-auto overflow-y-hidden'>
        <div className={` ${customheight}`}>
          <div className='inline-block min-w-full border pb-4 bg-lightbgwhite shadow-custom rounded-md align-middle  '>
            <table className='w-full    divide-y divide-lightgrey'>
              <thead className=''>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className='rounded-sm '>
                    {headerGroup.headers.map((header) => (
                      <th
                        scope='col'
                        className=' border-b border-gray-300 w-fit rounded-md bg-lightbgwhite py-6 pl-4 pr-3 text-left text-sm font-semibold text-darkgrey backdrop-blur  sm:pl-6'
                        key={header.id}
                        colSpan={header.colSpan}
                      >
                        {header.isPlaceholder ? null : (
                          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                          <div
                            {...{
                              className: `${
                                header.column.getCanSort() &&
                                header.id !== "action"
                                  ? "cursor-pointer w-full select-none flex gap-1  items-center"
                                  : "flex w-full gap-1 items-center"
                              }
															${centerAlignedColumns.includes(header.id) ? " justify-center " : ""}
															`,
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header.id !== "action" &&
                              header.column.getCanSort() &&
                              ({
                                asc: (
                                  <ArrowSmallUpIcon className='h-4 text-primary' />
                                ),
                                desc: (
                                  <ArrowSmallDownIcon className='h-4 text-primary' />
                                ),
                              }[header.column.getIsSorted() as string] ?? (
                                <ArrowsUpDownIcon className='h-4 text-primary' />
                              ))}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className=' bg-white'>
                {table.getRowModel().rows.map((row) => {
                  let showWarning;
                  row.getVisibleCells().forEach((cell) => {
                    showWarning = !!(
                      cell.id.split("_").pop() === showWarningParam &&
                      cell.getValue() === true
                    );
                  });
                  return (
                    <tr
                      key={row.id}
                      className={`border-b border-lightgrey ${
                        showWarning ? "bg-lightred" : ""
                      }`}
                    >
                      {row.getVisibleCells().map((cell) =>
                        isLoading ? (
                          <td
                            className=' border-b border-gray-200 animate-pulse py-3.5 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'
                            key={cell.id}
                          >
                            <span
                              key={cell.id}
                              className='w-64 h-10 block bg-lightgrey dark:bg-gray-700 bg-gradient-to-'
                            />
                          </td>
                        ) : (
                          <td
                            className=' py-4 pl-4 pr-3 text-sm font-medium text-darkgrey sm:pl-6'
                            key={cell.id}
                            style={{ overflowWrap: "anywhere" }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell
                                ? cell.column.columnDef.cell
                                : "NA",
                              cell.getContext()
                            )}
                          </td>
                        )
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {showPagination && (
          <TablePagination
            onNextPage={() => table.nextPage()}
            onPreviousPage={() => table.previousPage()}
            canNextPage={!table.getCanNextPage()}
            canPrevPage={!table.getCanPreviousPage()}
            pageNumber={table.getState().pagination.pageIndex}
            totalRecord={table.getFilteredRowModel().rows.length}
          />
        )}
      </div>
    </div>
  );
}

export default CustomTable;
