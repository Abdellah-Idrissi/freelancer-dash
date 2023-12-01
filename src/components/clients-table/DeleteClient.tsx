"use client"

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
import { updateClientsInDb } from "@/server-actions/updateClientsInDb"
import { Dispatch, SetStateAction, startTransition } from "react"
import { toast } from "sonner"

type propsTypes = {
  deleteOpen:boolean
  setDeleteOpen:Dispatch<SetStateAction<boolean>>
  clients:clientType[]
  setClients:(action: unknown) => void
  client:clientType
}


export default function DeleteClient({deleteOpen,setDeleteOpen,clients,setClients,client}:propsTypes) {

  const handleDelete = async ()=> {

    // OPTIMISTIC UPDATE THE CLIENTS
    const newClients : clientType[] = JSON.parse(JSON.stringify(clients))
    const clientIndex = newClients.findIndex(cl=> cl.id === client?.id)
    newClients.splice(clientIndex,1)
    startTransition(()=> {
      setClients(newClients)
    })
    toast.success('Client deleted successfully')

    // UPDATING CLIENTS IN DB
    const response = await updateClientsInDb(newClients)
    response.error && toast.error('Failed to delete the client!') 

  }


  return (
    <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone and will permanently delete your client.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel >Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
