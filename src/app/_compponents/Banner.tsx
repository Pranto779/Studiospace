"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function Banner() {
  const slides = [
    {
      title: "Create Without Limits",
      description:
        "Discover premium photography studios, production stages, podcast lounges and music suites designed for modern creators.",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop",
    },
    {
      title: "Find Spaces That Inspire",
      description:
        "Browse carefully curated creative environments built for filmmakers, photographers, podcasters and musicians.",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2000&auto=format&fit=crop",
    },
    {
      title: "Book. Create. Produce.",
      description:
        "Reserve professional workspaces with transparent pricing and focus entirely on bringing ideas to life.",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2000&auto=format&fit=crop",
    },
  ];

  return (
    <section className="bg-[#080808] px-4 pb-8 pt-4 md:px-6">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        loop
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="overflow-hidden rounded-[32px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div className="relative h-[80vh] min-h-[500px] overflow-hidden rounded-[32px] border border-white/10">
              
              {/* Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/25" />

              {/* Text Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-transparent" />

              {/* Content */}
              <div className="relative z-10 flex h-full items-center">
                <div className="max-w-7xl px-8 md:px-14">
                  <div className="mb-5 inline-flex items-center rounded-full border border-white/15 bg-black/20 px-4 py-2 backdrop-blur-md">
                    <span className="text-xs uppercase tracking-[0.3em] text-zinc-200">
                      StudioSpace
                    </span>
                  </div>

                  <h1 className="max-w-4xl text-5xl font-semibold tracking-[-2px] text-white md:text-7xl">
                    {slide.title}
                  </h1>

                  <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-200 md:text-lg">
                    {slide.description}
                  </p>

                  <div className="mt-10 flex flex-wrap gap-4">
                    

                    <Link
                      href="/studios"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-black/20 px-6 py-3 mb-8 font-medium text-white backdrop-blur-md transition hover:bg-white/10"
                    >
                     Explore Studios
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom Glass Stats */}
              <div className="absolute bottom-5 left-5 right-5 hidden md:flex">
                <div className="grid w-full grid-cols-3 rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur-xl">
                  <div>
                    <p className="text-2xl font-semibold text-white">
                      2K+
                    </p>
                    <p className="text-sm text-zinc-300">
                      Creative Spaces
                    </p>
                  </div>

                  <div>
                    <p className="text-2xl font-semibold text-white">
                      10K+
                    </p>
                    <p className="text-sm text-zinc-300">
                      Active Creators
                    </p>
                  </div>

                  <div>
                    <p className="text-2xl font-semibold text-white">
                      50K+
                    </p>
                    <p className="text-sm text-zinc-300">
                      Successful Bookings
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}