"use client";

import Link from "next/link";
import Image from "next/image";
import {
  PlusCircle,
  Pencil,
  Trash2,
  MapPin,
  Star,
  Eye,
} from "lucide-react";

export default function MyListingsPage() {
  const listings = [
    {
      id: 1,
      name: "Luxury Content Studio",
      category: "Photo Studio",
      location: "Dhaka",
      price: "$50",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Podcast Pro Room",
      category: "Podcast Room",
      location: "Chattogram",
      price: "$35",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Creative Music Suite",
      category: "Music Suite",
      location: "Sylhet",
      price: "$65",
      rating: 5.0,
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Studio Management
            </p>

            <h1 className="mt-2 text-4xl font-semibold tracking-[-1px] md:text-5xl">
              My Listings
            </h1>

            <p className="mt-3 text-zinc-400">
              Manage, update and monitor your published studios.
            </p>
          </div>

          <Link
            href="/add-studio"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-black transition hover:bg-zinc-200"
          >
            <PlusCircle size={18} />
            Add New Studio
          </Link>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-5 sm:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
            <h3 className="text-3xl font-semibold">03</h3>
            <p className="mt-2 text-sm text-zinc-500">
              Total Listings
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
            <h3 className="text-3xl font-semibold">15</h3>
            <p className="mt-2 text-sm text-zinc-500">
              Total Bookings
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
            <h3 className="text-3xl font-semibold">$1,250</h3>
            <p className="mt-2 text-sm text-zinc-500">
              Monthly Revenue
            </p>
          </div>
        </div>

        {/* Listings */}
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {listings.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-[28px] border border-white/10 bg-[#111111]"
            >
              {/* Image */}
              <div className="relative h-56">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />

                <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs backdrop-blur-md">
                  {item.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold">
                    {item.name}
                  </h3>

                  <div className="flex items-center gap-1 text-sm">
                    <Star
                      size={14}
                      fill="white"
                    />
                    {item.rating}
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2 text-sm text-zinc-500">
                  <MapPin size={15} />
                  {item.location}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-zinc-500">
                      Starting Price
                    </p>

                    <h4 className="text-2xl font-semibold">
                      {item.price}
                    </h4>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 transition hover:bg-white/10">
                      <Eye size={17} />
                    </button>

                    <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 transition hover:bg-white/10">
                      <Pencil size={17} />
                    </button>

                    <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/20 text-red-400 transition hover:bg-red-500/10">
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State Example */}
        {/* 
        <div className="rounded-3xl border border-white/10 bg-[#111111] p-16 text-center">
          <h2 className="text-2xl font-semibold">
            No Listings Found
          </h2>

          <p className="mt-3 text-zinc-500">
            Start by adding your first studio.
          </p>

          <Link
            href="/add-studio"
            className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-black"
          >
            Add Studio
          </Link>
        </div>
        */}
      </div>
    </main>
  );
}