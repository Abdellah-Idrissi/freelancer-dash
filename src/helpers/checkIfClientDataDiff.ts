import { toast } from "sonner";

export default function checkIfClientDataDiff(name:string,email:string,projects:number,selectedCountry:string,selectedSource:string,client:clientType) {

  if(name === client.name && email === client.email && projects === +client.projects && selectedCountry === client.country && selectedSource === client.referralSource) {
    toast.success(`User's data didn't change!`)
    return false
  }

  return true

}
