"use server"

import { documents } from "@/arrays/documents";
import { db } from "@/firebase/setup";
import { clerkClient } from "@clerk/nextjs";
import { deleteDoc, doc } from "firebase/firestore";


export default async function deleteUserInDb(userId:string) {
  await clerkClient.users.deleteUser(userId);

  documents.map(async (document)=> {
    await deleteDoc(doc(db, userId, document))
  })

}
