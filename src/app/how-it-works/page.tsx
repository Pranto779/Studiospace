"use client";

import Image from "next/image";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

export default function HowItWorks() {
  const steps = [
    {
      title: "Discover Spaces",
      description:
        "Explore a curated collection of photography studios, podcast lounges, music suites, film stages and creative workspaces. Browse detailed listings, compare amenities, review workspace specifications and discover environments designed specifically for creators who demand professional-quality production spaces.",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600&auto=format&fit=crop",
    },
    {
      title: "Select Shoot Hours",
      description:
        "Choose a schedule that perfectly aligns with your production timeline. Review availability, compare booking windows, coordinate creative sessions and plan every aspect of your project before securing your preferred time slot.",
      image:
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1600&auto=format&fit=crop",
    },
    {
      title: "Book Instantly",
      description:
        "Reserve your workspace in just a few clicks through a streamlined booking experience. Enjoy transparent pricing, real-time availability updates, secure reservations and a hassle-free process designed to save valuable production time.",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop",
    },
    {
      title: "Create & Produce",
      description:
        "Walk into your booked creative environment and focus entirely on bringing ideas to life. Whether you're filming a commercial, recording a podcast, producing music or capturing content, StudioSpace helps you create exceptional work in professional surroundings.",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop",
    },
  ];

  return (
    <section className="bg-[#080808] py-28 text-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-zinc-500">
            How Booking Works
          </p>

          <h2 className="mx-auto max-w-5xl text-5xl font-semibold tracking-[-2px] md:text-7xl">
            A seamless workflow
            <span className="font-light text-zinc-500">
              {" "}for modern creators.
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-zinc-400">
            From discovering inspiring creative spaces to producing your next
            masterpiece, StudioSpace delivers a booking experience that feels
            effortless from start to finish.
          </p>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop
          slidesPerView={1}
          className="overflow-hidden rounded-[40px]"
        >
          {steps.map((step) => (
            <SwiperSlide key={step.title}>
              <div className="overflow-hidden rounded-[40px] border border-white/10 bg-[#111111]">
                <div className="relative h-[5500px] md:h-[550px]">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover transition duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/30" />

                  <div className="absolute inset-0 flex items-end">
                    <div className="max-w-3xl p-8 md:p-16 lg:p-20">
                      <div className="inline-flex items-center rounded-full border border-white/10 bg-black/30 px-4 py-2 backdrop-blur-xl">
                        <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-300">
                          Creator Workflow
                        </span>
                      </div>

                      <h3 className="mt-8 text-4xl font-semibold tracking-[-1px] md:text-6xl">
                        {step.title}
                      </h3>

                      <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 md:text-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}