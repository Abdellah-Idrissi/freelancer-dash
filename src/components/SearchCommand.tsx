"use client"


import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { useEffect, useState } from 'react';
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineCalendar } from 'react-icons/ai'
import { BsPeople } from 'react-icons/bs'
import { BsFileEarmarkCode } from 'react-icons/bs'
import { AiOutlineHome } from 'react-icons/ai'
import { LuKanbanSquare } from 'react-icons/lu'


export default function SearchCommand() {

  const [open, setOpen] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleNavigating = (href:hrefTypes)=> {
    setOpen(false)
    router.push(`/${href}`)
  }

  return (
    <>
      <Button variant="outline" className="hidden lg:flex gap-x-[35px] rounded-[4px] dark:text-neutral-400 text-neutral-600 text-[13px]" 
        onClick={()=> setOpen(true)}>
          <span>Search In Dashboard...</span>
          <span className="leading-none flex items-center bg-slate-50 dark:bg-neutral-800 p-1 rounded-sm border dark:border-neutral-700/60">
            <span className="text-[10px] mr-[1px]">⌘</span>k
          </span>
      </Button>


      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Suggestions" >
            <CommandItem className="mt-2" onSelect={()=> handleNavigating("")} >
              <div className="w-full flex items-center gap-x-3">
                <AiOutlineHome className={'text-[16px]'}/> Home
              </div>
            </CommandItem>
            
            <CommandItem onSelect={()=> handleNavigating("kanban")}>
              <div className="w-full flex items-center gap-x-3"> 
                <LuKanbanSquare className={'text-[16px]'}/>  Kanban
              </div>
            </CommandItem>

            <CommandItem onSelect={()=> handleNavigating("calendar")}>
              <div className="w-full flex items-center gap-x-3">
                <AiOutlineCalendar className={'text-[16px]'}/> Calendar
              </div>
            </CommandItem>


            <CommandItem onSelect={()=> handleNavigating("clients")}>
              <div className="w-full flex items-center gap-x-3">
                <BsPeople className={'text-[16px]'}/> Clients
              </div>
            </CommandItem>


            <CommandItem className="mb-1" onSelect={()=> handleNavigating("projects")}>
              <div className="w-full flex items-center gap-x-3">
                <BsFileEarmarkCode className={'text-[16px]'}/> Projects
              </div>
            </CommandItem>

          </CommandGroup>

        </CommandList>
      </CommandDialog>


    </>
  )
}
