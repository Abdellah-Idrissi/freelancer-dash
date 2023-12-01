import DndContextWrapper from "@/components/dnd/DndContext";
import { fetchKanban } from "@/helpers/fetchKanban";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'kanban | Freelancer Dash',
  description:'kanban of Freelancer Dash'
}


export default async function Kanban() {


  const {userId} = auth()

  if(!userId) {
    redirect('/sign-in?redirectUrl=/kanban')
  }


  const kanbanData : ContainerType[] = await fetchKanban()


  return (
    <div className="px-[20px] lg:px-[30px] pb-5">
      <DndContextWrapper kanbanData={kanbanData} />
    </div>
  )
}