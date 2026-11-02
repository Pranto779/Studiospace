"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Building2,
  Layers3,
  Plus,
  RefreshCw,
} from "lucide-react";
import { authClient } from "../lib/auth-client";
import UpdateStudioModal from "../_compponents/UpdateStudioModal";
import DeleteStudioModal from "../_compponents/DeleteStudioModal";
import ListingCard, { ListingStudio } from "../_compponents/ListingCard";
import { gettokenclient } from "@/hooks/gettokenClient";

export default function MyListingsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email;
  const [listings, setListings] = useState<ListingStudio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [studioToDelete, setStudioToDelete] = useState<ListingStudio | null>(null);
  const [studioToUpdate, setStudioToUpdate] = useState<ListingStudio | null>(null);

  useEffect(() => {
    if (!isPending && !email) {
      router.replace("/signin");
    }
  }, [email, isPending, router]);

  useEffect(() => {
    if (isPending) return;

    if (!email) {
      return;
    }

    const loadListings = async () => {
    const token=await gettokenclient()
      setError("");

      try {
        const response = await fetch(
          `${process.env.SERVER_BASE_URL}/listing/${encodeURIComponent(email)}`,{
            headers:{
              authorization:`Bearer ${token}`
            }
          }
        );

        if (!response.ok) throw new Error("Unable to load listings");

        const data: unknown = await response.json();
        const ownedListings = Array.isArray(data)
          ? (data as ListingStudio[]).filter(
              (studio) =>
                studio.email?.toLowerCase() === email.toLowerCase()
            )
          : [];
        setListings(ownedListings);
      } catch {
        setListings([]);
        setError("We could not load your listings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    queueMicrotask(() => setLoading(true));
    void loadListings();
  }, [email, isPending]);

  const averageRate =
    listings.length > 0
      ? Math.round(
          listings.reduce(
            (total, listing) => total + (Number(listing.hourlyRate) || 0),
            0
          ) / listings.length
        )
      : 0;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080808] px-4 py-12 text-white sm:px-6 lg:px-10 lg:py-16">
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-white/[0.035] blur-[140px]" />
      <div className="pointer-events-none absolute right-0 top-80 h-80 w-80 rounded-full bg-amber-400/[0.025] blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-400">
              <Layers3 size={14} />
              Host workspace
            </p>
            <h1 className="text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              My Listings
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">
              Showcase your spaces, keep every studio organized, and turn
              creative ideas into unforgettable productions.
            </p>
          </div>

          <Link
            href="/add-studio"
            className="group inline-flex w-fit items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition duration-300 hover:bg-zinc-200 sm:px-6"
          >
            <Plus size={18} />
            Add New Studio
            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </header>

        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-[1fr_1fr_1fr] sm:gap-4">
          <div className="rounded-[24px] border border-white/10 bg-[#111111] p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
              Total spaces
            </p>
            <p className="mt-3 text-3xl font-semibold sm:text-4xl">
              {listings.length.toString().padStart(2, "0")}
            </p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-[#111111] p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
              Average rate
            </p>
            <p className="mt-3 text-3xl font-semibold sm:text-4xl">
              <span className="text-lg text-zinc-500">$</span>
              {averageRate}
              <span className="text-sm font-normal text-zinc-500">/hr</span>
            </p>
          </div>
          <div className="col-span-2 rounded-[24px] border border-white/10 bg-[#111111] p-5 sm:col-span-1 sm:p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
              Listing status
            </p>
            <p className="mt-3 flex items-center gap-2 text-lg font-semibold text-zinc-200">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.65)]" />
              Visible
            </p>
          </div>
        </div>

        {isPending || (email && loading) ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-[28px] border border-white/10 bg-[#111111]"
              >
                <div className="h-60 animate-pulse bg-white/[0.05]" />
                <div className="space-y-4 p-6">
                  <div className="h-5 w-2/3 animate-pulse rounded bg-white/[0.06]" />
                  <div className="h-4 w-full animate-pulse rounded bg-white/[0.04]" />
                  <div className="h-11 w-full animate-pulse rounded-xl bg-white/[0.05]" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-[28px] border border-red-500/20 bg-red-500/[0.04] px-6 py-16 text-center">
            <p className="text-lg font-semibold text-red-300">{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm text-white"
            >
              <RefreshCw size={16} />
              Try again
            </button>
          </div>
        ) : !email ? (
          <div className="rounded-[32px] border border-white/10 bg-[#111111] px-6 py-20 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
              <Building2 size={34} className="text-zinc-400" />
            </div>
            <h2 className="mt-6 text-2xl font-semibold sm:text-3xl">
              Sign in to view your studio spaces
            </h2>
            <Link
              href="/signin"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black"
            >
              Sign in
              <ArrowRight size={17} />
            </Link>
          </div>
        ) : listings.length === 0 ? (
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#111111] px-6 py-20 text-center sm:py-24">
            <div className="absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-white/[0.04] blur-[80px]" />
            <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border border-white/10 bg-white/[0.04]">
              <Building2 size={36} className="text-zinc-300" />
            </div>
            <h2 className="relative mt-6 text-2xl font-semibold sm:text-3xl">
              Your first studio starts here
            </h2>
            <p className="relative mx-auto mt-3 max-w-md text-sm leading-7 text-zinc-400">
              Add a creative space, share its amenities, and connect with
              creators looking for the perfect place to produce.
            </p>
            <Link
              href="/add-studio"
              className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              <Plus size={18} />
              Create your listing
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {listings.map((studio) => (
              <ListingCard
                key={studio._id}
                studio={studio}
                onUpdate={setStudioToUpdate}
                onDelete={setStudioToDelete}
              />
            ))}
          </div>
        )}
      </div>

      {studioToUpdate && (
        <UpdateStudioModal
          studio={studioToUpdate}
          onClose={() => setStudioToUpdate(null)}
          onUpdated={(updatedStudio) => {
            setListings((current) =>
              current.map((studio) =>
                studio._id === updatedStudio._id
                  ? ({ ...studio, ...updatedStudio } as ListingStudio)
                  : studio
              )
            );
            setStudioToUpdate(null);
          }}
        />
      )}

      {studioToDelete && (
        <DeleteStudioModal
          studio={studioToDelete}
          onClose={() => setStudioToDelete(null)}
          onDeleted={(studioId) => {
            setListings((current) =>
              current.filter((studio) => studio._id !== studioId)
            );
            setStudioToDelete(null);
          }}
        />
      )}
    </main>
  );
}
