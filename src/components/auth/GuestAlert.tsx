/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useClerk } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button"

export default function GuestAlert() {

  const { user } = useClerk()
  const [open,setOpen] = useState(false)

  useEffect(()=> {
    const hasVisited = localStorage.getItem('hasVisited')

    if(!hasVisited && user?.primaryEmailAddress?.emailAddress === 'kagefox506@cabose.com') {
      localStorage.setItem('hasVisited','true')
      setOpen(true)
    }

  },[])

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle className="text-center">Welcome to the guest account</AlertDialogTitle>
        <AlertDialogDescription className="text-center">
        Please note that this account allows any user to add and edit content , with that being said be aware that user-generated content may vary, and if you encounter anything inappropriate, it does not reflect the views of the dashboard owner
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>

      <AlertDialogAction className="w-full" asChild>
        <Button>Got it</Button>
      </AlertDialogAction>
    </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}
