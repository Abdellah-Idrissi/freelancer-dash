"use client"

import { useEffect, useOptimistic } from "react"
import AddProject from "./AddProject"
import ProjectCard from "./ProjectCard"
import { ProjectsSearch } from "./ProjectsSearch"

type propsTypes = {
  fullProjectsData:projectsType
  filteredProjectsData:projectsType
}

export default function ProjectsCards({fullProjectsData,filteredProjectsData}:propsTypes) {


  const [filteredProjects,setFilteredProjects] =  useOptimistic(filteredProjectsData,(_,newProjects:projectsType)=> newProjects)




  return (
    <>
      <div className="w-full mb-5 flex flex-col sm:flex-row gap-6 gap-y-4 flex-wrap justify-between">
        <AddProject filteredProjects={filteredProjects} fullProjects={fullProjectsData} setFilteredProjects={setFilteredProjects}/>
        <ProjectsSearch fullProjects={fullProjectsData} setFilteredProjects={setFilteredProjects} />
      </div>

      {filteredProjects.length > 0 ?
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map(project=> 
            <ProjectCard 
              key={project.id} 
              project={{...project, endDate:new Date(project.endDate) , startDate:new Date(project.startDate)}} 
              filteredProjects={filteredProjects}
              fullProjects={fullProjectsData}
              setFilteredProjects={setFilteredProjects}
            />
          )}
        </div> :
        <div className="text-center text-sm mt-[100px]">No Projects Data.</div>
      }

    </>
  )
}
