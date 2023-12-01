
import { db } from "@/firebase/setup";
import { auth } from "@clerk/nextjs";
import { doc, getDoc, setDoc } from "firebase/firestore";


const initialKanbanState : ContainerType[] = [
  {
    id:1,
    title:'todo',
    items: []

  },
  {
    id:2,
    title:'doing',
    items: []
  },
  {
    id:3,
    title:'done',
    items: []
  }
]


export async function fetchKanban() {
  const {userId} = auth()

  try {
    const docRef = doc(db, userId as string, "kanban")
    const docSnap = await getDoc(docRef)
  
    if(!docSnap.exists()) {
      await setDoc(doc(db, userId as string, "kanban"), {data:initialKanbanState})
      return initialKanbanState
    }
  
    else {
      return docSnap.data().data as ContainerType[]
    }
  }

  catch(error){
    console.log(error)
    throw Error(`failed while fetching kanban data`)
  }
  
}


