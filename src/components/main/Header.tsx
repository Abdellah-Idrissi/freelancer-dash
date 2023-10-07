"use client"

import Link from "next/link";
import ThemeButton from "../buttons/ThemeButton";
import Menu from "../mobile-nav/menu";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/rtk/hooks";
import SearchCommand from "../SearchCommand";


type HeaderTypes = {
  font:string
}

export default function Header({font}:HeaderTypes) {

  const [isScrolling, setIsScrolling] = useState(false)
  const isAsideOpen = useAppSelector(state=> state.aside)


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])


  return (
    <header className={`px-[20px] lg:px-[30px] py-[15px] sticky top-0  bg-bgColor dark:border-b-hoverColor border-b transition-colors duration-200 ${isScrolling && 'glassEffect'}`}>
      <nav className="flex justify-between items-center gap-x-[10px]">

        <Link href={'/'} className={`${font} lg:hidden font-bold text-textColor leading-none text-[20px] md:text-[25px] tracking-tighter transition-colors duration-200 `}>
          FD
        </Link>

        <SearchCommand />


        <div className="flex items-center gap-[8px]">


          <div className="mr-2 cursor-pointer lg:order-1 lg:mr-0 lg:ml-2 lg:mt-0 mt-[1px] bg-gradient-to-r from-teal-500 via-cyan-600 to-blue-700 w-[20px] h-[20px] rounded-full md:w-[24px] md:h-[24px] lg:w-[26px] lg:h-[26px]">
          </div>
          
          <Menu font={font}/>
          
          <ThemeButton/>

        </div>

      </nav>
    </header>
  )
}
