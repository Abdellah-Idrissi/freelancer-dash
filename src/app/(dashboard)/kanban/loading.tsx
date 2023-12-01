import { Skeleton } from "@/components/ui/skeleton";

export default function KanbanLoading() {
  return (
    <div className="px-[20px] lg:px-[30px] flex flex-col gap-4 pb-5 ">
      <Skeleton className="w-full h-[39px] grid place-items-center">
        <Skeleton className="w-[100px] h-[20px]  bg-slate-300/50"  /> 
      </Skeleton>

      <div className="grid grid-cols-1 auto-rows-fr md:flex gap-3 md:flex-row">
        <Skeleton className="p-5 w-full h-[400px] flex flex-col gap-4 ">

          <div className="flex gap-3 justify-between items-center">
            <div className="flex gap-1 items-center ">
              <Skeleton className="w-5 h-5 rounded-full bg-slate-300/50"/>
              <Skeleton className="w-[120px] h-6 bg-slate-300/50"/>
            </div>

            <Skeleton className="w-5 h-5 bg-slate-300/50"/>
          </div>

          <Skeleton className="flex-1 bg-slate-300/50 " />

        </Skeleton>

        <Skeleton className="p-5 w-full h-[400px] flex flex-col gap-4 ">

          <div className="flex gap-3 justify-between items-center">
            <div className="flex gap-1 items-center ">
              <Skeleton className="w-5 h-5 rounded-full bg-slate-300/50"/>
              <Skeleton className="w-[120px] h-6 bg-slate-300/50"/>
            </div>

            <Skeleton className="w-5 h-5 bg-slate-300/50"/>
          </div>

          <Skeleton className="flex-1 bg-slate-300/50 " />

        </Skeleton>

        <Skeleton className="p-5 w-full h-[400px] flex flex-col gap-4 ">

<div className="flex gap-3 justify-between items-center">
  <div className="flex gap-1 items-center ">
    <Skeleton className="w-5 h-5 rounded-full bg-slate-300/50"/>
    <Skeleton className="w-[120px] h-6 bg-slate-300/50"/>
  </div>

  <Skeleton className="w-5 h-5 bg-slate-300/50"/>
</div>

<Skeleton className="flex-1 bg-slate-300/50 " />

        </Skeleton>
      </div>

    </div>
  )
}
