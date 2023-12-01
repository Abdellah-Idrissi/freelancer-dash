import { db } from "@/firebase/setup";
import { auth } from "@clerk/nextjs";
import { doc, getDoc, setDoc } from "firebase/firestore";


export async function fetchClients(searchParams:{ [key: string]: string | string[] | undefined }) {
  const pageIndex = searchParams['pageInd'] ?  +searchParams['pageInd'] : 0
  
  const pageSize = searchParams['pageSize'] ?  +searchParams['pageSize'] : 10

  const sort = searchParams['emailSort'] ? [{id:'email',desc:searchParams['emailSort'] === 'desc' ? true : false }] :
  searchParams['projectsSort'] ? [{id:'projects',desc:searchParams['projectsSort'] === 'desc' ? true : false }] : []

  const filter = searchParams['referralSource'] && searchParams['nameSearch'] ? 
  [{id:'referralSource',value:searchParams['referralSource']}, {id:'name',value:searchParams['nameSearch']}] : 
  searchParams['referralSource'] ? [{id:'referralSource',value:searchParams['referralSource']}] : 
  searchParams['nameSearch'] ? [{id:'name',value:searchParams['nameSearch']}] : []


  const {userId} = auth()
  let clients : clientType[] = []

  try {
    const docRef = doc(db, userId as string, "clients")
    const docSnap = await getDoc(docRef)
  
    if(!docSnap.exists()) {
      await setDoc(doc(db, userId as string, "clients"), {data:[]})
    }
  
    else {
      clients = docSnap.data().data as clientType[]
    }
  }

  catch(error){
    console.log(error)
    throw Error(`failed while fetching clients data`)
  }

  return {clients,pagination:{pageIndex,pageSize},sort,filter}
}

