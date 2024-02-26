import type { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { env } from "@/env.js";
import { Webhook } from "svix";

import { prisma } from "@acme/db";

export async function POST(req: Request) {
  const payloadString = JSON.stringify(await req.json());
  const headerPayload = headers();
  const svixId = headerPayload.get("svix-id");
  const svixIdTimeStamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");
  if (!svixId || !svixIdTimeStamp || !svixSignature) {
    return new Response("Error occured", {
      status: 400,
    });
  }
  const svixHeaders = {
    "svix-id": svixId,
    "svix-timestamp": svixIdTimeStamp,
    "svix-signature": svixSignature,
  };
  const wh = new Webhook(env.WEBHOOK_SECRET);

  let evt: WebhookEvent;
  try {
    evt = wh.verify(payloadString, svixHeaders) as WebhookEvent;
  } catch (err) {
    console.log(err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  if (evt.type === "user.created")
    await prisma.user.create({
      data: {
        clerkId: evt.data.id,
        email: evt.data.email_addresses[0]?.email_address ?? "",
        firstName: evt.data.first_name ?? "",
        lastName: evt.data.last_name ?? "",
      },
    });

  if (evt.type === "user.updated") {
    const user = await prisma.user.update({
      where: {
        clerkId: evt.data.id,
      },
      data: {
        email: evt.data.email_addresses[0]?.email_address ?? "",
        firstName: evt.data.first_name ?? "",
        lastName: evt.data.last_name ?? "",
      },
    });

    if (!user)
      await prisma.user.updateMany({
        where: {
          OR: evt.data.email_addresses.map((e) => ({
            email: e.email_address,
          })),
        },
        data: {
          clerkId: evt.data.id,
          email: evt.data.email_addresses[0]?.email_address ?? "",
          firstName: evt.data.first_name ?? "",
          lastName: evt.data.last_name ?? "",
        },
      });
  }

  if (evt.type === "user.deleted")
    await prisma.user.update({
      where: {
        clerkId: evt.data.id,
      },
      data: {
        clerkId: null,
      },
    });

  return new Response("", {
    status: 201,
  });
}
