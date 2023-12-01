import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY_FB,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN_FB,
  projectId: process.env.NEXT_PUBLIC_PROJECTID_FB,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET_FB,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID_FB,
  appId: process.env.NEXT_PUBLIC_APPID_FB,
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)