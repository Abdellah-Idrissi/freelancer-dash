"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react"
import { TbMenu2 } from "react-icons/tb"
import NavLink from "../NavLink"
import { LuKanbanSquare } from 'react-icons/lu'
import { AiOutlineCalendar } from 'react-icons/ai'
import { BsPeople } from 'react-icons/bs'
import { BsFileEarmarkCode } from 'react-icons/bs'
import { AiOutlineHome } from 'react-icons/ai'
import { mobileLinks } from "@/arrays/links"
import SignOutButton from "../auth_buttons/SignOutButton"





type MenuTypes = {
  font:string
}

export default function Menu({font}:MenuTypes) {
  const [isOpen,setIsOpen] = useState(false)
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="lg:hidden">
        <div className="iconHover">
          <TbMenu2 className={'text-[19px] md:text-[21px]'}/>
        </div>
      </SheetTrigger>
      
      <SheetContent side={'left'} className="w-full !max-w-[300px] pb-[20px] flex flex-col">

        <SheetHeader className="!text-center">
          <SheetTitle className={`${font} mt-5 text-[24px]`}>NAVIGATION</SheetTitle>
        </SheetHeader>


        <div className="mt-7 flex flex-col justify-between flex-1">

          <div className="flex flex-col gap-y-[20px]">
            <NavLink link={mobileLinks[0]} Icon={AiOutlineHome}/>
            <NavLink link={mobileLinks[1]} Icon={LuKanbanSquare}/>
            <NavLink link={mobileLinks[2]} Icon={AiOutlineCalendar}/>
            <NavLink link={mobileLinks[3]} Icon={BsPeople}/>
            <NavLink link={mobileLinks[4]} Icon={BsFileEarmarkCode}/>
          </div>

          <SignOutButton/>

        </div>



      </SheetContent>
    </Sheet>

  )
}

