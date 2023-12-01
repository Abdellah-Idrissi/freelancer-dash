"use client";

import { useAppDispatch, useAppSelector } from "@/rtk/hooks";
import { toggleAside } from "@/rtk/slices/aside/aside-slice";
import Link from "next/link";
import {
  HiOutlineArrowLeftOnRectangle,
  HiMiniArrowRightOnRectangle,
} from "react-icons/hi2";
import NavLink from "./NavLink";
import { mobileLinks } from "@/arrays/links";
import { LuKanbanSquare } from "react-icons/lu";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsPeople, BsPersonLock } from "react-icons/bs";
import { BsFileEarmarkCode } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import SignOutButton from "../auth/auth_buttons/SignOutButton";



export default function Aside() {
  const dispatch = useAppDispatch();
  const isAsideOpen = useAppSelector((state) => state.aside);

  return (
    <aside
      className={`hidden px-[20px] z-30 border-r dark:border-r-hoverColor shadow-lg transition-all duration-300 lg:flex flex-col p-4 py-5 bg-bgColor h-screen fixed top-0 ${
        isAsideOpen && "w-[250px]"
      }`}
    >
      <Link
        href={"/"}
        className={`font-secondFont block text-center  cursor-pointer font-bold text-textColor leading-none text-[20px] md:text-[25px] tracking-tighter transition-colors duration-200 `}
      >
        FD
      </Link>

      <div
        onClick={() => dispatch(toggleAside())}
        className="rounded-md h-[25px] w-[27px] absolute top-[21px] hover:bg-[#ecececee] transition-colors duration-200 cursor-pointer bg-slate-100 grid place-items-center -right-[15px] dark:bg-neutral-800 dark:hover:bg-[#202020]"
      >
        {isAsideOpen ? (
          <HiOutlineArrowLeftOnRectangle size={17} />
        ) : (
          <HiMiniArrowRightOnRectangle size={15} />
        )}
      </div>

      <div className="mt-7 flex flex-col justify-between flex-1">
        <div className="flex flex-col gap-y-[20px]">
          <NavLink
            link={mobileLinks[0]}
            Icon={AiOutlineHome}
            isAsideOpen={isAsideOpen}
          />
          <NavLink
            link={mobileLinks[1]}
            Icon={LuKanbanSquare}
            isAsideOpen={isAsideOpen}
          />
          <NavLink
            link={mobileLinks[2]}
            Icon={AiOutlineCalendar}
            isAsideOpen={isAsideOpen}
          />
          <NavLink
            link={mobileLinks[3]}
            Icon={BsPeople}
            isAsideOpen={isAsideOpen}
          />
          <NavLink
            link={mobileLinks[4]}
            Icon={BsFileEarmarkCode}
            isAsideOpen={isAsideOpen}
          />
        </div>

        <SignOutButton isMobile={false} />
      </div>
    </aside>
  );
}
