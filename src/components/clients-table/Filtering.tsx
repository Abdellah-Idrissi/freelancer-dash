import { Table } from "@tanstack/react-table"
import { Input } from "../ui/input"
import {  LuX } from "react-icons/lu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { referralSources } from "@/arrays/referralSources";
import { Button } from "../ui/button";
import { ChangeEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { addTwoQueries, addQuery, removeQuery } from "@/helpers/handleQueries";
import { BiSearchAlt } from "react-icons/bi";

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export default function DataTableFiltering<TData>({table}: DataTablePaginationProps<TData>) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectValue, setSelectValue] = useState<string>(searchParams.get('referralSource') ? searchParams.get('referralSource') as string : '')
  const [nameInput,setNameInput] = useState(searchParams.get('nameSearch') ? searchParams.get('nameSearch') as string : '')
  const nameColumn = table.getColumn('name')
  const referralSourceColumn = table.getColumn('referralSource') 

  const handleInputChange = (e:ChangeEvent<HTMLInputElement>)=> {
    if(e.target.value === '') return resetNameColumn()
    setNameInput(e.target.value)
  }

  const filterNameColumn = ()=> {
    router.push(`/clients?${addTwoQueries('nameSearch',nameInput,'pageInd','0',searchParams)}`,{scroll:false})
    nameColumn?.setFilterValue(nameInput)
    table.setPageIndex(0)
  }

  const resetNameColumn = ()=> {
    router.push(`/clients?${removeQuery('nameSearch',searchParams)}`,{scroll:false})
    nameColumn?.setFilterValue('')
    setNameInput('')
  }

  const filterReferralSourceColumn = (e:string)=> {
    router.push(`/clients?${addQuery('referralSource',e,searchParams)}`,{scroll:false})
    referralSourceColumn?.setFilterValue(e)
    setSelectValue(e)
  }

  const resetReferralSourceColumn = ()=> {
    router.push(`/clients?${removeQuery('referralSource',searchParams)}`,{scroll:false})
    referralSourceColumn?.setFilterValue('')
    setSelectValue('')
  }

  return (
    <div className="flex flex-col md:flex-row md:justify-between mb-4 flex-wrap gap-4 ">

      {/* SEARCH FILTER BY NAME */}
      <div className="flex items-center gap-3">

        <div className="w-full  md:w-[250px] relative">

          <Input
            placeholder="Filter by name..."
            value={nameInput}
            onChange={handleInputChange}
          />

          {
            nameInput && 
            <span onClick={resetNameColumn} className="cursor-pointer absolute right-[12px] top-[10px] hover:opacity-90 transition-colors">
              <LuX className={'h-[13px] w-[13px] mt-[2px]'}/>
            </span>
          }

        </div>

        {
          nameInput && 
          <Button 
            variant={'outline'} 
            onClick={filterNameColumn} 
            className=" flex items-center gap-2 " 
          >
            <BiSearchAlt className={'h-[14px] w-[14px] mt-[2px]'}/>
          </Button>
        }

      </div>

      {/* SELECT FILTER BY REFERRAL SOURCE */}
      <div className="flex items-center gap-3  ">

        <Select value={selectValue} onValueChange={(e) => filterReferralSourceColumn(e)}>
          <SelectTrigger className="w-full md:w-[250px] order-none md:order-1">
            <SelectValue placeholder={'Filter by referral source'} />
          </SelectTrigger>
          <SelectContent className="w-full " >
            {referralSources.map((source) => (
              <SelectItem key={source} value={source}>
                {source}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {
          referralSourceColumn?.getIsFiltered() && 
          <Button 
            variant={'outline'} 
            onClick={resetReferralSourceColumn} 
            className=" flex items-center gap-2 " 
          >
            <LuX className={'h-[13px] w-[13px] mt-[2px] '}/>
          </Button>
        }

      </div>

    </div>
  )
}