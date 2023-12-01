
import Image from 'next/image'
import star from '../../../public/star.webp'



export default function AuthLayout({children}: {children: React.ReactNode}) {


  return (
    <div className={`bg-neutral-950 relative min-h-screen flex justify-center items-center font-futura`}>

    <div className="absolute bg-cover  inset-0 bg-hero bg-center blur-[4px] 900screen:hidden" />
    <div className="hidden 900screen:grid 900screen:w-[50%] bg-hero bg-cover bg-center min-h-screen loginBgAnimation ">
    </div>

    <div className="z-50 900screen:flex-1 900screen:flex 900screen:justify-center 900screen:items-center w-[90%] max-w-[450px] 900screen:w-full 900screen:max-w-full">
      {children}
    </div>

    <Image src={star} alt='star' priority className='hidden 900screen:block w-[100px] h-[100px] absolute top-0 right-0' />
    <Image src={star} alt='star' priority className='hidden 900screen:block w-[100px] h-[100px] absolute top-0 left-0' />
  </div>
  )
}
