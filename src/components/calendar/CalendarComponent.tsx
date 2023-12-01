"use client";

import {
  Calendar,
  DateSelectArg,
  EventApi,
  EventClickArg,
  formatDate,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {  useAppSelector } from "@/rtk/hooks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { generateRandomId } from "@/helpers/generateRandomId";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { updateCalendarInDb } from "@/server-actions/updateCalendarInDb";

type propsTypes = {
  calendarEvents: calendarType;
};

export default function CalendarComponent({ calendarEvents }: propsTypes) {
  const isAsideOpen = useAppSelector((state) => state.aside);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<DateSelectArg | null>(
    null
  );
  const [deleteEvent, setDeleteEvent] = useState<EventClickArg | null>(null);
  const eventInputRef = useRef<HTMLInputElement | null>(null);
  const calendarRef = useRef<FullCalendar | null>(null);

  useEffect(() => {
    const reSizeCalendar = () => {
      const calendar = calendarRef.current?.getApi();
      calendar?.updateSize();
    };

    reSizeCalendar();
  }, [isAsideOpen]);

  const openAddEventDialog = (selected: DateSelectArg) => {
    setIsAddDialogOpen(true);
    setSelectedEvent(selected);
  };

  const openDeleteEventDialog = (selected: EventClickArg) => {
    setIsDeleteDialogOpen(true);
    setDeleteEvent(selected);
  };

  const handleAddEvent = () => {
    const eventContent = eventInputRef.current?.value.trim() as string;
    if (selectedEvent) {
      let calendarApi = selectedEvent.view.calendar;
      calendarApi.unselect();

      if (eventContent === "") toast.error("Please write an event first");
      else {
        calendarApi.addEvent({
          id: `${eventContent}-${generateRandomId()}`,
          title: eventContent,
          start: selectedEvent.startStr,
          end: selectedEvent.endStr,
          allDay: selectedEvent.allDay,
        });

        setSelectedEvent(null);
        setIsAddDialogOpen(false);
        toast.success("Added succefully");
      }
    }
  };

  const handleDeleteEvent = () => {
    deleteEvent?.event.remove();
    toast.success(`Deleted succefully`);
  };

  const unsetSelectedEvent = () => {
    setSelectedEvent(null);
  };

  const unsetDeletedEvent = () => {
    setDeleteEvent(null);
  };

  const setEvents = async (events: any) => {
    const newEventsFormat: calendarType = JSON.parse(JSON.stringify(events));
    const result = await updateCalendarInDb(newEventsFormat);
    result.error && toast.error("Something wrong occured , your events might not be saved");
  };

  return (
    <>

      <FullCalendar
        ref={calendarRef}
        height={"77vh"}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        }}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        select={openAddEventDialog} // to add an event
        eventClick={openDeleteEventDialog} // to delete an event
        eventsSet={(events) => setEvents(events)} // called whenever events are initialized/added/changed/removed
        initialEvents={calendarEvents}
        longPressDelay={0} // to enable touch devices interactivity
      />

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={unsetSelectedEvent}
          onEscapeKeyDown={unsetSelectedEvent}
        >
          <DialogHeader>
            <DialogTitle>Add Event</DialogTitle>
            <DialogDescription>
              The event you will write will be added to the calendar
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event" className="text-center">
                Event
              </Label>
              <Input
                ref={eventInputRef}
                id="event"
                placeholder="write your event"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full" onClick={handleAddEvent}>
              Add 
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Do you wanna delete your event?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone and it will permanently delete your
              event
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={unsetDeletedEvent}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteEvent}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
