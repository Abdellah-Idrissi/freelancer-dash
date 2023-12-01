import { toast } from "sonner"

export default function projectFormValidation(title:string,desc:string,type:projectTypeTypes | '',startDate:Date | undefined,endDate:Date | undefined) {


  if(title.trim() === '') {
    toast.success("Please fill the title")
    return false
  }

  if(title.length < 2) {
    toast.success("Title must be more than 2 characters")
    return false
  }

  if(desc.trim() === '') {
    toast.success("Please fill the description")
    return false
  }

  if(type === '') {
    toast.success("Please select a type")
    return false
  }

  if(startDate === undefined) {
    toast.success("Please select a startDate")
    return false
  }

  if(endDate === undefined) {
    toast.success("Please select an endDate")
    return false
  }

  if(endDate <= startDate) {
    toast.success("start date must be before the end date!")
    return false
  }

  return true
}
