
import { db } from "@/firebase/setup";
import { auth } from "@clerk/nextjs";
import { doc, getDoc, setDoc } from "firebase/firestore";


export async function fetchCalendar() {

  const {userId} = auth()

  try {
    const docRef = doc(db, userId as string, "calendar")
    const docSnap = await getDoc(docRef)
  
    if(!docSnap.exists()) {
      await setDoc(doc(db, userId as string, "calendar"), {data:[]})
      return [] as calendarType
    }
  
    else {
      return docSnap.data().data as calendarType
    }
  }

  catch(error){
    console.log(error)
    throw Error(`failed while fetching calendar data`)
  }
  
}
