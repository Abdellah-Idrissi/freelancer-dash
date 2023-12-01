"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { HiOutlineDotsVertical } from "react-icons/hi"
import { useState } from "react"
import EditProject from "./EditProjectForm"
import DeleteProject from "./DeleteProject"

type propsTypes = {
  project:projectType
  fullProjects: projectsType
  filteredProjects:projectsType
  setFilteredProjects:(action: projectsType) => void
}

export default function ProjectActions({project,filteredProjects,fullProjects,setFilteredProjects}:propsTypes) {
  const [isEditOpen,setIsEditOpen] = useState(false)
  const [isDeleteOpen,setIsDeleteOpen] = useState(false)


  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} className={'hover:bg-slate-50 transition-all duration-200 border border-transparent hover:border-neutral-200 rounded-full w-7 h-7 p-0 grid place-items-center dark:hover:border-neutral-700 '}>
            <HiOutlineDotsVertical size={15}  />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={()=> setIsEditOpen(true)}>Edit Project</DropdownMenuItem>
          <DropdownMenuItem onSelect={()=> setIsDeleteOpen(true)}>Delete Project</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditProject isOpen={isEditOpen} setIsOpen={setIsEditOpen} project={project} fullProjects={fullProjects} filteredProjects={filteredProjects} setFilteredProjects={setFilteredProjects} />
      <DeleteProject isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} project={project} fullProjects={fullProjects} filteredProjects={filteredProjects} setFilteredProjects={setFilteredProjects}/>
    </>
  )
}
