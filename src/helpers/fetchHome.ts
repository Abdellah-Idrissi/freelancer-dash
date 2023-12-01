import { fetchCalendar } from "./fetchCalendar";
import { fetchClients } from "./fetchClients";
import { fetchKanban } from "./fetchKanban";
import { fetchProjects } from "./fetchProjects";



export const fetchKanbanInHome = async ()=> {

  const kanban = await fetchKanban()
  const totalTasks = kanban.reduce((sum, obj) => sum + obj.items.length, 0);

  return totalTasks

}


export const fetchCalendarInHome = async ()=> {
  const events = await fetchCalendar()
  return events.length
}


export const fetchClientsInHome = async ()=> {

  const {clients} = await fetchClients({})

  const donutChartArray : donutChartType = []

  clients.forEach((client) => {
    const referralSource = client.referralSource;
    const existingSource = donutChartArray.find((item) => item.name === referralSource );

    if (existingSource) {
      existingSource.number += 1;
    } else {
      donutChartArray.push({ name: referralSource , number: 1 });
    }
  });


  return {
    totalClients:clients.length,
    donutChartArray
  }

}


export const fetchProjectsInHome = async ()=> {


  const {fullProjects : projects} = await fetchProjects({})

  const barChartArray : barChartType = []

  projects.forEach((project) => {
    const projectType = project.type;
    const existingType = barChartArray.find((item) => item.name === projectType);

    if (existingType) {
      existingType["Project type count"] += 1;
    } else {
      barChartArray.push({ name: projectType, "Project type count": 1 });
    }
  });


  return {
    totalProjects:projects.length,
    barChartArray
  }

}
