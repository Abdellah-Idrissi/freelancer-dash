import { Dispatch, SetStateAction } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type propsTypes = {
  date:Date | undefined
  setdDate: Dispatch<SetStateAction<Date | undefined>>
}

export default function EndDateCalendar({date,setdDate}:propsTypes) {


  return (
    <Popover>
    <PopoverTrigger asChild>
      
      <Button
        variant={"outline"}
        className={cn(
          "col-span-3 justify-between text-left font-normal px-3 pr-2 ",
          !date && "text-muted-foreground"
        )}
      >
        {date ? format(date, "PPP") : <span>Pick an end date</span>}
        <CalendarIcon className="mr-2 h-4 w-4" />
      </Button>
    </PopoverTrigger>

    <PopoverContent className="w-auto p-0">
      <Calendar
        mode="single"
        defaultMonth={date}
        selected={date}
        onSelect={setdDate}
        initialFocus
        required
        disabled= {{ before:  new Date(new Date().getTime() + 24 * 60 * 60 * 1000) }}
      />
    </PopoverContent>
    </Popover>
  )
}
