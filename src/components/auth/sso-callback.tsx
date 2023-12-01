"use client"
import { useClerk } from "@clerk/nextjs"
import { type HandleOAuthCallbackParams } from "@clerk/types"
import { useEffect } from "react"
import { AiOutlineReload } from "react-icons/ai"


export type SSOCallbackPageProps = {
  params: HandleOAuthCallbackParams
}

export default function SSOCallback({params}: SSOCallbackPageProps) {
  const { handleRedirectCallback } = useClerk()

  useEffect(() => {
    void handleRedirectCallback(params)
  }, [params, handleRedirectCallback])

  return (
    <AiOutlineReload className={'text-[50px] text-white mx-auto animate-spin'}/>
  )
}