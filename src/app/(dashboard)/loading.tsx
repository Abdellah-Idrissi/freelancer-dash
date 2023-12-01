import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <div className="px-[20px] lg:px-[30px] flex flex-col gap-5 pb-5 ">

      <div className="grid grid-cols-1 grid-rows-4 sm:grid-cols-2 sm:grid-rows-2 xxl:grid-cols-4 xxl:grid-rows-1 gap-5">
        <Skeleton className="h-[130px] p-4 flex flex-col gap-2 ">
          <div className="flex gap-2 justify-between">
            <Skeleton className="h-[15px] w-[100px] bg-slate-300/50"/>
            <Skeleton className="h-[15px] w-[20px] bg-slate-300/50"/>
          </div>
          <Skeleton className="flex-1 bg-slate-300/50 " />
        </Skeleton>

        <Skeleton className="h-[130px] p-4 flex flex-col gap-2 ">
          <div className="flex gap-2 justify-between">
            <Skeleton className="h-[15px] w-[100px] bg-slate-300/50"/>
            <Skeleton className="h-[15px] w-[20px] bg-slate-300/50"/>
          </div>
          <Skeleton className="flex-1 bg-slate-300/50 " />
        </Skeleton>

        <Skeleton className="h-[130px] p-4 flex flex-col gap-2 ">
          <div className="flex gap-2 justify-between">
            <Skeleton className="h-[15px] w-[100px] bg-slate-300/50"/>
            <Skeleton className="h-[15px] w-[20px] bg-slate-300/50"/>
          </div>
          <Skeleton className="flex-1 bg-slate-300/50 " />
        </Skeleton>

        <Skeleton className="h-[130px] p-4 flex flex-col gap-2 ">
          <div className="flex gap-2 justify-between">
            <Skeleton className="h-[15px] w-[100px] bg-slate-300/50"/>
            <Skeleton className="h-[15px] w-[20px] bg-slate-300/50"/>
          </div>
          <Skeleton className="flex-1 bg-slate-300/50 " />
        </Skeleton>
      </div>

      <Skeleton className="h-[450px] p-6 flex flex-col gap-3 ">
        <Skeleton className=" h-[25px] w-full max-w-[250px] bg-slate-300/50 "/>
        <Skeleton className=" h-[25px] w-full max-w-[450px] bg-slate-300/50 "/>
        <Skeleton className=" flex-1 w-full bg-slate-300/50 mt-4 "/>
      </Skeleton>

      <Skeleton className="h-[450px] p-6 flex flex-col gap-3 ">
        <Skeleton className=" h-[25px] w-full max-w-[250px] bg-slate-300/50 "/>
        <Skeleton className=" h-[25px] w-full max-w-[450px] bg-slate-300/50 "/>
        <div className="flex-1 grid place-items-center ">
          <Skeleton className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] rounded-full bg-slate-300/50 mt-4 "/>
        </div>
      </Skeleton>

    </div>
  )
}
