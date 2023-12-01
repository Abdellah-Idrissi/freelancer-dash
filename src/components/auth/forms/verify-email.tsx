"use client"

import { Button } from "@/components/ui/button";
import { useSignUp } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useRef, useState } from "react"
import { toast } from "sonner";

export default function VerifyEmailForm() {
  const codeRef = useRef<HTMLInputElement>(null)
  const [verifyCodeLoading, setVerifyCodeLoading] = useState(false)
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirectUrl')
  
  const handleVerifyEmail = async (e:FormEvent)=> {
    e.preventDefault()
    setVerifyCodeLoading(true)
    if (!isLoaded) return
    const code = codeRef.current?.value.trim() as string

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId })
        router.push(redirectUrl !== null ? redirectUrl : '/')
        toast.success('You signed up successfully')
      }
      else {
        console.log(JSON.stringify(completeSignUp, null, 2))
        toast.error('Something wrong occured')
      }

      setVerifyCodeLoading(false)

    } 
    catch (error: any) {
      setVerifyCodeLoading(false)
      toast.error(error.errors[0].longMessage)
    }

  }


  return (
    <div className="authFormStyle">
      
      <div className="text-center mb-5">
        <h3 className="text-[30px] uppercase leading-none mb-[6px] text-white">Verify Email</h3>
        <p className="font-light text-neutral-400 ">Check your email address for the code</p>
      </div>

      <form className="flex flex-col gap-y-2">
        <div>
        <input
          id="code"
          type="text"
          placeholder="enter the verification code"
          ref={codeRef}
          className="inputStyle"
        />
        </div>

        <button
          onClick={handleVerifyEmail}
          className="px-4 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80 mt-2"
          disabled={verifyCodeLoading}
        >
          {verifyCodeLoading ? 'Verifying...' : 'Verify'}
        </button>
      </form>

      <p className="text-[#78787f] mt-[18px] text-[14px] font-light">
        Already have an Account <span className="font-sans text-[12px] font-semibold">?</span> 
        <Link href={'/sign-in'} className="text-white font-medium pl-1 hover:underline underline-offset-2">Sign In</Link>
      </p>

    </div>
  )
}