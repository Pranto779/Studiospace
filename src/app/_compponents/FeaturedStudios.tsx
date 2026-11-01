"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ArrowRight } from "lucide-react";

export interface Istudio {
  _id: string;
  name: string;
  category: string;
  image: string;
  location: string;
  hourlyRate: string | number;
  description: string;
  amenities: string;
}

interface Featureprop {
  studios: Istudio[];
}

export default function FeaturedStudios({ studios }: Featureprop) {
  return (
    <section className="bg-[#080808] py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">
              Featured Studios
            </p>

            <h2 className="text-4xl font-semibold tracking-[-1px] md:text-5xl">
              Discover exceptional
              <span className="font-light text-zinc-500">
                {" "}creative spaces.
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-zinc-400">
              Explore some of the most loved workspaces used by filmmakers,
              photographers, podcasters and creative professionals.
            </p>
          </div>

          <Link
            href="/studios"
            className="w-fit rounded-xl border border-white/10 px-5 py-3 text-sm transition hover:bg-white hover:text-black"
          >
            View All Studios
          </Link>
        </div>

        {/* Grid */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {studios.map((studio) => (
            <article
              key={studio._id}
              className="group overflow-hidden rounded-[26px] border border-white/10 bg-[#111111] transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-2xl hover:shadow-black/40"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={studio.image}
                  alt={studio.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Category */}
                <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs backdrop-blur-md">
                  {studio.category}
                </div>

                {/* Rating */}
                <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full border border-white/10 bg-black/40 px-3 py-1 backdrop-blur-md">
                  <Star size={14} fill="white" />
                  <span className="line-clamp-1 max-w-20 text-xs">{studio.category}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-semibold">
                  {studio.name}
                </h3>

                <div className="mt-3 flex items-center gap-2 text-zinc-400">
                  <MapPin size={16} />
                  <span className="text-sm">{studio.location}</span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-zinc-500">
                      Hourly Rate
                    </p>

                    <p className="text-2xl font-semibold">
                      ${studio.hourlyRate}
                      <span className="text-sm font-normal text-zinc-500">
                        /hr
                      </span>
                    </p>
                  </div>

                  <Link
                    href={`/studios/${studio._id}`}
                    className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
                  >
                    Details
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}