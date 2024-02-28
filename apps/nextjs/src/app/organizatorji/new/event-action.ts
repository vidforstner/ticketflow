"use server";

import { action } from "@/lib/safe-action";

import { prisma } from "@acme/db";

import { eventSchema } from "./event-form";

export const createEvent = action(eventSchema, async (event) => {
  //Create a Clerk organization

  await prisma.event.create({
    data: {
      organisationId: "ssdsd",
      name: event.name,
      slug: event.slug,
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

  //Sends Email
});
