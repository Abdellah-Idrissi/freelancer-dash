"use client"

import { GoTrash } from "react-icons/go";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import React, { Dispatch, SetStateAction, startTransition } from 'react'
import { updateKanbanInDb } from "@/server-actions/updateKanbanInDb";
import { toast } from "sonner";

type propsTypes = {
  parentId:IdType
  id:IdType
  containers:ContainerType[]
  setContainers:(action: ContainerType[]) => void
}

export default function DeleteItem({id,parentId,containers,setContainers}:propsTypes) {

  const deleteItem = async ()=> {
    const containersCopy : ContainersType = JSON.parse(JSON.stringify(containers))
    const containerIndex = containersCopy.findIndex(con=> con.id === +parentId)
    const containerItems = containersCopy[containerIndex].items
    const itemIndex = containerItems.findIndex(item=> item.id === id)
    containerItems.splice(itemIndex,1)

    // optimistic update the kanban
    startTransition(()=> {
      setContainers(containersCopy)
    })
    toast.success('Deleted successfully')

    // Updating the kanban in db
    const result : serverActionReturnType = await updateKanbanInDb(containersCopy)
    result.error && toast.error('An error occured while deleting in database!')

  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger className="leading-none flex items-center bg-slate-50 dark:bg-neutral-800 p-1 rounded-sm border dark:border-neutral-700/60 hover:text-red-500 transition-colors duration-200 cursor-pointer">
          <GoTrash size={14}  />
        </AlertDialogTrigger>


        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone and it will permanently delete your Task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteItem}>Delete Task</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>


      </AlertDialog>
    </>
  )
}
