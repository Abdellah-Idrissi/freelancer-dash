"use client"

import { cn } from "@/lib/utils";
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ComponentType } from "react"
import { Dispatch, SetStateAction } from "react";

type IconTypes = {
  className:string
}

type NavLinkTypes = {
  link: linkType
  Icon:ComponentType<IconTypes>,
  isAsideOpen?:boolean,
  setIsOpen?: Dispatch<SetStateAction<boolean>>
}

export default function NavLink({link : {href,title},Icon,isAsideOpen,setIsOpen}:NavLinkTypes) {

  const pathname = usePathname()

  return (
    <div onClick={()=> setIsOpen && setIsOpen(false)}>
      <Link href={`/${href}`} className={cn('transition-all duration-300 font-light  hover:bg-hoverColor/90 border border-transparent  p-2 rounded-md',`${isAsideOpen === false ? 'grid place-items-center' : 'flex items-center pl-3'} ${pathname === `/${href}` && 'bg-hoverColor border-neutral-200 dark:border-neutral-700/60 '}`)}>
        <Icon className={'text-[18px]'}/>
        {isAsideOpen === undefined && <span className="capitalize text-[16px] pl-5">{title}</span>}
        {isAsideOpen ? <span className="capitalize text-[16px] pl-5">{title}</span> : ''}
      </Link>
    </div>
  )
}
