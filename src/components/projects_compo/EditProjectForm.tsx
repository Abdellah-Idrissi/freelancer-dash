"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Textarea } from "../ui/textarea"
import { projectTypes } from "@/arrays/projectTypes";
import { Dispatch, FormEvent, SetStateAction,startTransition,useState } from "react";
import StartDateCalendar from "./StartDateCalendar";
import EndDateCalendar from "./EndDateCalendar";
import projectFormValidation from "@/helpers/projectFormValidation";
import checkIfProjectDataDiff from "../../helpers/checkIfProjectDataDiff";
import { toast } from "sonner";
import { updateProjectsInDb } from "@/server-actions/updateProjectsInDb";
import { useSearchParams } from "next/navigation";


type propsTypes = {
  isOpen:boolean
  setIsOpen:Dispatch<SetStateAction<boolean>>
  project:projectType
  fullProjects: projectsType
  filteredProjects:projectsType
  setFilteredProjects:(action: projectsType) => void
}


export default function EditProject({isOpen,setIsOpen,project,filteredProjects,fullProjects,setFilteredProjects}:propsTypes) {
  const [type, setType] = useState<projectTypeTypes>(project.type)
  const [startDate, setStartDate] = useState<Date>(project.startDate) 
  const [endDate, setEndDate] = useState<Date>(project.endDate) 
  const searchParams = useSearchParams()
  const typeParam = searchParams.get('type')

  const resetFormState = ()=> {
    setStartDate(project.startDate)
    setEndDate(project.endDate)
    setType(project.type)
  }

  const handleEditProject = async (e:FormEvent)=> {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)

    const isValide = projectFormValidation(formData.get('title') as string,formData.get('desc') as string,type,startDate,endDate)
    if(!isValide) return 

    const isDataDiff = checkIfProjectDataDiff(formData.get('title') as string,formData.get('desc') as string,type,startDate,endDate,project)
    if(!isDataDiff) return 

    const newProject = {
      id:project.id,
      title:formData.get('title') as string,
      description:formData.get('desc') as string,
      type,
      endDate:endDate.getTime() as any,
      startDate:startDate.getTime() as any
    }

    // OPTIMISTIC UPDATE THE PROJECTS
    const newProjects : projectsType = JSON.parse(JSON.stringify(filteredProjects))
    const projectIndex = newProjects.findIndex(prjct=> prjct.id === project.id)
    typeParam && typeParam !== type ? newProjects.splice(projectIndex,1) : newProjects.splice(projectIndex,1,newProject)
    startTransition(()=> setFilteredProjects(newProjects))
    toast.success('Project edited successfully')
    setIsOpen(false)

    // UPDATING PROJECTS IN DB
    const projects : projectsType = JSON.parse(JSON.stringify(fullProjects))
    const prjectIndex = projects.findIndex(prjct=> prjct.id === project.id)
    projects.splice(prjectIndex,1,newProject)
    const response = await updateProjectsInDb(projects)
    response.error && toast.error('Failed to edit the project!') 
  }


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>

      <DialogContent className="sm:max-w-[450px] p-4 sm:p-6 " onCloseAutoFocus={resetFormState} onEscapeKeyDown={resetFormState} onInteractOutside={resetFormState}>
        <DialogHeader>
          <DialogTitle>Edit project</DialogTitle>
          <DialogDescription>
            Edit your project here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleEditProject} className="grid gap-4 pt-4  ">
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-center">
              Title
            </Label>
            <Input defaultValue={project.title}  id="title" name="title" className="col-span-3" placeholder="enter project's title"/>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="desc" className="text-center">
              Description
            </Label>
            <Textarea defaultValue={project.description} id="desc" name="desc" className="col-span-3 max-h-[150px]" placeholder="enter project's description" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-center">
              Type
            </Label>

            <Select value={type} onValueChange={(v:projectTypeTypes)=> setType(v)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder={"select project's type"}>{type}</SelectValue>
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
            <StartDateCalendar date={startDate} setdDate={setStartDate as Dispatch<SetStateAction<Date | undefined>>}/>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-center">
              End date
            </Label>
            <EndDateCalendar date={endDate} setdDate={setEndDate as Dispatch<SetStateAction<Date | undefined>>}/>
          </div>

          <Button type="submit" className="w-full">Save changes</Button>

        </form>

      </DialogContent>
    </Dialog>
  )
}
