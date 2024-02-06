"use client";

import { useEffect, useState } from "react";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { AutoComplete } from "~/components/autocomplete";
import { Button } from "~/components/ui/button";
import { DateTimePicker } from "~/components/ui/date-time-picker";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function Organizatorji() {
  const [page, setPage] = useState(0);

  const [name, setName] = useState("");
  const [start, setStart] = useState<Date>(new Date());
  const [end, setEnd] = useState(new Date());

  const [location, setLocation] = useState("");

  // Custom function to handle date or undefined for start date
  const handleSetStart = (date: Date | undefined) => {
    if (date) setStart(date);
    // Else handle 'undefined' case as needed
  };

  // Custom function to handle date or undefined for end date
  const handleSetEnd = (date: Date | undefined) => {
    if (date) setEnd(date);
    // Else handle 'undefined' case as needed
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-1/3 rounded-2xl bg-neutral-900 p-6">
        {page === 0 && (
          <>
            <h1 className="mb-4 text-center text-2xl font-bold">
              Kaj, Kdaj, Kje?
            </h1>
            <Label htmlFor="name">Ime dogodka</Label>
            <Input
              id="name"
              className="mb-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-x-4">
              <Label>Začetek</Label>
              <Label>Konec</Label>

              <DateTimePicker date={start} setDate={handleSetStart} />

              <DateTimePicker date={end} setDate={handleSetEnd} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-x-4">
              <Label>Lokacija</Label>
              <Label className="mb-1">Vrsta dogodka</Label>

              <AutoComplete
                emptyMessage="Ni rezultatov"
                options={[
                  { label: "New York", value: "New York" },
                  { label: "London", value: "London" },
                  { label: "Paris", value: "Paris" },
                  { label: "Tokyo", value: "Tokyo" },
                  { label: "Los Angeles", value: "Los Angeles" },
                ]}
              />

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Izberi vrsto dogodka" />
                </SelectTrigger>
                <SelectContent className="border border-neutral-800">
                  <SelectGroup>
                    <SelectItem value="koncert">Koncert</SelectItem>
                    <SelectItem value="festival">Festival</SelectItem>
                    <SelectItem value="DJ">DJ Party</SelectItem>
                    <SelectItem value="zabava">Zabava</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectItem value="razstava">Razstava</SelectItem>
                    <SelectItem value="film">Film</SelectItem>
                    <SelectItem value="predstava">Predstava</SelectItem>
                    <SelectItem value="stand-up">Stand-up komedija</SelectItem>
                    <SelectItem value="kvizi">Kvizi</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectItem value="konferenca">Konferenca</SelectItem>
                    <SelectItem value="seminar">Seminar</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectItem value="kolesarstvo">Kolesarstvo</SelectItem>
                    <SelectItem value="kosarka">Košarka</SelectItem>
                    <SelectItem value="paintball">Paintball</SelectItem>
                    <SelectItem value="rafting">Rafting</SelectItem>
                    <SelectItem value="tek-maraton">Tek / Maraton</SelectItem>
                    <SelectItem value="turnirji">Turnirji</SelectItem>
                    <SelectItem value="mma">MMA</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectItem value="networking">Networking</SelectItem>
                    <SelectItem value="delavnica">Delavnica</SelectItem>
                    <SelectItem value="ostalo">Ostalo</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectItem value="privatni-dogodek">
                      Privatni dogodek
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        <div className="mt-12 flex justify-end">
          {page > 0 && <Button onClick={() => setPage(page - 1)}>Nazaj</Button>}
          <Button onClick={() => setPage(page + 1)} variant="secondary">
            Naprej
          </Button>
        </div>
      </div>
    </div>
  );
}
