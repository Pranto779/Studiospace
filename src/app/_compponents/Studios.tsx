import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

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

type Props = {
  studios: Istudio[];
};

export default function StudiosPage({ studios }: Props) {
  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">
            Discover Spaces
          </p>

          <h1 className="text-5xl font-semibold tracking-[-2px] md:text-6xl">
            Explore Studios
          </h1>

          <p className="mt-5 max-w-2xl leading-8 text-zinc-400">
            Browse premium creative spaces for photography,
            filmmaking, podcasting and music production.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {studios.map((studio) => (
            <article
              key={studio._id}
              className="group overflow-hidden rounded-[26px] border border-white/10 bg-[#111111] transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-2xl hover:shadow-black/40"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={studio.image}
                  alt={studio.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Category */}
                <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/50 px-3 py-1.5 text-xs backdrop-blur-md">
                  {studio.category}
                </div>
                <div className="absolute bottom-4 right-4 rounded-xl bg-black/60 px-3 py-2 text-sm font-semibold backdrop-blur-md">
                  ${studio.hourlyRate}/hr
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-xl font-semibold transition group-hover:text-zinc-200">
                  {studio.name}
                </h2>

                <p className="mt-2 line-clamp-1 text-sm leading-6 text-zinc-500">
                  {studio.description}
                </p>

                <div className="mt-2 flex items-center gap-2 text-zinc-400">
                  <MapPin size={16} />
                  <span className="text-sm">
                    {studio.location}
                  </span>
                </div>

                {/* Amenities */}
                <div className="mt-3">
                  <p className="line-clamp-1 rounded-lg bg-white/[0.03] px-3  text-sm text-zinc-500">
                    {studio.amenities}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                      Starting Price
                    </p>

                    <p className="text-2xl font-semibold">
                      ${studio.hourlyRate}
                    </p>
                  </div>

                  <Link
                    href={`/studios/${studio._id}`}
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-xl
                      bg-white
                      px-4
                      py-2
                      text-sm
                      font-medium
                      text-black
                      transition
                      hover:bg-zinc-200
                    "
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
    </main>
  );
}