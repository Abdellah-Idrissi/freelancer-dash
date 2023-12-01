import { RefObject } from "react"
import { toast } from "sonner"

export default function clientFormValidation(nameRef:RefObject<HTMLInputElement>,emailRef:RefObject<HTMLInputElement>,projectsRef:RefObject<HTMLInputElement>,selectedCountry:string,selectedSource:string) {

  const name = nameRef.current?.value.trim() as string
  const email = emailRef.current?.value.trim() as string
  const projects = projectsRef.current?.value.trim() as string
  const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  const isEmailValid = email.match(emailFormat)
  const nameFormat =  /^[A-Za-z\s'-]+$/
  const isNameValid = name.match(nameFormat)

  if(name === '' || email === '' || projects === '' || selectedCountry === '' || selectedSource === '')  {
    toast.error('Please fill out the inputs')
    return false
  }

  if(!isNameValid) {
    toast.error(`Enter a valid name format`)
    return false
  }

  if(!isEmailValid) {
    toast.error('Enter a valid email format')
    return false
  }

  if(Number(projects) < 1) {
    toast.error(`Projects should be from 1 and above`)
    return false
  }

  return {name,projects:+projects,email}
}
