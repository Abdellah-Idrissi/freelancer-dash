"use client"

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogTitle
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from 'sonner';

import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {startTransition, useRef, useState } from "react";
import { generateRandomId } from "@/helpers/generateRandomId";
import { updateKanbanInDb } from "@/server-actions/updateKanbanInDb";
import { BiPlus } from "react-icons/bi";

type propsTypes = {
  containers:ContainerType[]
  setContainers: (action: ContainerType[]) => void
}

export default function AddItem({containers,setContainers}:propsTypes) {
  const [containerId,setContainerId] = useState<string | null>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const [isOpen,setIsOpen] = useState(false)

  const handleAddTask = async ()=> {
    const content = contentRef.current?.value.trim() as string

    if(content === '' || containerId === null) toast.error('Please fill out all the fields')

    else {
      const containersCopy : ContainersType = JSON.parse(JSON.stringify(containers))
      const containerIndex = containersCopy.findIndex(con=> con.id === +containerId)
      const containerItems = containersCopy[containerIndex].items
      containerItems.unshift({id:generateRandomId(),content})

      setIsOpen(false)
      setContainerId(null)

      // Optimistic update the kanban
      startTransition(()=> {
        setContainers(containersCopy)
      })
      toast.success('Added successfully')

      // Updating the kanban in db
      const result : serverActionReturnType = await updateKanbanInDb(containersCopy)
      result.error && toast.error('An error occured while adding to database!')
    }

  }


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>

      <DialogTrigger asChild>
        <Button variant={'outline'} className="mb-4 flex items-center gap-x-[5px] px-3 w-full " >
          <BiPlus size={15} className={'mt-[2px]'}/> Add Task 
        </Button>
      </DialogTrigger>



      <DialogContent className="sm:max-w-[480px]">

        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
              Fill out the inputs with your task data. Click add when you&apos;re done
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-y-4">
          <div className="grid grid-cols-4 items-center gap-4 mt-2">
            <Label htmlFor="content" className="text-center">
              Content
            </Label>
            <Textarea ref={contentRef} id="content" placeholder="write your task" className="col-span-3 max-h-[200px]"  />
          </div>

          <div className="grid grid-cols-4 items-center gap-4 mt-2">
          <Label htmlFor="Fieled" className="text-center">
            Status
          </Label>
          <Select onValueChange={(e)=> setContainerId(e)}>
            <SelectTrigger className="w-full text-neutral-500 dark:text-neutral-400 col-span-3">
              <SelectValue placeholder="select a status" className="" />
            </SelectTrigger>
            <SelectContent className="w-[99.4%]">
              <SelectItem value="1" >Todo</SelectItem>
              <SelectItem value="2" >Doing</SelectItem>
              <SelectItem value="3" >Done</SelectItem>
            </SelectContent>
          </Select>

          </div>

        </div>


        <DialogFooter className="mt-5 ">
          <Button type="submit" onClick={handleAddTask} className="w-full">Add Task</Button>
        </DialogFooter>
      </DialogContent>

    </Dialog>
  );
}
