"use client";

import { useAppSelector } from "@/rtk/hooks";
import Header from "../navigation/Header";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function DashWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAsideOpen = useAppSelector((state) => state.aside);
  const pathname = usePathname()

  return (
    <div className={`col-span-1  ${ isAsideOpen ? "lg:ml-[250px]" : "lg:ml-[92px]"} `}>
      <Header />

      <h1 className={cn(`font-secondFont px-[20px] lg:px-[30px] text-[45px] pt-[20px] font-semibold mb-5 text-center  capitalize`,`${pathname === '/calendar' ? 'md:text-left ' : 'sm:text-left'}`)}>
        {pathname === '/' ? 'Dashboard' : pathname.replace(/\//g, "")}
      </h1>

      {children}
    </div>
  );
}


