import { Istudio } from "@/app/_compponents/FeaturedStudios";
import { MapPin, Clock, ArrowLeft, CheckCircle2, CalendarDays, Wifi, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface DetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const DetailsPage = async ({ params }: DetailsPageProps) => {
  const { slug } = await params;

  const res = await fetch(`http://localhost:8000/studios/${slug}`);

  if (!res.ok) {
    throw new Error("Failed to fetch studio details");
  }

  const data: Istudio = await res.json();

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      {/* Header */}
      <section className="mx-auto max-w-7xl px-6 pt-10">
        <Link
          href="/studios"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Studios
        </Link>

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
              {data.category}
            </span>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              {data.name}
            </h1>

            <div className="mt-4 flex items-center gap-2 text-sm text-zinc-400">
              <MapPin size={17} />
              {data.location}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111111] px-5 py-4">
            <p className="text-xs text-zinc-500">Hourly Rate</p>

            <p className="mt-1 text-3xl font-semibold">
              ${data.hourlyRate}
              <span className="text-sm font-normal text-zinc-500">
                {" "}/ hour
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Studio Image */}
      <section className="mx-auto mt-10 max-w-7xl px-6">
        <div className="relative h-[280px] overflow-hidden rounded-[28px] border border-white/10 sm:h-[400px] lg:h-[520px]">
          <Image
            src={data.image}
            alt={data.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1280px"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <div className="absolute bottom-6 left-6">
            <p className="text-sm text-zinc-300">Discover your next</p>
            <h2 className="mt-1 text-2xl font-semibold sm:text-3xl">
              Creative space.
            </h2>
          </div>
        </div>
      </section>

      {/* Details and Booking */}
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-14 lg:grid-cols-[1fr_360px]">
        {/* Left Content */}
        <div className="space-y-8">
          {/* About */}
          <div className="rounded-[28px] border border-white/10 bg-[#111111] p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              About the studio
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              Your space for creativity
            </h2>

            <p className="mt-4 leading-7 text-zinc-400">
              {data.description || "A creative space designed for your next project."}
            </p>
          </div>

          {/* Amenities */}
          <div className="rounded-[28px] border border-white/10 bg-[#111111] p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Studio features
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              Amenities & Facilities
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                  <Wifi size={19} />
                </div>

                <div>
                  <p className="font-medium">Studio Amenities</p>
                  <p className="mt-1 text-sm text-zinc-400">
                    {data.amenities || "Standard facilities"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                  <CheckCircle2 size={19} />
                </div>

                <div>
                  <p className="font-medium">Studio Type</p>
                  <p className="mt-1 text-sm text-zinc-400">
                    {data.category}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:col-span-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5">
                  <MapPin size={19} />
                </div>

                <div>
                  <p className="font-medium">Location</p>
                  <p className="mt-1 text-sm text-zinc-400">
                    {data.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <aside>
          <div className="sticky top-8 rounded-[28px] border border-white/10 bg-[#111111] p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Reserve your space
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              Book this studio
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Make your next creative project happen in this space.
            </p>

            <div className="my-6 border-t border-white/10" />

            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Hourly rate</span>
              <span className="text-xl font-semibold">
                ${data.hourlyRate}
              </span>
            </div>

            <div className="mt-5 flex items-center gap-3 text-sm text-zinc-400">
              <Clock size={17} />
              Flexible hourly booking
            </div>

            <Link
              href={`/booking/${data._id}`}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 font-medium text-black transition hover:bg-zinc-200"
            >
              <CalendarDays size={18} />
              Book This Studio
              <ArrowRight size={17} />
            </Link>

            <p className="mt-4 text-center text-xs text-zinc-500">
              Find the right space for your creativity.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default DetailsPage;

