"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CarouselComponenr({
  events = [
    {
      name: "Afrojack",
      href: "#",
      image: "/afrojack.jpg",
    },
    {
      name: "Devito",
      href: "#",
      image: "/devito.jpeg",
    },
    {
      name: "Trile",
      href: "#",
      image: "/trile.jpeg",
    },
  ],
}) {
  return (
    <Carousel
      opts={{
        loop: true,
      }}
      className="aspect-w-16 aspect-h-9 overflow-hidden rounded-xl bg-black"
    >
      <CarouselContent>
        {events.map((event, i) => (
          <CarouselItem key={i} className="aspect-[2/1] rounded-xl bg-black">
            <img
              src={event.image}
              className="h-full w-full rounded-xl object-cover"
              alt={event.name}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 z-50 text-black" />
      <CarouselNext className="absolute right-2 z-50 text-black" />
    </Carousel>
  );
}
