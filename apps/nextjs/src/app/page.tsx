"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function HomePage() {
  return (
    <main className="container mt-24">
      <Carousel
        opts={{
          loop: true,
        }}
        className="aspect-w-16 aspect-h-9 overflow-hidden rounded-xl bg-black"
      >
        <CarouselContent>
          <CarouselItem className="aspect-[2/1] rounded-xl bg-black">
            {/* Using default img instead of Next.js Image */}
            <img
              src="/afrojack.jpg"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              alt=""
            />
          </CarouselItem>
          <CarouselItem className="aspect-[2/1] rounded-xl bg-black">
            {/* Using default img instead of Next.js Image */}
            <img
              src="/devito.jpeg"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              alt=""
            />
          </CarouselItem>
          <CarouselItem className="aspect-[2/1] rounded-xl bg-black">
            {/* Using default img instead of Next.js Image */}
            <img
              src="/trile.jpeg"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              alt=""
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 z-50 text-black" />
        <CarouselNext className="absolute right-2 z-50 text-black" />
      </Carousel>
    </main>
  );
}
