import CalendarComponent from "@/components/calendar/CalendarComponent";
import { fetchCalendar } from "@/helpers/fetchCalendar";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Calendar | Freelancer Dash',
  description:'Calendar of Freelancer Dash'
}

export default async function Calendar() {
  const {userId} = auth();

  if (!userId) {
    redirect("/sign-in?redirectUrl=/calendar");
  }

  const calendarData: calendarType = await fetchCalendar();


  return (
    <div className="px-[20px] lg:px-[30px] pb-5">
      <CalendarComponent calendarEvents={calendarData} />
    </div>
  );
}
