"use server";

import { action } from "@/lib/safe-action";
import { auth } from "@clerk/nextjs";

import { prisma } from "@acme/db";

import { eventSchema } from "./schema";

export const createEvent = action(eventSchema, async (event) => {
  const { userId } = auth();

  const author = await prisma.user.findUnique({
    where: {
      clerkId: userId ?? "",
    },
  });

  await prisma.event.create({
    data: {
      organisationId: event.slug,
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
      eventMemberships: {
        create: {
          role: "ADMIN",
          userId: author?.id ?? "",
          clerkId: userId ?? "",
        },
      },
      ticketTypes: {
        create: event.tickets.map((ticket) => ({
          name: ticket.name,
          amount: ticket.amount,
          price: ticket.price,
          startDate: ticket.start,
          endDate: ticket.end,
          details: ticket.details,
        })),
      },
    },
  });

  /*
   ticketTypes: {
        create: event.tickets.map((ticket) => ({
          name: ticket.name,
          amount: ticket.amount,
          price: ticket.price,
          startDate: ticket.start,
          endDate: ticket.end,
          details: ticket.details,
        })),
      },
  
  */

  //Create a Clerk organization
  /*
  await prisma.event.create({
    data: {
      organisationId: event.slug,
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
      ticketTypes: {
        create: event.tickets.map((ticket) => ({
          name: ticket.name,
          amount: ticket.amount,
          price: ticket.price,
          startDate: ticket.start,
          endDate: ticket.end,
          details: ticket.details,
        })),
      },
      eventMemberships: {
        create: [
          {
            role: "ADMIN",
            userId: author?.id ?? "",
            clerkId: userId ?? "",
          },
        ],
      },
    },
  }); */

  //Sends Email
});
