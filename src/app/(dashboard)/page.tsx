import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Cards from "@/components/stats_cards/cards";
import ProjectTypesBarChart from "@/components/charts/ProjectTypesBarChart";
import ClientsSource from "@/components/charts/ClientsSource";
import { fetchCalendarInHome, fetchClientsInHome, fetchKanbanInHome, fetchProjectsInHome } from "@/helpers/fetchHome";

export default async function Home() {
  const {userId} = auth()

  if(!userId) {
    redirect('/sign-in?redirectUrl=/')
  }
  
  const kanbanPromise = fetchKanbanInHome()
  const eventsPromise = fetchCalendarInHome()
  const clientsPromise = fetchClientsInHome()
  const projectsPromise = fetchProjectsInHome()

  const [totalTasks, totalEvents,{totalClients,donutChartArray},{totalProjects,barChartArray}] = await Promise.all([kanbanPromise,eventsPromise,clientsPromise,projectsPromise])


  return (
    <div className="w-full px-[20px] lg:px-[30px] flex flex-col ">

      <Cards totalClients={totalClients} totalEvents={totalEvents} totalProjects={totalProjects} totalTasks={totalTasks}/>

      <div className=" flex flex-col gap-[20px] my-[20px]">
        <ProjectTypesBarChart  chartData={barChartArray}/>
        <ClientsSource chartData={donutChartArray}/>
      </div>

    </div>
  );
}
