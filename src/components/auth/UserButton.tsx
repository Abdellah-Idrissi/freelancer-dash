"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useClerk } from "@clerk/nextjs";
import { VscSignOut } from "react-icons/vsc";

import { FormEvent, useEffect, useState } from "react"
import { GoSignOut } from "react-icons/go";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { LiaUserEditSolid, LiaUserSlashSolid } from "react-icons/lia";
import deleteUserInDb from "@/server-actions/deleteUserInDb";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import GuestAlert from "./GuestAlert";


export default function UserButton() {

  const { user , signOut } = useClerk()
  const [signOutOpen,setSignOutOpen] = useState(false)
  const [deleteOpen,setDeleteOpen] = useState(false)
  const [editOpen,setEditOpen] = useState(false)
  const [editLoading,setEditLoading] = useState(false)
  const [deleteLoading,setDeleteLoading] = useState(false)


  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
  };

  const editFullName = async (e:FormEvent)=> {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const firstName = formData.get('FirstName') as string
    const lastName = formData.get('LastName') as string

    if(firstName.trim() === '' || lastName.trim() === '') return toast.error("Please fill out the inputs")

    else if(firstName === user?.firstName && lastName === user?.lastName) return toast.error("FullName didn't change !")

    setEditLoading(true)
    await user?.update({
      firstName,
      lastName,
    });

    setEditLoading(false)
    setEditOpen(false)
  }

  const handleDelete = async ()=> {
    if(user?.primaryEmailAddress?.emailAddress === 'kagefox506@cabose.com') {
      return toast.error("Can't delete a guest account!")
    }

    setDeleteLoading(true)

    await signOut()
    await deleteUserInDb(user?.id as string)
    toast.success("Account deleted successfully")

    setDeleteLoading(false)
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "Q" || e.key === 'q') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSignOutOpen(true)
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "E" || e.key === 'e') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setEditOpen(true)
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "A" || e.key === 'a') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setDeleteOpen(true)
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [])

  if(!user) return null


  return (
    <>

      <DropdownMenu modal={false} >

        <DropdownMenuTrigger asChild>
          {user.hasImage ? 
          <Image src={user.imageUrl} alt="" width={20} height={20} className="w-8 h-8 rounded-full  cursor-pointer ml-1  "/> :
          <div>
            <FaUserCircle className={'w-7 h-7 ml-1 cursor-pointer'}/>
          </div>
        }
        </DropdownMenuTrigger>

        <DropdownMenuContent side="bottom" align="end" className="w-56 ">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
            {user?.fullName}
            </p>
            <p className="text-xs leading-none text-neutral-600 dark:text-neutral-400">
            {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center  justify-between " onSelect={()=>setEditOpen(true)}>
          <div className="flex gap-2 items-center font-medium">
            <LiaUserEditSolid className={'w-4 h-4'} />
            Edit name
          </div>
          <Button variant={'secondary'} className={'p-[5px] flex items-center text-xs border dark:border-neutral-700/60 tracking-widest opacity-60 text-neutral-600 dark:text-neutral-400'}>
            <span className="text-[9px]">⌘</span>E
          </Button >
        </DropdownMenuItem>



        
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center  justify-between" onSelect={()=> setDeleteOpen(true)} >
          <div className="flex gap-2 items-center font-medium" >
            <LiaUserSlashSolid className={'w-4 h-4'} />
            Delete account
          </div>
          <Button variant={'secondary'} className={'p-[5px] flex items-center text-xs border dark:border-neutral-700/60 tracking-widest opacity-60 text-neutral-600 dark:text-neutral-400'}>
            <span className="text-[9px]">⌘</span>A
          </Button >
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center  justify-between" onSelect={()=> setSignOutOpen(true)}>
          <div className="flex gap-2 items-center font-medium" >
            <GoSignOut className={'w-4 h-4'} />
            Sign out
          </div>
          <Button variant={'secondary'} className={'p-[5px] flex items-center text-xs border dark:border-neutral-700/60 tracking-widest opacity-60 text-neutral-600 dark:text-neutral-400'}>
            <span className="text-[9px]">⌘</span>Q
          </Button >
        </DropdownMenuItem>

        </DropdownMenuContent>

      </DropdownMenu>

      <AlertDialog open={signOutOpen} onOpenChange={setSignOutOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Do you wanna sign out?</AlertDialogTitle>

          </AlertDialogHeader>

          <AlertDialogFooter>
          <AlertDialogCancel className="hover:bg-gray-100 w-full">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction className="w-full" asChild>
            <div onClick={handleSignOut}>Sign Out</div>
          </AlertDialogAction>
        </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[450px] p-4 sm:p-6" >
          <DialogHeader>
            <DialogTitle>Edit Fullname</DialogTitle>
            <DialogDescription>
              Edit your fullname here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={editFullName} className="grid gap-4 pt-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="FirstName" className="text-center">
                Firstname
              </Label>
              <Input  id="FirstName" name="FirstName" className="col-span-3" defaultValue={user?.firstName as string}/>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="LastName" className="text-center">
                Lastname
              </Label>
              <Input  id="LastName" name="LastName" className="col-span-3" defaultValue={user?.lastName as string}/>
            </div>

            <Button type="submit" className="w-full" disabled={editLoading}>{
              editLoading ? 'Saving...' : 'Save'
            }</Button>
          </form>
          
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
          <AlertDialogCancel className="hover:bg-gray-100 w-full">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction className="w-full" asChild>
            <button onClick={handleDelete} disabled={deleteLoading}>{deleteLoading ? 'Deleting...' : 'Delete'}</button>
          </AlertDialogAction>
        </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <GuestAlert />

    </>
  )
}
