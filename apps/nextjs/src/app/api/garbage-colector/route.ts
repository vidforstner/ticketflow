import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { prisma } from "@acme/db";

import { utapi } from "~/server/uploadthing";

export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  if (req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`)
    return NextResponse.json({
      error: "Unauthorized",
    });

  const files = await utapi.listFiles({
    limit: 500,
    offset: 0,
  });

  const filesToDelete = [];

  for (const file of files) {
    const event = await prisma.event.findFirst({
      where: {
        imageKey: file.key,
      },
      select: {
        id: true,
      },
    });

    if (!event) filesToDelete.push(file.key);
  }

  const UTres = await utapi.deleteFiles(filesToDelete);

  return NextResponse.json({
    success: UTres.success,
    deleted: filesToDelete,
  });
}
