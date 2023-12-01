"use client"

import {useOptimistic , useMemo, useState } from "react"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  PaginationState
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTablePagination } from "./Pagination"
import DataTableFiltering from "./Filtering"
import AddClient from "./AddClient"
import ActionsDropDown from "./ActionsDropDown";
import SortingDropDown from "./Sorting";


interface DataTableProps<TData, TValue> {
  data: TData[],
  paginate:PaginationState
  sort:SortingState
  filter:ColumnFiltersState
}


export function DataTable<TData, TValue>({ data ,paginate,sort,filter}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>(sort)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(filter)
  const [pagination, setPagination] = useState<PaginationState>(paginate)
  const [tableData,setTableData] = useOptimistic(data,(_,newTableData)=> newTableData as TData[])

  const columns = useMemo(()=> {
    const columnsArr: ColumnDef<clientType>[] = [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: ({ column }) => <SortingDropDown column={column} title="Email"/>,
        cell: ({ row }) => <div className="pl-[16px]">{row.original.email}</div>,
      },
      {
        accessorKey: "country",
        header: "Country",
      },
      {
        accessorKey: "projects",
        header: ({ column }) => <SortingDropDown column={column} title="Projects"/>,
        cell: ({ row }) => <div className="pl-[19px]">{row.original.projects}</div>,
      },
      {
        accessorKey: "referralSource",
        header: "Referral Source",
      },
      {
        id: "actions",
        cell: ({ row }) => <ActionsDropDown client={row.original} clients={tableData as clientType[]} setClients={setTableData}/>,
      },
    ]

    return columnsArr as ColumnDef<TData, any>[]

  },[tableData,setTableData])


  const table = useReactTable({
    data:tableData, 
    columns, 
    getCoreRowModel: getCoreRowModel(),  
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel:getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange:setColumnFilters,
    onPaginationChange:setPagination,
    autoResetPageIndex:false,
    state: {
      sorting,
      columnFilters,
      pagination
    }
  })


  return (
    <>
      <DataTableFiltering table={table} />
      <AddClient clients={tableData as clientType[]} setTableData={setTableData}/>
      <div className="rounded-md border dark:border-neutral-700/60 ">
        <Table>

          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
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
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </>
  )
}