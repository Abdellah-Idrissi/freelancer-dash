import { DataTable } from "@/components/clients-table/DataTable";
import { fetchClients } from "@/helpers/fetchClients";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";


export const metadata: Metadata = {
  title: 'Clients | Freelancer Dash',
  description:'Clients of Freelancer Dash'
}

type propsTypes = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Clients({searchParams}:propsTypes) {

  const {userId} = auth()

  if(!userId) {
    redirect('/sign-in?redirectUrl=/clients')
  }


  const {clients,filter,pagination,sort} = await fetchClients(searchParams)

  return (
    <div className="px-[20px] lg:px-[30px] pb-5 ">

      <DataTable 
        data={clients} 
        paginate={pagination}
        sort={sort}
        filter={filter}
      />

    </div>
  )
}