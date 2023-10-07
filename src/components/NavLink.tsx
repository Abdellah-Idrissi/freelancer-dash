"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ComponentType } from "react"


type IconTypes = {
  className:string
}

type NavLinkTypes = {
  link: linkType
  Icon:ComponentType<IconTypes>,
  isAsideOpen?:boolean
}

export default function NavLink({link : {href,title},Icon,isAsideOpen}:NavLinkTypes) {

  const pathname = usePathname()

  return (
    <Link href={`/${href}`} className={`transition-all duration-300 font-light  hover:bg-hoverColor p-2 rounded-md ${isAsideOpen === false ? 'grid place-items-center' : 'flex items-center'} ${pathname === `/${href}` && 'bg-hoverColor'}`}>
      <Icon className={'text-[18px]'}/>
      {isAsideOpen === undefined && <span className="capitalize text-[16px] pl-5">{title}</span>}
      {isAsideOpen ? <span className="capitalize text-[16px] pl-5">{title}</span> : ''}
    </Link>
  )
}
