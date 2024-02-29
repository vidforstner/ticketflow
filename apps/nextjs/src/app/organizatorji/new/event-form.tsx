"use client";

import type { z } from "zod";
import { useEffect, useState } from "react";
import Image from "next/image";
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
import { Editor } from "@tinymce/tinymce-react";
import { XIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useFieldArray, useForm } from "react-hook-form";

import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { UploadButton } from "~/utils/uploadthing";
import { createEvent } from "./event-action";
import { eventSchema } from "./schema";

type EventFormValues = z.infer<typeof eventSchema>;

const defaultTicketValues: Partial<EventFormValues["tickets"][0]> = {
  name: "",
  amount: 0,
  start: new Date(new Date().setHours(12, 0, 0, 0) + 24 * 60 * 60 * 1000),
  end: new Date(new Date().setHours(22, 0, 0, 0) + 24 * 60 * 60 * 1000),
  details: "",
  price: 0,
};

const defaultValues: Partial<EventFormValues> = {
  start: new Date(new Date().setHours(20, 0, 0, 0) + 24 * 60 * 60 * 1000),
  end: new Date(new Date().setHours(23, 0, 0, 0) + 24 * 60 * 60 * 1000),
  tickets: [defaultTicketValues as EventFormValues["tickets"][0]],
};

export default function EventForm() {
  const [isUploading, setIsUploading] = useState(false);
  const [isSlugLinked, setIsSlugLinked] = useState(true);

  const { execute, result, status, reset } = useAction(createEvent);

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
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

  useEffect(() => {
    form.watch((value, { name, type }) => {
      if (type === "change" && name === "name" && isSlugLinked)
        form.setValue(
          "slug",
          (value.name ?? "").replace(/\s/g, "-").toLowerCase(),
        );

      if (type === "change" && name === "slug") setIsSlugLinked(false);
    });
  }, [form, isSlugLinked]);

  function onSubmit(values: z.infer<typeof eventSchema>) {
    execute(values);
  }

  if (status === "hasSucceeded")
    return (
      <div>
        <h2 className="text-center text-xl font-semibold">
          Uspešno ste ustvarili dogodek!
        </h2>
      </div>
    );

  if (status === "hasErrored")
    return (
      <div>
        <p>{result.fetchError}</p>
        <p>{result.serverError}</p>

        <Button onClick={() => reset}>Poskusi ponovno</Button>
      </div>
    );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-6">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Slika Dogodka</FormLabel>
                <FormControl>
                  <div className="relative mx-auto flex aspect-[9/12] min-w-[300px] items-center justify-center rounded-xl border border-neutral-800">
                    {field.value ? (
                      <div>
                        <Image
                          alt="poster"
                          src={field.value}
                          objectFit="cover"
                          fill
                          className="rounded-xl"
                        />

                        <button
                          onClick={() => field.onChange("")}
                          className="absolute right-2 top-2 rounded-full bg-neutral-800 p-1"
                        >
                          <XIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ) : isUploading ? (
                      <>uploading</>
                    ) : (
                      <UploadButton
                        content={{
                          button: "Naloži sliko",
                        }}
                        appearance={{
                          button: {
                            background: "white",
                            color: "black",
                            padding: "10px 20px",
                          },
                        }}
                        onUploadBegin={() => setIsUploading(true)}
                        onClientUploadComplete={(res) => {
                          field.onChange(res[0]?.url);
                          setIsUploading(false);
                        }}
                        endpoint="imageUploader"
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grow space-y-2">
            <h2 className="mb-2 text-2xl font-semibold">Podatki o dogodku</h2>

            <div className="grid grid-cols-2 gap-4">
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
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL Dogodka</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      https://ticketflow.si/dogodek/{field.value}
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
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
                        minDate={form.watch("start")}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
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
                            borderColor: state.isFocused
                              ? "#262626"
                              : "#262626",
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
                          <SelectItem value="dj">DJ Party</SelectItem>
                          <SelectItem value="zabava">Zabava</SelectItem>
                        </SelectGroup>
                        <SelectSeparator />
                        <SelectGroup>
                          <SelectItem value="razstava">Razstava</SelectItem>
                          <SelectItem value="film">Film</SelectItem>
                          <SelectItem value="predstava">Predstava</SelectItem>
                          <SelectItem value="stand_up">
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
                          <SelectItem value="kolesarstvo">
                            Kolesarstvo
                          </SelectItem>
                          <SelectItem value="kosarka">Košarka</SelectItem>
                          <SelectItem value="paintball">Paintball</SelectItem>
                          <SelectItem value="rafting">Rafting</SelectItem>
                          <SelectItem value="tek-maraton">
                            Tek / Maraton
                          </SelectItem>
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
                          <SelectItem value="privatni_dogodek">
                            Privatni dogodek
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <h2 className="mt-8 text-2xl font-semibold">Vstopnice</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="z-50 min-w-[100px]">Ime</TableHead>
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
                <TableCell className="max-w-[100px] ">
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
                <TableCell className="max-w-[50px]">
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
                <TableCell className="max-w-[50px]">
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
                  />
                </TableCell>
                <TableCell className="max-w-[180px]">
                  <FormField
                    control={form.control}
                    name={`tickets.${index}.start`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <DateTimePicker
                            date={field.value}
                            setDate={(date) => field.onChange(date)}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell className="max-w-[180px]">
                  <FormField
                    control={form.control}
                    name={`tickets.${index}.end`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <DateTimePicker
                            date={field.value}
                            setDate={(date) => field.onChange(date)}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell className="min-w-[100px]">
                  <FormField
                    control={form.control}
                    name={`tickets.${index}.details`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            style={{
                              height: "36px",
                            }}
                            className="mt-1 min-h-[36px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell className="w-[36px]">
                  <Button onClick={() => remove(index)} className="mx-auto p-3">
                    <XIcon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Button
          onClick={() =>
            appendTicket({
              ...defaultTicketValues,
              end: form.watch("end"),
            } as EventFormValues["tickets"][0])
          }
          variant="outline"
          className="space-y-0"
          type="button"
        >
          Dodaj vstopnico
        </Button>

        <h2 className="mt-8 text-2xl font-semibold">Podrobnosti</h2>

        <div className="flex gap-x-6">
          <div className="grow">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opis dogodka</FormLabel>
                  <FormControl>
                    <Editor
                      apiKey="lk6tlidem9fol6xo4umatbbvnd4z5gedth7s116m3p6o2bis"
                      init={{
                        content_css: "tinymce-5-dark",
                        skin: "oxide-dark",
                        plugins:
                          "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tableofcontents footnotes mergetags autocorrect typography inlinecss",
                        toolbar:
                          "undo redo | blocks fontsize | bold italic underline strikethrough | link image media table mergetags |  a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                      }}
                      initialValue=""
                      onEditorChange={(content: string) =>
                        field.onChange(content)
                      }
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="min-w-[500px] space-y-2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefon</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Spletna stran</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="youtube"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Youtube</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button type="submit" variant="secondary" className="px-8">
            Oddaj
          </Button>
        </div>
      </form>
    </Form>
  );
}
