import { Istudio } from "@/app/_compponents/FeaturedStudios";
import {
  MapPin,
  Clock,
  ArrowLeft,
  CheckCircle2,
  CalendarDays,
  Wifi,
  ArrowRight,
  Users,
  ShieldCheck,
  DollarSign,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  UserRound,
  ImageIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface DetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const DetailsPage = async ({ params }: DetailsPageProps) => {
  const { slug } = await params;

  const res = await fetch(`http://localhost:8000/studios/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080808] px-6 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">Studio Not Found</h1>
          <p className="mt-3 text-zinc-400">
            The studio details could not be loaded.
          </p>
          <Link
            href="/studios"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-black"
          >
            <ArrowLeft size={17} />
            Back to Studios
          </Link>
        </div>
      </main>
    );
  }

  const data: Istudio & {
    securityDeposit?: number;
    maxCapacity?: number;
    hostName?: string;
    hostEmail?: string;
    gallery?: string[];
    reviews?: {
      _id?: string;
      name: string;
      rating: number;
      comment: string;
    }[];
  } = await res.json();

  const galleryImages =
    data.gallery?.length
      ? data.gallery
      : data.image
        ? [data.image]
        : [];

  const amenities = Array.isArray(data.amenities)
    ? data.amenities
    : typeof data.amenities === "string"
      ? data.amenities.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      {/* Header */}
      <section className="mx-auto max-w-7xl px-5 pt-8 sm:px-6">
        <Link
          href="/studios"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Studios
        </Link>

        <div className="mt-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
              {data.category}
            </span>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              {data.name}
            </h1>

            <div className="mt-3 flex items-center gap-2 text-sm text-zinc-400">
              <MapPin size={17} />
              <span>{data.location}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111111] px-5 py-4">
            <p className="text-xs text-zinc-500">Hourly Rate</p>
            <p className="mt-1 text-3xl font-semibold">
              ${data.hourlyRate}
              <span className="text-sm font-normal text-zinc-500">
                {" "}
                / hour
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Studio Gallery */}
      <section className="mx-auto mt-8 max-w-7xl px-5 sm:px-6">
        {galleryImages.length > 0 ? (
          <div className="grid gap-3 md:grid-cols-[1.6fr_1fr]">
            {/* Main Image */}
            <div className="relative h-[300px] overflow-hidden rounded-3xl border border-white/10 sm:h-[420px]">
              <Image
                src={galleryImages[0]}
                alt={data.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 65vw"
                className="object-cover transition duration-500 hover:scale-[1.02]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5">
                <p className="text-sm text-zinc-300">Discover your next</p>
                <h2 className="mt-1 text-2xl font-semibold">
                  Creative space.
                </h2>
              </div>
            </div>

            {/* Additional Gallery Images */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
              {galleryImages.slice(1, 3).map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="relative h-[145px] overflow-hidden rounded-2xl border border-white/10 sm:h-[203px]"
                >
                  <Image
                    src={image}
                    alt={`${data.name} gallery ${index + 2}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 35vw"
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                </div>
              ))}

              {galleryImages.length < 2 && (
                <div className="flex h-[145px] items-center justify-center rounded-2xl border border-white/10 bg-[#111111] text-zinc-500 sm:h-[203px]">
                  <div className="text-center">
                    <ImageIcon className="mx-auto" size={25} />
                    <p className="mt-2 text-sm">More photos coming soon</p>
                  </div>
                </div>
              )}

              {galleryImages.length < 3 && (
                <div className="flex h-[145px] items-center justify-center rounded-2xl border border-white/10 bg-[#111111] text-zinc-500 sm:h-[203px]">
                  <div className="text-center">
                    <ImageIcon className="mx-auto" size={25} />
                    <p className="mt-2 text-sm">Studio preview</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex h-[300px] items-center justify-center rounded-3xl border border-white/10 bg-[#111111]">
            <p className="text-zinc-400">No studio images available.</p>
          </div>
        )}
      </section>

      {/* Details and Booking */}
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-6 lg:grid-cols-[1fr_350px]">
        {/* Left Content */}
        <div className="space-y-6">
          {/* Specifications */}
          <div className="rounded-3xl border border-white/10 bg-[#111111] p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Workspace information
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              Studio Specifications
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Specification
                icon={<CheckCircle2 size={19} />}
                label="Studio Type"
                value={data.category}
              />

              <Specification
                icon={<Users size={19} />}
                label="Maximum Capacity"
                value={
                  data.maxCapacity
                    ? `${data.maxCapacity} people`
                    : "Not specified"
                }
              />

              <Specification
                icon={<DollarSign size={19} />}
                label="Hourly Rate"
                value={`$${data.hourlyRate}`}
              />

              <Specification
                icon={<ShieldCheck size={19} />}
                label="Security Deposit"
                value={
                  data.securityDeposit !== undefined
                    ? `$${data.securityDeposit}`
                    : "Not specified"
                }
              />
            </div>
          </div>

          {/* About */}
          <div className="rounded-3xl border border-white/10 bg-[#111111] p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              About the studio
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              Your Space for Creativity
            </h2>

            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-zinc-400 sm:text-base">
              {data.description ||
                "A creative space designed for your next project."}
            </p>
          </div>

          {/* Amenities */}
          <div className="rounded-3xl border border-white/10 bg-[#111111] p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Studio features
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              Amenities & Facilities
            </h2>

            {amenities.length > 0 ? (
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4"
                  >
                    <CheckCircle2
                      size={19}
                      className="shrink-0 text-zinc-300"
                    />
                    <span className="text-sm text-zinc-300">{amenity}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-sm text-zinc-500">
                No amenities have been listed yet.
              </p>
            )}
          </div>

          {/* Host Details */}
          <div className="rounded-3xl border border-white/10 bg-[#111111] p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Your host
            </p>

            <h2 className="mt-3 text-2xl font-semibold">Host Details</h2>

            <div className="mt-5 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <UserRound size={23} />
              </div>

              <div>
                <p className="font-medium">
                  {data.hostName || "Studio Host"}
                </p>
                <p className="mt-1 text-sm text-zinc-500">
                  {data.hostEmail || "Host contact not provided"}
                </p>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="rounded-3xl border border-white/10 bg-[#111111] p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Guest feedback
            </p>

            <h2 className="mt-3 text-2xl font-semibold">Reviews</h2>

            {data.reviews && data.reviews.length > 0 ? (
              <div className="mt-6 space-y-4">
                {data.reviews.map((review, index) => (
                  <div
                    key={review._id || index}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium">{review.name}</p>

                      <div className="flex items-center gap-1 text-sm text-zinc-300">
                        <Star size={15} className="fill-current" />
                        {review.rating}/5
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-zinc-400">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-sm text-zinc-500">
                No reviews yet. Be the first to share your experience!
              </p>
            )}
          </div>
        </div>

        {/* Booking Card */}
        <aside>
          <div className="sticky top-8 rounded-3xl border border-white/10 bg-[#111111] p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Reserve your space
            </p>

            <h2 className="mt-3 text-2xl font-semibold">Book This Studio</h2>

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

            {data.securityDeposit !== undefined && (
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-zinc-400">Security deposit</span>
                <span className="font-medium">${data.securityDeposit}</span>
              </div>
            )}

            <div className="mt-5 flex items-center gap-3 text-sm text-zinc-400">
              <Clock size={17} />
              Flexible hourly booking
            </div>

            <Link
              href={`/booking/${data._id}`}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              <CalendarDays size={18} />
              Book Workspace Now
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

function Specification({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-zinc-300">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-zinc-500">{label}</p>
        <p className="mt-1 break-words text-sm font-medium text-zinc-200">
          {value}
        </p>
      </div>
    </div>
  );
}

export default DetailsPage;

