import { Button } from "@/components/ui/button";
import Link from "next/link";



export default function NotFound() {


  return (
    <div className="h-screen grid place-items-center p-5 ">
      <div className=" ">
        <div className="text-center w-full  max-w-[350px] flex flex-col gap-4 mx-auto">
          <h1 className={`font-secondFont text-[40px] sm:text-[45px] font-semibold leading-none`}>Page Not Found</h1>
          <p className="dark:text-white/80 w-[286px] px-0 sm:w-full text-sm sm:px-[10px]">it seems like you&apos;ve stumbled upon a mysterious void. The page you are looking for has vanished into the digital abyss</p>
          <Button asChild ><Link href={'/'} className="w-[95%] mx-auto ">Go Back Home</Link></Button>
        </div>
      </div>
    </div>
  )
}
