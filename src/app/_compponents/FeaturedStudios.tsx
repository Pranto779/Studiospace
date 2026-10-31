"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ArrowRight } from "lucide-react";

interface Studio {
  _id: string;
  title: string;
  category: string;
  image: string;
  rating: number;
  location: string;
  hourlyRate: number;
}

export default function FeaturedStudios() {
  // replace with API data later
  const studios: Studio[] = [
    {
      _id: "1",
      title: "Downtown Photography Loft",
      category: "Photo Studio",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1400&auto=format&fit=crop",
      rating: 4.9,
      location: "New York",
      hourlyRate: 45,
    },
    {
      _id: "2",
      title: "Premium Podcast Lounge",
      category: "Podcast Room",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop",
      rating: 4.8,
      location: "Los Angeles",
      hourlyRate: 55,
    },
    {
      _id: "3",
      title: "Creative Music Suite",
      category: "Music Suite",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1400&auto=format&fit=crop",
      rating: 5.0,
      location: "Chicago",
      hourlyRate: 68,
    },
    {
      _id: "4",
      title: "Production Film Stage",
      category: "Sound Stage",
      image:
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1400&auto=format&fit=crop",
      rating: 4.7,
      location: "Miami",
      hourlyRate: 79,
    },
    {
      _id: "5",
      title: "Minimal Creator Workshop",
      category: "Workshop",
      image:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1400&auto=format&fit=crop",
      rating: 4.9,
      location: "Seattle",
      hourlyRate: 39,
    },
    {
      _id: "6",
      title: "Luxury Content Studio",
      category: "Photo Studio",
      image:
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1400&auto=format&fit=crop",
      rating: 5.0,
      location: "Austin",
      hourlyRate: 62,
    },
  ];

  return (
    <section className="bg-[#080808] py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
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
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {studios.map((studio) => (
            <article
              key={studio._id}
              className="group overflow-hidden rounded-[28px] border border-white/10 bg-[#111111] transition-all duration-300 hover:border-white/20"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={studio.image}
                  alt={studio.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Category */}
                <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs backdrop-blur-md">
                  {studio.category}
                </div>

                {/* Rating */}
                <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full border border-white/10 bg-black/40 px-3 py-1 backdrop-blur-md">
                  <Star size={14} fill="white" />
                  <span className="text-xs">{studio.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold">
                  {studio.title}
                </h3>

                <div className="mt-4 flex items-center gap-2 text-zinc-400">
                  <MapPin size={16} />
                  <span className="text-sm">{studio.location}</span>
                </div>

                <div className="mt-5 flex items-center justify-between">
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