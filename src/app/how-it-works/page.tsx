"use client";

import Image from "next/image";
import { CalendarDays, Compass, Sparkles, Zap } from "lucide-react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Discover Spaces",
      description:
        "Browse curated photography studios, podcast rooms, music suites and film stages built for professional creators.",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600&auto=format&fit=crop",
      icon: Compass,
    },
    {
      number: "02",
      title: "Select Shoot Hours",
      description:
        "Choose the date and hours that fit your production schedule, with availability shown clearly before checkout.",
      image:
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1600&auto=format&fit=crop",
      icon: CalendarDays,
    },
    {
      number: "03",
      title: "Book Instantly",
      description:
        "Confirm your creative workspace securely and receive a clear booking summary with transparent pricing.",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop",
      icon: Zap,
    },
    {
      number: "04",
      title: "Create & Produce",
      description:
        "Arrive ready to work and turn your vision into a memorable photo, film, recording or live production.",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop",
      icon: Sparkles,
    },
  ];

  return (
    <section className="overflow-hidden bg-[#080808] px-4 py-20 text-white sm:px-6 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center sm:mb-14">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-zinc-500">
            How Booking Works
          </p>
          <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            A seamless workflow
            <span className="block font-light text-zinc-500">
              for modern creators.
            </span>
          </h2>
        </div>

        <div className="relative">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          effect="fade"
          loop
          speed={1000}
          grabCursor
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation={{
            prevEl: ".how-it-works-prev",
            nextEl: ".how-it-works-next",
          }}
          className="how-it-works-carousel overflow-hidden rounded-[32px]"
        >
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <SwiperSlide key={step.title} className="h-auto">
                <article className="relative min-h-[520px] overflow-hidden rounded-[32px] border border-white/10 sm:min-h-[580px]">
                  <div className="absolute inset-0">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/25" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  <div className="relative z-10 flex min-h-[520px] items-center px-6 py-16 sm:min-h-[580px] md:px-14 lg:px-16">
                    <div className="max-w-2xl">
                      <div className="mb-6 flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-black/25 backdrop-blur-md">
                          <Icon size={24} />
                        </div>
                        <span className="rounded-full border border-white/15 bg-black/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-zinc-200 backdrop-blur-md">
                          Step {step.number}
                        </span>
                      </div>

                      <h3 className="text-5xl font-semibold tracking-[-2px] sm:text-6xl lg:text-7xl">
                        {step.title}
                      </h3>
                      <p className="mt-6 max-w-xl text-base leading-8 text-zinc-200 md:text-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 z-20 hidden items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur-xl md:flex">
                    <div>
                      <p className="text-2xl font-semibold">{step.number}</p>
                      <p className="text-sm text-zinc-300">StudioSpace Booking Step</p>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="absolute inset-y-0 left-3 right-3 z-30 flex items-center justify-between pointer-events-none sm:left-5 sm:right-5">
          <button
            type="button"
            aria-label="Previous booking step"
            className="how-it-works-prev pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-md transition hover:border-white/50 hover:bg-black/60 disabled:cursor-not-allowed disabled:opacity-40 sm:h-12 sm:w-12"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            aria-label="Next booking step"
            className="how-it-works-next pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-md transition hover:border-white/50 hover:bg-black/60 disabled:cursor-not-allowed disabled:opacity-40 sm:h-12 sm:w-12"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
        </div>
      </div>
      <style jsx global>{`
        .how-it-works-carousel .swiper-pagination {
          bottom: 18px;
        }

        .how-it-works-carousel .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          margin: 0 4px !important;
          background: rgba(255, 255, 255, 0.35);
          opacity: 1;
        }

        .how-it-works-carousel .swiper-pagination-bullet-active {
          width: 26px;
          border-radius: 999px;
          background: white;
        }
      `}</style>
    </section>
  );
}
