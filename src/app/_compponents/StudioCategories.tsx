"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  Mic,
  Music,
  Clapperboard,
  Paintbrush,
} from "lucide-react";

export default function StudioCategories() {
  const categories = [
    {
      title: "Photo Studios",
      icon: Camera,
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
      href: "/studios?category=Photo Studio",
    },
    {
      title: "Sound Stages",
      icon: Clapperboard,
      image:
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop",
      href: "/studios?category=Sound Stage",
    },
    {
      title: "Podcast Rooms",
      icon: Mic,
      image:
        "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200&auto=format&fit=crop",
      href: "/studios?category=Podcast Room",
    },
    {
      title: "Music Suites",
      icon: Music,
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop",
      href: "/studios?category=Music Suite",
    },
    {
      title: "Art Workshops",
      icon: Paintbrush,
      image:
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop",
      href: "/studios?category=Art Workshop",
    },
  ];

  return (
    <section className="bg-[#080808] py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">
            Browse Categories
          </p>

          <h2 className="text-4xl font-semibold tracking-[-1px] md:text-5xl">
            Find the perfect
            <span className="font-light text-zinc-500">
              {" "}creative space.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-zinc-400">
            Discover professional environments tailored for
            photographers, filmmakers, podcasters, musicians
            and artists.
          </p>
        </div>

        {/* Categories */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.title}
                href={category.href}
                className="group overflow-hidden rounded-[28px] border border-white/10 bg-[#111111]"
              >
                <div className="relative h-64">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  />

                  <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="p-5">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <Icon size={22} />
                  </div>

                  <h3 className="text-lg font-semibold">
                    {category.title}
                  </h3>

                  <p className="mt-2 text-sm text-zinc-500">
                    Explore studios
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}