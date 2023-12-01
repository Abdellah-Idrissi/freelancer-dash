import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@clerk/nextjs";

export default function CalendarLoading() {
  const {userId} = auth()

  if(!userId) {
    return <></>
  }

  return (
    <div className="px-[20px] lg:px-[30px] flex flex-col gap-5 pb-5 ">

      <div className="flex flex-col gap-3 items-center md:flex-row  md:justify-between  ">
        <div className="flex gap-3">
          <div className="flex rounded-md overflow-hidden ">
            <Skeleton className="w-[47.5px] h-[40px] grid place-items-center rounded-none">
              <Skeleton className="w-[20px] h-[20px] bg-slate-300/50  " />
            </Skeleton>
            <Skeleton className="w-[47.5px] h-[40px] grid place-items-center rounded-none">
              <Skeleton className="w-[20px] h-[20px] bg-slate-300/50" />
            </Skeleton>
          </div>

          <Skeleton className="w-[63px] h-[40px] grid place-items-center">
            <Skeleton className="w-[40px] h-[15px] bg-slate-300/50" />
          </Skeleton>
        </div>

        <Skeleton className="w-[173px] h-[42px] grid place-items-center">
          <Skeleton className="w-[100px] h-[20px] bg-slate-300/50" />
        </Skeleton>

        <div className="flex rounded-md overflow-hidden">
          <Skeleton className="w-[54px] h-[39px] rounded-none grid place-items-center">
            <Skeleton className="w-[38px] h-[20px] bg-slate-300/50" />
          </Skeleton>
          <Skeleton className="w-[54px] h-[39px] rounded-none grid place-items-center">
            <Skeleton className="w-[38px] h-[20px] bg-slate-300/50" />
          </Skeleton>
          <Skeleton className="w-[54px] h-[39px] rounded-none grid place-items-center">
            <Skeleton className="w-[38px] h-[20px] bg-slate-300/50" />
          </Skeleton>
          <Skeleton className="w-[54px] h-[39px] rounded-none grid place-items-center">
            <Skeleton className="w-[38px] h-[20px] bg-slate-300/50" />
          </Skeleton>

        </div>
      </div>

      <Skeleton className="w-full h-[500px] sm:h-[600px]  "/>
    </div>
  )
}
