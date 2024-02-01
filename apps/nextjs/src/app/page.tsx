"use client";

import Slider from "react-slick";

export default function HomePage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };
  return (
    <main className="mt-16">
      <section className="h-[1080px] overflow-x-hidden text-black">
        <Slider {...settings}>
          <div className="mx-2 h-[650px] bg-white">ssdsd </div>
          <div className="mx-2 h-full bg-white">ssdsd </div>
          <div className="mx-2 h-full bg-white">ssdsd </div>
        </Slider>
      </section>
    </main>
  );
}
