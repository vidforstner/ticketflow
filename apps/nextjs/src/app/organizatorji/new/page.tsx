"use client";

import { useState } from "react";
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
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

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

  const [tickets, setTickets] = useState(
    [] as {
      name: string;
      amount: number;
      start: Date;
      end: Date;
      details: string;
    }[],
  );

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

              <GooglePlacesAutocomplete
                selectProps={{
                  styles: {
                    control: (provided, state) => ({
                      ...provided,
                      backgroundColor: "#171717", // Dark background for the input
                      borderColor: state.isFocused ? "#262626" : "#262626", // Consistent border color
                      color: "#FFFFFF", // Set text color to white
                      boxShadow: state.isFocused ? "none" : provided.boxShadow, // Remove boxShadow on focus
                      "&:hover": {
                        borderColor: "#262626", // Maintain border color on hover
                      },
                      // Apply additional styles to ensure text color and remove outline
                    }),
                    input: (provided) => ({
                      ...provided,
                      color: "#FFFFFF", // This ensures the text inside the input is white
                      "&:focus": {
                        outline: "none", // Remove outline on focus
                      },
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "#FFFFFF", // This ensures the text inside the input is white
                    }),
                    menu: (provided) => ({
                      ...provided,
                      backgroundColor: "#171717", // Dark background for the dropdown
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isSelected ? "#27272a" : "#171717", // Different background if option is selected
                      color: "#FFFFFF", // Text color for options
                      "&:hover": {
                        backgroundColor: "#27272a", // Background color on hover
                      },
                    }),
                  },
                }}
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
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

        {page === 1 && (
          <>
            <h1 className="mb-4 text-center text-2xl font-bold">Vstopnice</h1>

            <Label htmlFor="ticketName">Ime vstopnice</Label>
            <Input
              id="ticketName"
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

              <GooglePlacesAutocomplete
                selectProps={{
                  styles: {
                    control: (provided, state) => ({
                      ...provided,
                      backgroundColor: "#171717", // Dark background for the input
                      borderColor: state.isFocused ? "#262626" : "#262626", // Consistent border color
                      color: "#FFFFFF", // Set text color to white
                      boxShadow: state.isFocused ? "none" : provided.boxShadow, // Remove boxShadow on focus
                      "&:hover": {
                        borderColor: "#262626", // Maintain border color on hover
                      },
                      // Apply additional styles to ensure text color and remove outline
                    }),
                    input: (provided) => ({
                      ...provided,
                      color: "#FFFFFF", // This ensures the text inside the input is white
                      "&:focus": {
                        outline: "none", // Remove outline on focus
                      },
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "#FFFFFF", // This ensures the text inside the input is white
                    }),
                    menu: (provided) => ({
                      ...provided,
                      backgroundColor: "#171717", // Dark background for the dropdown
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isSelected ? "#27272a" : "#171717", // Different background if option is selected
                      color: "#FFFFFF", // Text color for options
                      "&:hover": {
                        backgroundColor: "#27272a", // Background color on hover
                      },
                    }),
                  },
                }}
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
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
