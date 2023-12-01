import { toast } from "sonner"

export default function checkIfProjectDataDiff(title:string,desc:string,type:projectTypeTypes,startDate:Date,endDate:Date , project:projectType) {

  if(title === project.title && desc === project.description && type === project.type && startDate.getTime() === project.startDate.getTime() && endDate.getTime() === project.endDate.getTime()) {
    toast.error(`Project's data didn't change!`)
    return false
  }

  return true
}
