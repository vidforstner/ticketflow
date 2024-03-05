import { NextResponse } from "next/server";

import { prisma } from "@acme/db";

import { utapi } from "~/server/uploadthing";

export const dynamic = "force-dynamic";
export async function GET() {
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

  const res = await utapi.deleteFiles(filesToDelete);

  return NextResponse.json({
    deleted: filesToDelete,
    success: res.success,
  });
}
