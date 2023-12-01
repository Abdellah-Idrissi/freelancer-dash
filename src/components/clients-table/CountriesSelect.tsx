"use client"

import {Dispatch, SetStateAction, useState} from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { countries } from "@/arrays/countries"



type propsTypes = {
  isEditClient:boolean
  clientCountry?: string
  selectedCountry:string
  setSelectedCountry:Dispatch<SetStateAction<string>>
}

export function CountriesSelect({isEditClient,clientCountry,selectedCountry,setSelectedCountry}:propsTypes) {

  const [isOpen,setIsOpen] = useState(false)

  const handleOnSelect = (country:string)=> {
    setIsOpen(false)
    setSelectedCountry(country)
  }


  return (

    <Popover open={isOpen} onOpenChange={setIsOpen} modal={true} >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className=" justify-between font-medium text-textColor px-3 w-full col-span-3 text-[13px]"
        >
          {selectedCountry ? selectedCountry : isEditClient ?  clientCountry : "select Client's country"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="popoverSelectWith  p-0 ">
        <Command className="">
          <CommandInput placeholder="Search Country..." className="h-9" />
          <CommandEmpty>Country not found.</CommandEmpty>
          <CommandGroup className="max-h-[200px] overflow-y-auto  ">
            <div className="flex flex-col gap-y-1">
              {
                countries.map(({code,name}) => 
                  <CommandItem className={`flex items-center gap-x-[6px]`} key={code} onSelect={()=> handleOnSelect(name)}>
                    <span className={`fi fi-${code} w-[18px] h-[18px]`}></span>
                    {name}

                    <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      isEditClient ? name === selectedCountry ? "opacity-100" : "opacity-0" : name === selectedCountry || clientCountry === name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  </CommandItem>
                )
              }
            </div>

          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
