import { useState } from "react";
import { Button } from "../ui/button";
import { ClientForm } from "./ClientForm";
import { BiPlus } from "react-icons/bi";

type propsTypes = {
  clients:clientType[]
  setTableData: (action: unknown) => void
}

export default function AddClient({clients,setTableData}:propsTypes) {

  const [isOpen,setIsOpen] = useState(false)

  return <>
    <Button className="mb-4 flex items-center gap-x-[5px] px-3 w-full " onClick={()=> setIsOpen(true)}>
      <BiPlus size={15} className={'mt-[2px]'}/> Add Client 
    </Button>
    <ClientForm isEditClient={false} open={isOpen} setOpen={setIsOpen} clients={clients} setTableData={setTableData}/>
  </>
}

