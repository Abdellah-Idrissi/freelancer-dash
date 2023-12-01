"use client";

import Link from "next/link";
import ThemeButton from "../buttons/ThemeButton";
import { useEffect, useState } from "react";
import SearchCommand from "./SearchCommand";
import MobileMenu from "./MobileMenu";
import UserButton from "../auth/UserButton";



export default function Header() {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`px-[20px] lg:px-[30px] z-20 py-[15px] sticky top-0  bg-bgColor dark:border-b-hoverColor border-b transition-colors duration-200 ${
        isScrolling && "glassEffect"
      }`}
    >
      <nav className="flex justify-between items-center gap-x-[10px]">
        <Link
          href={"/"}
          className={`font-secondFont lg:hidden font-bold text-textColor leading-none text-[20px] md:text-[25px] tracking-tighter transition-colors duration-200 `}
        >
          FD
        </Link>

        <SearchCommand />

        <div className="flex items-center gap-[8px]">

          <MobileMenu />
          <ThemeButton isMobile={false}/>
          

          <UserButton />
        </div>
      </nav>
    </header>
  );
}
