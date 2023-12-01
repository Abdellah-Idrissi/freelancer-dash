import ProjectsCards from "@/components/projects_compo/ProjectsCards";
import { fetchProjects } from "@/helpers/fetchProjects";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Proejcts | Freelancer Dash',
  description:'Proejcts of Freelancer Dash'
}


type propsTypes = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Projects({searchParams}:propsTypes) {
  const {userId} = auth()

  if(!userId) {
    redirect('/sign-in?redirectUrl=/projects')
  }


  const {filteredProjects,fullProjects} = await fetchProjects(searchParams)


  return (
    <div className="px-[20px] lg:px-[30px] pb-5 ">

      <ProjectsCards filteredProjectsData={filteredProjects} fullProjectsData={fullProjects}/> 

    </div>
  )
}
