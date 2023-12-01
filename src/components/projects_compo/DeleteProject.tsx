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
import { updateProjectsInDb } from "@/server-actions/updateProjectsInDb"
import { Dispatch, SetStateAction, startTransition } from "react"
import { toast } from "sonner"

type propsTypes = {
  isOpen:boolean
  setIsOpen:Dispatch<SetStateAction<boolean>>
  project:projectType
  fullProjects: projectsType
  filteredProjects:projectsType
  setFilteredProjects:(action: projectsType) => void
}

export default function DeleteProject({isOpen,setIsOpen,project,filteredProjects,fullProjects,setFilteredProjects}:propsTypes) {
  const handleDelete = async ()=> {

    // OPTIMISTIC UPDATE THE PROJECTS
    const newProjects : projectsType = JSON.parse(JSON.stringify(filteredProjects))
    const projectIndex = newProjects.findIndex(prjct => prjct.id === project.id)
    newProjects.splice(projectIndex,1)
    startTransition(()=> setFilteredProjects(newProjects))
    toast.success('Project deleted successfully')


    // UPDATING PROJECTS IN DB
    const projects : projectsType = JSON.parse(JSON.stringify(fullProjects))
    const prjctIndex = projects.findIndex(prjct => prjct.id === project.id)
    projects.splice(prjctIndex,1)
    const response = await updateProjectsInDb(projects)
    response.error && toast.error('Failed to delete the project!') 
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone and will permanently delete your project.
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
