"use server"

import { db } from "@/firebase/setup"
import { auth } from "@clerk/nextjs"
import { doc, setDoc } from "firebase/firestore"
import { revalidatePath } from "next/cache"


export async function updateProjectsInDb(projects:projectsType) {
  const {userId} = auth()

  try {
    await setDoc(doc(db, userId as string, "projects"), {data:projects})
    return { error:false } as serverActionReturnType
  }
  catch(err){
    return { error:true, message: err instanceof Error ? err.message : '' } as serverActionReturnType
  }
  finally {
    revalidatePath('/projects')
    revalidatePath('/')
  }
}