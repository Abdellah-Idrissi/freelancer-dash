
import { db } from "@/firebase/setup";
import { auth } from "@clerk/nextjs";
import { doc, getDoc, setDoc } from "firebase/firestore";



async function fetchFullProjects() {
  const {userId} = auth()

  try {
    const docRef = doc(db, userId as string, "projects")
    const docSnap = await getDoc(docRef)
  
    if(!docSnap.exists()) {
      await setDoc(doc(db, userId as string, "projects"), {data:[]})
      return []
    }
  
    else {
      return docSnap.data().data as projectsType
    }
  }

  catch(error){
    console.log(error)
    throw Error(`failed while fetching projects data`)
  }
  
}



export const fetchProjects = async (searchParams: { [key: string]: string | string[] | undefined })=> {

  const fullProjects = await fetchFullProjects()
  const type = searchParams.type

  let filteredProjects : projectsType = fullProjects

  if(type) {
    filteredProjects = fullProjects.filter(project=> project.type === type)
  }

  return {fullProjects,filteredProjects}
}