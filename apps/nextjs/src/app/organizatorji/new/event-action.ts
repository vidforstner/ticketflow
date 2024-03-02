"use server";

import { action } from "@/lib/safe-action";
import { auth, clerkClient } from "@clerk/nextjs";

import { prisma } from "@acme/db";

import { eventSchema } from "./schema";

export const createEvent = action(eventSchema, async (event) => {
  const { userId } = auth();

  const author = await prisma.user.findUnique({
    where: {
      clerkId: userId ?? "",
    },
  });

  const organization = await clerkClient.organizations.createOrganization({
    name: event.name,
    createdBy: userId ?? "",
  });

  await prisma.event.create({
    data: {
      organisationId: organization.id,
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

  //Create a Clerk organization

  //Sends Email
});
