import { AiOutlineCheckCircle, AiOutlineClockCircle } from "react-icons/ai"
import { Badge } from "../ui/badge"
import { Separator } from "../ui/separator"
import ProjectActions from "./ProjectActions"
import { BiLoaderCircle } from "react-icons/bi"

type propsType = {
  project:projectType
  fullProjects: projectsType
  filteredProjects:projectsType
  setFilteredProjects:(action: projectsType) => void
}

export default function ProjectCard({project,filteredProjects,fullProjects,setFilteredProjects}:propsType) {
  const {description,endDate,startDate,title,type} = project
  
  return (
    <div className="p-4  border shadow-sm dark:border-neutral-700/60 rounded-md hover:bg-gray-50 group cursor-pointer flex flex-col dark:hover:bg-neutral-800 ">
      <div className="flex gap-x-3 justify-between">
        <h3 className="font-semibold text-[19px] mb-1 first-letter:capitalize group-hover:underline ">{title}</h3>
        <ProjectActions project={project} filteredProjects={filteredProjects} fullProjects={fullProjects} setFilteredProjects={setFilteredProjects}/>
      </div>
      <p className="text-neutral-600 text-[14px] dark:text-zinc-500 break-all ">{description}</p>

      <Separator className="my-4 mb-3 dark:bg-neutral-700/80"/>

      <div className="flex flex-col flex-1 @container">

        <div className="gap-2 flex flex-col @[250px]:flex-row ">
          <div className="text-[14px] w-full flex flex-col gap-1 font-semibold">Start Date 
            <Badge className="text-center">
              {startDate.toLocaleDateString()}
            </Badge> 
          </div>
          <div className="text-[14px] w-full flex flex-col gap-1 font-semibold">End Date 
            <Badge className="text-center">
              {endDate.toLocaleDateString()}
            </Badge> 
          </div>
        </div>

        <Separator className="my-4 mb-3 dark:bg-neutral-700/80 "/>

        <div className="flex flex-col gap-1 font-semibold text-[14px]">
          Project Type
          <Badge>{type}</Badge>
        </div> 

        <Separator className="my-4 dark:bg-neutral-700/80 "/>
        <div className="flex-1 flex items-end ">
          {
            endDate <= new Date() ?

            <div className="bg-green-100/80 text-green-400 border border-green-200/90  flex gap-x-1 items-center rounded-md w-fit ml-auto  py-[2px] px-1 text-xs dark:bg-[#00800052] dark:border-green-200/30"><AiOutlineCheckCircle size={13}/> Completed</div> :
            
            startDate > new Date() ? 

            <div className="rounded-md bg-[#f9731630] border border-[#f9731659]  text-[#f97316] ml-auto flex gap-x-1 items-center w-fit text-xs py-[2px] px-1"><BiLoaderCircle size={13}/>
              Not started yet
            </div> :

            <div className="rounded-md bg-[#f1595b3d] border border-[#f1595b3d]  text-[#F1595C] ml-auto flex gap-x-1 items-center w-fit text-xs py-[2px] px-1"><AiOutlineClockCircle size={13}/>
              { Math.ceil((endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) === 1 ? '1 Day remaining' :
                `${Math.ceil((endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} Remaining days`
              } 
            </div>
          }
          
        </div>
        
      </div>


    </div>
  )
}
