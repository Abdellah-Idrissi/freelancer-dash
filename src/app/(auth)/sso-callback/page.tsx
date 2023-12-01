import SSOCallback from "@/components/auth/sso-callback"
import { currentUser , auth } from "@clerk/nextjs"
import { type HandleOAuthCallbackParams } from "@clerk/types"
import { redirect } from "next/navigation"


export type SSOCallbackPageProps = {
  searchParams: HandleOAuthCallbackParams
}

export default async function SSOCallbackPage({searchParams}: SSOCallbackPageProps) {
  const {userId} = auth()
  if(userId) redirect('/')

  return (
    <SSOCallback params={searchParams}/>
  )
}