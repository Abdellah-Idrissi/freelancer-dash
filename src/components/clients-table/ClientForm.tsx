import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, FormEvent, SetStateAction, startTransition, useEffect, useRef, useState } from "react";
import { referralSources } from "@/arrays/referralSources";
import { CountriesSelect } from "./CountriesSelect";
import { toast } from "sonner";
import { updateClientsInDb } from "@/server-actions/updateClientsInDb";
import { generateRandomId } from "@/helpers/generateRandomId";
import clientFormValidation from "@/helpers/clientFormValidation";
import checkIfClientDataDiff from "@/helpers/checkIfClientDataDiff";

type propsTypes = {
  clients:clientType[]
  client?: clientType
  isEditClient: boolean
  open?:boolean
  setOpen?:Dispatch<SetStateAction<boolean>>
  setTableData: (action: unknown) => void
};

export function ClientForm({ client, clients, isEditClient,open,setOpen,setTableData}: propsTypes) {

  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const projectsRef = useRef<HTMLInputElement>(null)
  const [selectedCountry,setSelectedCountry] = useState<string>(client? client.country : '')
  const [selectedSource,setSelectedSource] = useState<string>(client? client.referralSource : '')


  const resetState = ()=> {
    if(!client) {
      setSelectedCountry('')
      setSelectedSource('')
    }
  }

  const handleAddClient = async (e:FormEvent)=> {
    e.preventDefault()
    
    // FORM VALIDATION 
    const validationResponse = clientFormValidation(nameRef,emailRef,projectsRef,selectedCountry,selectedSource)

    if(validationResponse !== false) {

      // OPTIMISTIC UPDATE THE CLIENTS
      const newClients = JSON.parse(JSON.stringify(clients))
      newClients.unshift({
        id:generateRandomId(),
        country:selectedCountry,
        referralSource:selectedSource as referralSourceTypes,
        email:validationResponse.email,
        name:validationResponse.name,
        projects:+validationResponse.projects,
      })
      startTransition(()=> {
        setTableData(newClients)
      })
      setOpen && setOpen(false)
      toast.success('Client added successfully') 
  
      // UPDATING CLIENTS IN DB
      const response = await updateClientsInDb(newClients)
      response.error && toast.error('Failed to add a new client!') 

    }

  }

  const handleEditClient = async (e:FormEvent)=> {
    e.preventDefault()

    // FORM VALIDATION
    const validationResponse = clientFormValidation(nameRef,emailRef,projectsRef,selectedCountry,selectedSource)

    if(validationResponse !== false) {

      const {email,projects,name} = validationResponse
      const isDataDifferent = checkIfClientDataDiff(name,email,projects,selectedCountry,selectedSource,client as clientType)

      if(isDataDifferent) {

        // OPTIMISTIC UPDATE THE CLIENTS
        const newClients : clientType[] = JSON.parse(JSON.stringify(clients))
        const clientIndex = newClients.findIndex(cl=> cl.id === client?.id)
        newClients.splice(clientIndex,1,{
          country:selectedCountry,
          referralSource:selectedSource as referralSourceTypes,
          email,
          name,
          projects,
          id:client?.id as string
        })
        startTransition(()=> {
          setTableData(newClients)
        })
        setOpen && setOpen(false)
        toast.success('Client updated successfully')

        // UPDATING CLIENTS IN DB
        const response = await updateClientsInDb(newClients)
        response.error && toast.error('Failed to update the client!') 

      }
    }


  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogContent
        className="sm:max-w-[500px]"
        onInteractOutside={resetState}
        onEscapeKeyDown={resetState}
        onCloseAutoFocus={resetState}
      >
        <DialogHeader>
          <DialogTitle>{isEditClient ? 'Edit Client' : 'Add Client'}</DialogTitle>
          <DialogDescription>
            {isEditClient ? 
              "Make changes to your client's data here. Click save when you're done." : 
              "Fill out the inputs with your client's data. Click add when you're done."
            }
          </DialogDescription>
        </DialogHeader>
        

        <form className="flex flex-col gap-y-4">
          <div className="grid grid-cols-4 items-center gap-4 mt-2">
            <Label htmlFor="name" className="text-center">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              defaultValue={client?.name}
              placeholder="enter client's name"
              className="col-span-3"
              ref={nameRef}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-center">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              defaultValue={client?.email}
              placeholder="enter client's email"
              className="col-span-3"
              ref={emailRef}
            />
          </div>



          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="projects" className="text-center">
              Projects
            </Label>
            <Input
              id="projects"
              type="number"
              min={1}
              defaultValue={client?.projects}
              placeholder="enter client's num of projects"
              className="col-span-3"
              ref={projectsRef}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="projects" className="text-center">
              Country
            </Label>
            <CountriesSelect
              isEditClient={isEditClient}
              clientCountry={client?.country}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}              
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4 mb-3">
            <Label className="text-center">Referral Source</Label>
            <Select value={selectedSource} onValueChange={(e)=> setSelectedSource(e)}>
              <SelectTrigger className="col-span-3">
                <SelectValue
                  placeholder={
                    isEditClient
                      ? client?.referralSource
                      : "select referral source"
                  }
                />
              </SelectTrigger>
              <SelectContent className="w-[99.4%] ">
                {referralSources.map((source) => (
                  <SelectItem key={source} value={source}>
                    {source}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            {isEditClient ? 
              <Button type="submit" onClick={handleEditClient} className="w-full">Save Changes</Button> : 
              <Button type="submit" onClick={handleAddClient} className="w-full" >Add Client</Button>
            }
          </DialogFooter>

        </form>


      </DialogContent>
      
    </Dialog>
  )
}
