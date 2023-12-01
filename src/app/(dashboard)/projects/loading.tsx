import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@clerk/nextjs";

export default function ProjectsLoading() {
  const {userId} = auth()

  if(!userId) {
    return <></>
  }

  return (
    <div className="px-[20px] lg:px-[30px] flex flex-col gap-5 pb-5">
      <div className="flex flex-col gap-4 items-center sm:flex-row sm:justify-between">
        <Skeleton className="w-full sm:w-[125px] h-[36px] grid place-items-center">
          <Skeleton className="h-[20px] sm:h-[17px] w-[100px] bg-slate-300/50 "/>
        </Skeleton>

        <Skeleton className="w-full sm:w-[250px] h-[36px] p-3 flex justify-between">
          <Skeleton className="h-[14px] w-[110px] bg-slate-300/50 "/>
          <Skeleton className="h-[14px] w-[15px] bg-slate-300/50 "/>
        </Skeleton>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {
          [1,2,3,4,5,6].map(key=>
            <Skeleton key={key} className="w-full h-[295px] p-5 flex flex-col gap-4">
              <div className="flex justify-between gap-2">
                <Skeleton className="w-[150px] h-[20px] bg-slate-300/50 "/>
                <Skeleton className="w-4 h-5 bg-slate-300/50"/>
              </div>
    
              <Skeleton className="w-full h-[20px] bg-slate-300/50" />
    
              <Skeleton className="w-full flex-1 mt-1 bg-slate-300/50" />
            </Skeleton>
          )
        }

      </div>
    </div>
  )
}
