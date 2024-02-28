"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { TimePicker } from "./time-picker";

export function DateTimePicker({
  date,
  setDate,
  minDate,
}: {
  date: Date;
  setDate: (date: Date | undefined) => void;
  minDate?: Date;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP HH:mm:ss") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto border-neutral-700 bg-neutral-900 p-0 text-neutral-100">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          weekStartsOn={1}
          disabled={(day) => day < (minDate ?? new Date())}
        />
        <div className="border-t border-neutral-600 p-3">
          <TimePicker setDate={setDate} date={date} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
