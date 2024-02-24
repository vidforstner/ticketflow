"use client";

import { useState } from "react";
import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { MoreHorizontal, PlusIcon, XIcon } from "lucide-react";
import moment from "moment";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { DateTimePicker } from "~/components/ui/date-time-picker";
import { Label } from "~/components/ui/label";
import { UploadButton } from "~/utils/uploadthing";

export default function Organizatorji() {
  const [ticketName, setTicketName] = useState("");
  const [ticketStart, setTicketStart] = useState(
    new Date(new Date().setHours(0, 0, 0, 0)),
  );
  const [ticketEnd, setTicketEnd] = useState(
    new Date(new Date().setHours(0, 0, 0, 0)),
  );
  const [ticketDetails, setTicketDetails] = useState("");
  const [ticketAmount, setTicketAmount] = useState(0);
  const [ticketPrice, setTicketPrice] = useState(0);

  const [isAddingTicket, setIsAddingTicket] = useState(false);

  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [isUploading, setIsUploading] = useState(false);

  const ticketSchema = z.object({
    name: z.string().min(2).max(50),
    amount: z.number().min(1),
    start: z.date(),
    end: z.date(),
    details: z.string().optional(),
    price: z.number(),
  });

  const formSchema = z.object({
    name: z.string().min(2).max(50),
    start: z.date(),
    end: z.date(),
    location: z.object({
      label: z.string(),
      value: z.any(),
    }),
    type: z.string().min(2).max(50),
    tickets: z.array(ticketSchema),
    imageUrl: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    website: z.string().optional(),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    youtube: z.string().optional(),
    description: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      start: new Date(new Date().setHours(0, 0, 0, 0)),
      end: new Date(new Date().setHours(0, 0, 0, 0)),
      location: {
        id: "",
        name: "",
      },
      type: "",
      tickets: [],
      imageUrl: undefined,
      phone: undefined,
      email: undefined,
      website: undefined,
      facebook: undefined,
      instagram: undefined,
      youtube: undefined,
      description: undefined,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tickets",
  });

  const addTicket = (ticketData: z.infer<typeof ticketSchema>) => {
    append(ticketData);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="mb-12 mt-28 flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-1/3 space-y-8 rounded-xl bg-neutral-900 p-6"
        >
          <h1 className="mb-4 text-center text-2xl font-bold">
            Kaj, Kdaj, Kje?
          </h1>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ime dogodka</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="start"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Začetek</FormLabel>
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
                          console.log(value);
                          field.onChange({
                            value,
                          });
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
          </div>

          <h1 className="mb-4 pt-12 text-center text-2xl font-bold">
            Vstopnice
          </h1>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Ime</TableHead>
                <TableHead>Količina</TableHead>
                <TableHead>Cena</TableHead>
                <TableHead className="text-right">
                  Razpoložljivost vstopnic
                </TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((field, index) => (
                <TableRow key={field.id}>
                  <TableCell>{field.name}</TableCell>
                  <TableCell>{field.amount}</TableCell>
                  <TableCell>{field.price}</TableCell>
                  <TableCell className="text-right">
                    {moment(field.start).format("DD. MM. YYYY, hh:mm")} -{" "}
                    {moment(field.start).format("DD. MM. YYYY, hh:mm")}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="item-center flex justify-center">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuGroup>
                          <DropdownMenuItem onClick={() => remove(index)}>
                            Izbriši
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-12 rounded-2xl border border-neutral-800 p-4 ">
            <div className="flex ">
              <h2 className="my-auto grow text-xl font-semibold">
                Nova vstopnica
              </h2>
              {fields.length > 0 &&
                (isAddingTicket ? (
                  <button
                    onClick={() => setIsAddingTicket(false)}
                    className="flex items-center justify-center"
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                ) : (
                  <Button
                    variant="secondary"
                    className="flex items-center justify-center"
                    onClick={() => setIsAddingTicket(true)}
                  >
                    Dodaj
                    <PlusIcon className="ml-2 h-5 w-5" />
                  </Button>
                ))}
            </div>

            {(isAddingTicket || fields.length === 0) && (
              <>
                <Label htmlFor="ticketName">Ime vstopnice</Label>
                <Input
                  id="ticketName"
                  className="mb-4"
                  value={ticketName}
                  onChange={(e) => setTicketName(e.target.value)}
                />

                <div className="mb-4 grid grid-cols-2 gap-x-4">
                  <Label className="mb-1">Cena</Label>
                  <Label className="mb-1">Količina</Label>

                  <Input
                    id="ticketName"
                    className="mb-4"
                    type="number"
                    value={ticketPrice}
                    onChange={(e) => setTicketPrice(Number(e.target.value))}
                  />

                  <Input
                    id="ticketName"
                    className="mb-4"
                    type="number"
                    value={ticketAmount}
                    onChange={(e) => setTicketAmount(Number(e.target.value))}
                  />

                  <Label>Začetek Prodaje</Label>
                  <Label>Konec Prodaje</Label>

                  <DateTimePicker
                    date={new Date(ticketStart)}
                    setDate={(date) => setTicketStart(date ?? new Date())}
                  />

                  <DateTimePicker
                    date={ticketEnd}
                    setDate={(date) => setTicketEnd(date ?? new Date())}
                  />

                  {(ticketStart.getHours() === 0 ||
                    ticketEnd.getHours() === 0) && (
                    <div className="col-span-2 mt-1 text-justify text-sm text-neutral-600">
                      Čas 00:00 označuje ZAČETEK dneva. Če želiš izbrati KONEC
                      tega izberi 00:00 naslednjega dne.
                    </div>
                  )}
                </div>

                <Label className="mb-1">Opis vstopnice</Label>
                <Textarea
                  value={ticketDetails}
                  onChange={(e) => setTicketDetails(e.target.value)}
                />

                <div className="flex justify-end">
                  <Button
                    onClick={() => {
                      setTicketName("");
                      setTicketAmount(0);
                      setTicketPrice(0);
                      setTicketStart(new Date());
                      setTicketEnd(new Date());
                      setTicketDetails("");

                      addTicket({
                        name: ticketName,
                        amount: ticketAmount,
                        price: ticketPrice,
                        start: ticketStart,
                        end: ticketEnd,
                        details: ticketDetails,
                      });
                    }}
                    variant="secondary"
                    className="mt-4"
                  >
                    Shrani
                  </Button>
                </div>
              </>
            )}
          </div>

          <h1 className="mb-4 pt-12 text-center text-2xl font-bold">
            Podrobnosti
          </h1>

          <div className="grid grid-cols-2 gap-x-4">
            <div>
              <div className="mb-1 text-center text-sm font-semibold">
                Cover slika dogodka
              </div>
              <div className="relative mx-auto flex aspect-[9/12] max-w-[300px] items-center justify-center rounded-xl border border-neutral-800">
                {imageUrl ? (
                  <>
                    <Image
                      alt="poster"
                      src={form.getValues("imageUrl") ?? ""}
                      objectFit="cover"
                      fill
                      className="rounded-xl"
                    />

                    <button
                      onClick={() => {
                        form.setValue("imageUrl", undefined);
                        setImageUrl(undefined);
                      }}
                      className="absolute right-2 top-2 rounded-full bg-neutral-800 p-1"
                    >
                      <XIcon className="h-4 w-4" />
                    </button>
                  </>
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
                      form.setValue("imageUrl", res[0]?.url);
                      setImageUrl(res[0]?.url);
                      setIsUploading(false);
                    }}
                    endpoint="imageUploader"
                  />
                )}
              </div>
            </div>

            <div className="my-auto">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefon</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
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
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="mt-4 text-center text-sm font-semibold">Detajli</div>
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
            onEditorChange={(content: string) => {
              form.setValue("description", content);
            }}
            value={form.getValues("description")}
          />

          <div className="flex justify-end">
            <Button type="submit" variant="secondary">
              Shrani
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
