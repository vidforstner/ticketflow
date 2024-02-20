"use client";

import { DateTimePicker } from "@/components/ui/date-time-picker";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";

const eventFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Ime dogodka mora biti dolgo vsaj 2 znaka",
    })
    .max(50, {
      message: "Ime dogodka ne sme biti daljše od 50 znakov",
    }),
  start: z.date(),
  end: z.date(),
  location: z.object({
    label: z.string(),
    value: z.object({
      description: z.string(),
      place_id: z.string(),
      reference: z.string(),
      structured_formatting: z.object({
        main_text: z.string(),
        secondary_text: z.string(),
      }),
      terms: z.array(
        z.object({
          offset: z.number(),
          value: z.string(),
        }),
      ),
      types: z.array(z.string()),
    }),
  }),
  type: z.string().min(2).max(50),
  tickets: z.array(
    z.object({
      name: z
        .string()
        .min(2, {
          message: "Ime vstopnice mora biti dolgo vsaj 2 znaka",
        })
        .max(50),
      amount: z
        .number()
        .int({
          message: "Količina mora biti celo število",
        })
        .positive({
          message: "Količina mora biti pozitivno število",
        }),
      price: z.number().nonnegative(),
      start: z.date(),
      end: z.date(),
      details: z.string().optional(),
    }),
  ),
  imageUrl: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  website: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  youtube: z.string().optional(),
  description: z.string().optional(),
});

type EventFormValues = z.infer<typeof eventFormSchema>;

const defaultTicketValues: Partial<EventFormValues["tickets"][0]> = {
  name: "",
  amount: 0,
  start: new Date(),
  end: new Date(),
  details: "",
  price: 0,
};

const defaultValues: Partial<EventFormValues> = {
  start: new Date(),
  end: new Date(),
  tickets: [defaultTicketValues as EventFormValues["tickets"][0]],
};

export default function EventForm() {
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const {
    fields,
    append: appendTicket,
    remove,
  } = useFieldArray({
    name: "tickets",
    control: form.control,
  });

  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ime dogodka</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="start"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Začetek</FormLabel>
              <FormControl>
                <DateTimePicker
                  date={field.value}
                  setDate={(date) => {
                    field.onChange(date);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="end"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Konec</FormLabel>
              <FormControl>
                <div>
                  <DateTimePicker
                    date={field.value}
                    setDate={(date) => {
                      field.onChange(date);
                    }}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lokacija</FormLabel>
              <FormControl>
                <GooglePlacesAutocomplete
                  apiOptions={{
                    language: "sl",
                    region: "SI",
                  }}
                  selectProps={{
                    value: field.value,
                    onChange: (value) => {
                      field.onChange(value);
                    },
                    styles: {
                      control: (provided, state) => ({
                        ...provided,
                        backgroundColor: "#171717",
                        borderColor: state.isFocused ? "#262626" : "#262626",
                        color: "#FFFFFF",
                        boxShadow: state.isFocused
                          ? "none"
                          : provided.boxShadow,
                        "&:hover": {
                          borderColor: "#262626",
                        },
                      }),
                      input: (provided) => ({
                        ...provided,
                        color: "#FFFFFF",
                        "&:focus": {
                          outline: "none",
                        },
                      }),
                      singleValue: (provided) => ({
                        ...provided,
                        color: "#FFFFFF",
                      }),
                      menu: (provided) => ({
                        ...provided,
                        backgroundColor: "#171717",
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isSelected
                          ? "#27272a"
                          : "#171717",
                        color: "#FFFFFF",
                        "&:hover": {
                          backgroundColor: "#27272a",
                        },
                      }),
                    },
                  }}
                  apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vrsta dogodka</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
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
                      <SelectItem value="stand-up">
                        Stand-up komedija
                      </SelectItem>
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
              </FormControl>
            </FormItem>
          )}
        />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[100px]">Ime</TableHead>
              <TableHead>Količina</TableHead>
              <TableHead>Cena (€)</TableHead>
              <TableHead>Začetek Prodaje</TableHead>
              <TableHead>Konec Prodaje</TableHead>
              <TableHead className="min-w-[100px]">Opis</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {fields.map((field, index) => (
              <TableRow key="index">
                <TableCell className="min-w-[100px] align-top">
                  <FormField
                    control={form.control}
                    name={`tickets.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell className="align-top">
                  <FormField
                    control={form.control}
                    name={`tickets.${index}.amount`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            onChange={(e) => field.onChange(+e.target.value)}
                            type="number"
                            min={0}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell className="align-top">
                  <FormField
                    control={form.control}
                    name={`tickets.${index}.price`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            onChange={(e) =>
                              field.onChange(+e.target.value * 10)
                            }
                            value={field.value / 10}
                            type="number"
                            min={0}
                            step="0.01"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />{" "}
                </TableCell>
                <TableCell className="text-right align-top">
                  <Input />
                </TableCell>
                <TableCell className="min-w-[100px] text-right align-top">
                  <Input />
                </TableCell>
                <TableCell className="min-w-[100px] align-top">
                  <Input />
                </TableCell>
                <TableCell className="flex items-center justify-center">
                  <Button onClick={() => remove(index)} className="p-3">
                    <XIcon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <Button
            onClick={() =>
              appendTicket(defaultTicketValues as EventFormValues["tickets"][0])
            }
            variant="outline"
            className="mx-2"
            type="button"
          >
            Dodaj vstopnico
          </Button>
        </Table>
      </form>
    </Form>
  );
}
