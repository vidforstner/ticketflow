import Image from "next/image";

import { prisma } from "@acme/db";

import Carousel from "../components/carousel";

export default async function HomePage() {
  const events = await prisma.event.findMany({
    where: { isApproved: true, isDeleted: false },
  });

  return (
    <main className="container mt-20">
      <Carousel />

      {events.map((event) => (
        <div key={event.id} className="flex items-center justify-between">
          <div>
            <h2>{event.name}</h2>
            <p>{event.description}</p>
          </div>
          <div>
            <div className="relative mx-auto flex aspect-[9/12] min-w-[300px] items-center justify-center rounded-xl border border-neutral-800">
              <div>
                <Image
                  alt="poster"
                  src={event.imageUrl}
                  objectFit="cover"
                  fill
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}
