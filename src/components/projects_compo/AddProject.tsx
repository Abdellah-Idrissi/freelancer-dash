"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BiPlus } from "react-icons/bi"
import { Textarea } from "../ui/textarea"
import { projectTypes } from "@/arrays/projectTypes";
import { FormEvent, startTransition, useState } from "react";
import StartDateCalendar from "./StartDateCalendar";
import EndDateCalendar from "./EndDateCalendar";
import projectFormValidation from "@/helpers/projectFormValidation";
import { generateRandomId } from "@/helpers/generateRandomId";
import { updateProjectsInDb } from "@/server-actions/updateProjectsInDb";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";


type propsTypes = {
  fullProjects: projectsType
  filteredProjects:projectsType
  setFilteredProjects:(action: projectsType) => void
}

export default function AddProject({filteredProjects,fullProjects,setFilteredProjects}:propsTypes) {
  const [type, setType] = useState<projectTypeTypes | ''>('')
  const [startdDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [isOpen,setIsOpen] = useState(false)
  const searchParams = useSearchParams()
  const typeParam = searchParams.get('type') 


  const resetFormState = ()=> {
    setStartDate(undefined)
    setEndDate(undefined)
    setType('')
  }

  const handleAddProject = async (e:FormEvent)=> {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)

    const isValide = projectFormValidation(formData.get('title') as string,formData.get('desc') as string,type,startdDate,endDate)

    if(isValide && startdDate !== undefined && endDate !== undefined) {
      const newProject : projectType = {
        title:formData.get('title') as string,
        description:formData.get('desc') as string,
        type:type as projectTypeTypes,
        startDate:startdDate.getTime() as any,
        endDate:endDate.getTime() as any,
        id:generateRandomId()
      }

      // OPTIMISTIC UPDATE THE PROJECTS
      if(!typeParam || typeParam === type) {
        const newProjects : projectsType = JSON.parse(JSON.stringify(filteredProjects))
        newProjects.unshift(newProject)
        startTransition(()=> setFilteredProjects(newProjects))
      }
      setIsOpen(false)
      toast.success('Project added successfully')

      // UPDATING PROJECTS IN DB
      const projects : projectsType = JSON.parse(JSON.stringify(fullProjects))
      projects.unshift(newProject)
      const response = await updateProjectsInDb(projects)
      response.error && toast.error('Failed to add a new project!')
    }

  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex items-center gap-x-1 pl-3 " asChild>
        <Button variant="outline"> <BiPlus size={15} className={'mt-[2px]'}/> Add Project</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px] p-4 sm:p-6" onCloseAutoFocus={resetFormState} onEscapeKeyDown={resetFormState} onInteractOutside={resetFormState}>
        <DialogHeader>
          <DialogTitle>Add a project</DialogTitle>
          <DialogDescription>
            Add a new project here. Click add when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleAddProject} className="grid gap-4 pt-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-center">
              Title
            </Label>
            <Input  id="title" name="title" className="col-span-3" placeholder="enter project's title"/>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="desc" className="text-center">
              Description
            </Label>
            <Textarea id="desc" name="desc" className="col-span-3 max-h-[150px]" placeholder="enter project's description" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-center">
              Type
            </Label>

            <Select value={type} onValueChange={(v:projectTypeTypes)=> setType(v)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder={"select project's type"}/>
              </SelectTrigger>
              <SelectContent className="w-[99.4%] ">
                {projectTypes.map((projecType) => (
                  <SelectItem key={projecType} value={projecType}>
                    {projecType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-center">
              Start date
            </Label>
            <StartDateCalendar date={startdDate} setdDate={setStartDate} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-center">
              End date
            </Label>
            <EndDateCalendar date={endDate} setdDate={setEndDate} />
          </div>

          <Button type="submit" className="w-full">Add Project</Button>
        </form>
        
      </DialogContent>
    </Dialog>
  )
}

