import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Button } from "../ui/button"
import { Table } from "@tanstack/react-table"
import { useRouter, useSearchParams } from "next/navigation"
import { addQuery, addSizeQuery } from "@/helpers/handleQueries"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export function DataTablePagination<TData>({table}: DataTablePaginationProps<TData>) {

  const router = useRouter()
  const searchParams = useSearchParams()

  const handleNextPage = ()=> {
    router.push(`/clients?${addQuery('pageInd',table.getState().pagination.pageIndex + 1,searchParams)}`,{scroll:false})
    table.nextPage()
  }

  const handlePrevPage = () => {
    router.push(`/clients?${addQuery('pageInd',table.getState().pagination.pageIndex - 1,searchParams)}`,{scroll:false})
    table.previousPage()
  }

  const handlePageSize = (value:string)=> {
    table.setPageSize(Number(value))
    table.setPageIndex(0)
    router.push(`/clients?${addSizeQuery(value,searchParams)}`,{scroll:false})
  }

  return (
    <div className="flex items-center justify-center sm:justify-between gap-5 gap-y-3 pt-4 flex-wrap">

      <div className="flex items-center space-x-2 ">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => handlePageSize(value)}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 15, 20, 25].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
      </div>

      <Button variant={'outline'} className="flex items-center justify-center text-sm font-medium order-1">
        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </Button>

      <div className="flex gap-x-2 ">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevPage}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNextPage}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>

    </div>
  )
}
