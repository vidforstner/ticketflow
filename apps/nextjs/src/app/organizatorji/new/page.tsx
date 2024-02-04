"use client";

import { useState } from "react";
import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function Organizatorji() {
  const [page, setPage] = useState(0);

  const [name, setName] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-1/3 rounded-2xl bg-neutral-900 p-6">
        <h1 className="mb-4 text-center text-2xl font-bold">Kaj, Kdaj, Kje?</h1>

        <Label htmlFor="name">Ime dogodka</Label>
        <Input id="name" className="mb-4" />

        <div className="grid grid-cols-2 gap-x-4">
          <Label>Začetek</Label>
          <Label>Konec</Label>

          <div className="mt-1 grid grid-cols-2 gap-2">
            <DatePicker date={start} setDate={(date) => setStart(date)} />
            <Input className="mb-4" />
          </div>

          <div className="mt-1 grid grid-cols-2 gap-2">
            <Input className="mb-4" />
            <Input className="mb-4" />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button onClick={() => setPage(page - 1)}>Nazaj</Button>
          <Button onClick={() => setPage(page + 1)} variant="secondary">
            Naprej
          </Button>
        </div>
      </div>
    </div>
  );
}

export function DatePicker({
  date,
  setDate,
}: {
  date: Date;
  setDate: (date: Date) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start border-neutral-800 bg-transparent p-2 text-left font-normal hover:bg-neutral-900 hover:text-neutral-200 focus:border-neutral-700",
            !date && "text-muted-foreground",
          )}
        >
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto border-neutral-700 bg-neutral-900 p-0 text-neutral-100"
        align="start"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date: Date | undefined) => setDate(date ?? new Date())}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
