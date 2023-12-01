import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { GoPeople } from 'react-icons/go'
import { LiaCalendarMinusSolid, LiaClipboardListSolid } from 'react-icons/lia'
import { BsFileEarmarkCheck, BsFiles } from 'react-icons/bs'
import {  TbListCheck} from 'react-icons/tb'
import { AiOutlineCalendar, AiTwotoneCalendar } from "react-icons/ai"
import { ImFilesEmpty } from "react-icons/im"




type propsTypes = {
  totalClients:number
  totalEvents:number
  totalProjects:number
  totalTasks:number
}

export default function Cards({totalClients,totalEvents,totalProjects,totalTasks}:propsTypes) {

  return (
    <div className="grid grid-cols-1 grid-rows-4 sm:grid-cols-2 sm:grid-rows-2 xxl:grid-cols-4 xxl:grid-rows-1 gap-5">
      <Card className="px-6 py-4 ">
        <CardHeader className="p-0 pb-4">
          <CardTitle className="text-[16px] flex items-center justify-between">
            <span>Total Tasks</span>
            <TbListCheck size={15}/>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="text-[40px] leading-none flex items-end gap-x-[6px]">
            <span className=" leading-none">{totalTasks}</span>
          </div>
          <p className="transition-colors duration-300 text-[11px]  dark:text-neutral-400 text-neutral-500/80 group-hover:text-neutral-400 dark:group-hover:text-neutral-500/80">Number of all the tasks you have</p>
        </CardContent>
      </Card>



      <Card className="px-6 py-4 ">
        <CardHeader className="p-0 pb-4">
          <CardTitle className="text-[16px] flex items-center justify-between">
            <span>Total Events </span>
            <AiOutlineCalendar size={15} />
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="text-[40px] leading-none flex items-end gap-x-[6px]">
            <span className=" leading-none">{totalEvents}</span>
          </div>
          <p className="text-[11px] transition-colors duration-300  dark:text-neutral-400 text-neutral-500/80 group-hover:text-neutral-400 dark:group-hover:text-neutral-500/80">Number of all the events you have</p>
        </CardContent>
      </Card>

      <Card className="px-6 py-4 ">
        <CardHeader className="p-0 pb-4">
          <CardTitle className="text-[16px] flex items-center justify-between">
            <span>Total Clients</span>
            <GoPeople size={14}/>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="text-[40px] leading-none flex items-end gap-x-[6px]">
            <span className=" leading-none">{totalClients}</span>
          </div>
          <p className="text-[11px] transition-colors duration-300  dark:text-neutral-400 text-neutral-500/80 group-hover:text-neutral-400 dark:group-hover:text-neutral-500/80">Number of all the clients you have</p>
        </CardContent>
      </Card>

      <Card className="px-6 py-4 ">
        <CardHeader className="p-0 pb-4">
          <CardTitle className="text-[16px] flex items-center justify-between">
            <span>Total Projects </span>
            <ImFilesEmpty size={13}/>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="text-[40px] leading-none flex items-end gap-x-[6px]">
            <span className=" leading-none">{totalProjects}</span>
          </div>
          <p className="text-[11px] transition-colors duration-300  dark:text-neutral-400 text-neutral-500/80 group-hover:text-neutral-400 dark:group-hover:text-neutral-500/80">Number of all the projects you have</p>
        </CardContent>
      </Card>
    </div>
  )
}