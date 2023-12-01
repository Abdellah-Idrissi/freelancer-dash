"use client"

import {startTransition, useState} from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { projectTypes } from "@/arrays/projectTypes"
import { LuX } from "react-icons/lu";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";

type propsTypes = {
  fullProjects:projectsType
  setFilteredProjects:(action: projectsType) => void
}

export function ProjectsSearch({fullProjects,setFilteredProjects}:propsTypes) {
  const searchParams = useSearchParams()
  const [value, setValue] = useState<projectTypeTypes | ''>(searchParams.get('type') ? searchParams.get('type') as projectTypeTypes  : '')
  const router = useRouter()

  const handleChangeOfValue = async (v:string)=> {
    setValue(v as projectTypeTypes)
    const filterdProjects = fullProjects.filter(project=> project.type === v)
    startTransition(()=> setFilteredProjects(filterdProjects))
    router.push(`/projects?type=${v}`,{scroll:false})
  }

  const resetFilter = async ()=> {
    setValue('')
    startTransition(()=> setFilteredProjects(fullProjects))
    router.push(`/projects`,{scroll:false})
  }

  return (
    <div className="flex items-center gap-3 ">
      <Select value={value} onValueChange={handleChangeOfValue}>
        <SelectTrigger className="w-full sm:w-[250px] font-medium mx-auto sm:mx-0">
          <SelectValue placeholder={"Filter projects by type"} />
        </SelectTrigger>
        <SelectContent className="w-full">
          {projectTypes.map((projectType) => (
            <SelectItem key={projectType} value={projectType}>
              {projectType}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {
        value &&
        <Button onClick={resetFilter} variant={'outline'} className=" flex items-center gap-2 " >
          <LuX className={'h-[13px] w-[13px] mt-[2px]'}/>
        </Button>
      }

    </div>
  )
}
