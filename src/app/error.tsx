'use client' 

import { Button } from '@/components/ui/button'


export default function Error({error,reset}: { error: Error & { digest?: string } , reset: () => void }) {

  return (
    <div className='grid place-items-center h-screen text-center justify-center '>
      <div className=' p-5 '>

          <div className='max-w-[360px] mx-auto flex flex-col gap-4 '>
            <h1 className={`font-bold tracking-tight leading-none text-gray-900 text-[34px] sm:text-[42px] dark:text-white font-secondFont`}> Whoops a problem!   </h1>

            <p className={` text-zinc-700 leading-normal dark:text-neutral-400  `}>Looks like our dashboard took a wrong turn, We&apos;re hustling to get things back on track.</p>

            <Button className='w-full sm:w-[95%] sm:mx-auto mt-1 ' onClick={() => reset()}>Try Again</Button>

          </div>
          
      </div>
        
    </div>
  )
}