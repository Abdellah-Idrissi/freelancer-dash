import { Column } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Separator } from "../ui/separator";
import { BiReset } from "react-icons/bi";
import { FaArrowDownShortWide , FaArrowDownWideShort } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter, useSearchParams } from "next/navigation";
import { addEmailQuery, addProjectsQuery, removeSortQuery } from "@/helpers/handleQueries"



type propsTypes = {
  column: Column<clientType, unknown>
  title:string
}
export default function SortingDropDown({column,title}:propsTypes) {

  const router = useRouter()
  const searchParams = useSearchParams()

  const handleAsc = ()=> {
    const id = column.id

    id === 'projects' ? 
    router.push(`clients/?${addProjectsQuery('asc',searchParams)}`,{scroll:false}) :
    router.push(`clients/?${addEmailQuery('asc',searchParams)}`,{scroll:false})
    column.toggleSorting(false)
  }

  const handleDesc = ()=> {
    const id = column.id

    id === 'projects' ? 
    router.push(`clients/?${addProjectsQuery('desc',searchParams)}`,{scroll:false}) :
    router.push(`clients/?${addEmailQuery('desc',searchParams)}`,{scroll:false})

    column.toggleSorting(true)
  }

  const handleReset = ()=> {
    router.push(`clients?${removeSortQuery(searchParams)}`,{scroll:false})
    column.clearSorting()
  }


  return (
    <>
      <DropdownMenu >

        <DropdownMenuTrigger asChild>
          <Button className="rounded-sm w-full !justify-start m-1 hover:bg-slate-100/80 " variant="ghost">
            {title} 
            {
              column.getIsSorted() === false ?  <ArrowUpDown className="ml-2 h-[14px] w-[14px]"/> : 
              column.getIsSorted() === 'asc' ? <FaArrowDownShortWide className="ml-2 h-[14px] w-[14px]"/> : <FaArrowDownWideShort className="ml-2 h-[14px] w-[14px]"/> 
            }
          </Button>
        </DropdownMenuTrigger>


        <DropdownMenuContent className="p-0 w-[100px]" align="start">

          <div className="p-1">
            <DropdownMenuItem asChild onSelect={handleAsc}>
              <Button className="flex !justify-start items-center w-full px-[4px] gap-x-[6px] py-2 text-[14px]" variant="ghost" >
                <ArrowUp className="ml-2 h-[14px] w-[13px] " /> Asc
              </Button>
            </DropdownMenuItem>


            <DropdownMenuItem asChild onSelect={handleDesc}>
              <Button className="flex !justify-start items-center w-full px-[4px] gap-x-[6px] py-2 text-[14px]" variant="ghost">
                <ArrowDown className="ml-2 h-[14px] w-[13px] " /> Desc
              </Button>
            </DropdownMenuItem>

          </div>

          <Separator />

          <div className="p-1">
            <DropdownMenuItem asChild onSelect={handleReset}>
              <Button className="flex !justify-start items-center w-full px-[4px] gap-x-1 py-2 text-[14px]" variant="ghost" >
                <BiReset className="ml-2 mb-[2px] h-[14px] w-[14px] " /> Reset
              </Button>
            </DropdownMenuItem>
          </div>

        </DropdownMenuContent>
      </DropdownMenu>
    </>

  )
}
