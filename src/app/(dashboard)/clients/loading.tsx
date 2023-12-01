import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@clerk/nextjs";

export default function ClientsLoading() {
  const {userId} = auth()

  if(!userId) {
    return <></>
  }

  return (
    <div className="px-[20px] lg:px-[30px] flex flex-col gap-5 pb-5">
      <div className="flex flex-col gap-5 md:flex-row md:justify-between  ">
        <Skeleton className="w-full md:w-[250px] h-[36px] p-3">
          <Skeleton className="h-[14px] w-[90px] bg-slate-300/50 "/>
        </Skeleton>
        <Skeleton className="w-full md:w-[250px] h-[36px] p-3 flex justify-between">
          <Skeleton className="h-[14px] w-[110px] bg-slate-300/50 "/>
          <Skeleton className="h-[14px] w-[15px] bg-slate-300/50 "/>

        </Skeleton>
      </div>

        <Skeleton className="w-full h-[36px] grid place-items-center">
          <Skeleton className="h-[20px] w-[100px] bg-slate-300/50 "/>
        </Skeleton>

        <Skeleton className="w-full h-[500px]"/>

        <div className="flex items-center justify-center sm:justify-between gap-5 gap-y-3 pt-4 flex-wrap -mt-2">
          <Skeleton className="h-[32px] w-[171px]"/>

          <div className="flex items-center gap-2 justify-center order-1">
            <Skeleton className="h-[32px] w-[100px]"/>
          </div>

          <div className="flex gap-x-2">
            <Skeleton className="h-[32px] w-[80px]"/>
            <Skeleton className="h-[32px] w-[70px]"/>
          </div>

        </div>

    </div>
  )
}
