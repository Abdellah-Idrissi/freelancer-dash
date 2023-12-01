import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteClient from "./DeleteClient";
import { useState } from "react";
import { toast } from "sonner";
import { ClientForm } from "./ClientForm";
import { Dialog } from "../ui/dialog";

type propsTypes = {
  clients:clientType[]
  setClients:(action: unknown) => void
  client:clientType
}

export default function ActionsDropDown({client,clients,setClients}:propsTypes) {
  const [editOpen,setEditOpen] = useState(false)
  const [deleteOpen,setDeleteOpen] = useState(false)

  const handleCopyClientEmail = ()=> {
    navigator.clipboard.writeText(client.email)
    toast.success(`${client.email} is copied successfully`)
  }
  
  return (
    <>
      <Dialog>
        <DropdownMenu modal={false} >
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleCopyClientEmail}>
              Copy client&apos;s email
            </DropdownMenuItem>

            <DropdownMenuItem onSelect={()=> setEditOpen(true)}>
              Edit Client
            </DropdownMenuItem>


            <DropdownMenuItem onSelect={()=> setDeleteOpen(true)}>
              Delete Client
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      </Dialog>

      <ClientForm client={client} clients={clients} setTableData={setClients} isEditClient={true} open={editOpen} setOpen={setEditOpen} /> 

      <DeleteClient client={client} deleteOpen={deleteOpen} setDeleteOpen={setDeleteOpen} clients={clients} setClients={setClients} />
    </>
  )
}
