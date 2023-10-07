import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { GoPeople , GoPerson } from 'react-icons/go'
import { BsFileEarmarkCode , BsFileEarmarkCheck , BsFileEarmarkBreak } from 'react-icons/bs'



export default function Cards() {
  return (
    <div className="grid grid-cols-1 grid-rows-4 sm:grid-cols-2 sm:grid-rows-2 xxl:grid-cols-4 xxl:grid-rows-1 gap-5">
        <Card className="px-6 py-4 ">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-[16px] flex items-center justify-between">
              <span>Total Clients </span>
              <GoPeople size={13}/>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <div className="text-[40px] leading-none flex items-end gap-x-[6px]">
              <span className=" leading-none">2000</span>
            </div>
            <p className="transition-colors duration-300 text-[11px] -mt-[2px] dark:text-neutral-400 text-neutral-500/80 group-hover:text-neutral-400 dark:group-hover:text-neutral-500/80">Number of clients you worked with</p>
          </CardContent>
        </Card>

        <Card className="px-6 py-4 ">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-[16px] flex items-center justify-between">
              <span>Total Projects </span>
              <BsFileEarmarkCode size={13}/>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <div className="text-[40px] leading-none flex items-end gap-x-[6px]">
              <span className=" leading-none">300</span>
            </div>
            <p className="text-[11px] transition-colors duration-300 -mt-[2px] dark:text-neutral-400 text-neutral-500/80 group-hover:text-neutral-400 dark:group-hover:text-neutral-500/80">Number of projects you&apos;ve done</p>
          </CardContent>
        </Card>

        <Card className="px-6 py-4 ">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-[16px] flex items-center justify-between">
              <span>Active Projects</span>
              <BsFileEarmarkBreak size={13}/>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <div className="text-[40px] leading-none flex items-end gap-x-[6px]">
              <span className=" leading-none">2000</span>
            </div>
            <p className="text-[11px] transition-colors duration-300 -mt-[2px] dark:text-neutral-400 text-neutral-500/80 group-hover:text-neutral-400 dark:group-hover:text-neutral-500/80">Number of projects you still working on</p>
          </CardContent>
        </Card>

        <Card className="px-6 py-4 ">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-[16px] flex items-center justify-between">
              <span>Completed Projects </span>
              <BsFileEarmarkCheck size={13}/>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <div className="text-[40px] leading-none flex items-end gap-x-[6px]">
              <span className=" leading-none">10</span>
            </div>
            <p className="text-[11px] transition-colors duration-300 -mt-[2px] dark:text-neutral-400 text-neutral-500/80 group-hover:text-neutral-400 dark:group-hover:text-neutral-500/80">Number of projects you completed</p>
          </CardContent>
        </Card>
    </div>
  )
}
