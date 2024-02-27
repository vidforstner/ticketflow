"use server";

import { action } from "@/lib/safe-action";
import { z } from "zod";

import { EventType, prisma } from "@acme/db";

const eventSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Ime dogodka mora biti dolgo vsaj 2 znaka",
    })
    .max(50, {
      message: "Ime dogodka ne sme biti daljše od 50 znakov",
    }),
  slug: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[^\s]*$/, "No spaces are allowed"),
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
  type: z.nativeEnum(EventType),
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
  imageUrl: z.string().url({
    message: "Vnesite veljavno sliko",
  }),
  phone: z.string().optional(),
  email: z.string().optional(),
  website: z.string().url().optional(),
  facebook: z.string().url().optional(),
  instagram: z.string().url().optional(),
  youtube: z.string().url().optional(),
  description: z.string().optional(),
});

export const loginUser = action(eventSchema, async (event) => {
  await prisma.event.create({
    data: {
      organisationId: "ssdsd",
      name: event.name,
      slug: "dsdd",
      startDate: event.start,
      endDate: event.end,
      placeId: event.location.value.place_id,
      type: event.type,
      imageUrl: event.imageUrl,
      phone: event.phone,
      email: event.email,
      website: event.website,
      facebook: event.facebook,
      instagram: event.instagram,
      youtube: event.youtube,
      description: event.description,
    },
  });
});
export { eventSchema };
