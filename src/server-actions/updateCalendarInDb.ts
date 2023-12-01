"use server"

import { db } from "@/firebase/setup"
import { auth } from "@clerk/nextjs"
import { doc, setDoc } from "firebase/firestore"
import { revalidatePath } from "next/cache"


export async function updateCalendarInDb(calendarData:calendarType) {
  const {userId} = auth()

  try {
    await setDoc(doc(db, userId as string, "calendar"), {data:calendarData})
    return { error:false } as serverActionReturnType
  }
  catch(err){
    return { error:true, message: err instanceof Error ? err.message : '' } as serverActionReturnType
  }
  finally {
    revalidatePath('/calendar')
    revalidatePath('/')

  }
}
