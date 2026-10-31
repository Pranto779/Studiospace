"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  PlusCircle,
  Pencil,
  Trash2,
  MapPin,
  Eye,
  X,
  Loader2,
  Building2,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

interface Studio {
  _id: string;
  name: string;
  category: string;
  location: string;
  hourlyRate: number;
  image: string;
  description?: string;
  email: string;
  maxCapacity?: number;
  securityDeposit?: number;
  amenities?: string[];
}

export default function MyListingsPage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const email = session?.user?.email;

  const [listings, setListings] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);

  // Fetch logged-in user's studios
  const fetchListings = useCallback(async () => {
    if (!email) {
      setListings([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:8000/listing/${encodeURIComponent(email)}`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch listings");
      }

      const data = await res.json();

      setListings(Array.isArray(data) ? data : data ? [data] : []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load your studios.");
    } finally {
      setLoading(false);
    }
  }, [email]);

  useEffect(() => {
    if (isPending) return;

    if (!email) {
      setLoading(false);
      router.push("/sign-in");
      return;
    }

    fetchListings();
  }, [email, isPending, fetchListings, router]);

  // Delete studio
  const handleDelete = async () => {
    if (!selectedStudio || !email) return;

    try {
      setDeleting(true);

      const res = await fetch(
        `http://localhost:8000/listing/${selectedStudio._id}?email=${encodeURIComponent(email)}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete studio");
      }

      toast.success("Studio deleted successfully!");

      setListings((prev) =>
        prev.filter((studio) => studio._id !== selectedStudio._id)
      );

      setSelectedStudio(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete studio.");
    } finally {
      setDeleting(false);
    }
  };

  if (isPending || loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080808] text-white">
        <div className="flex items-center gap-3 text-zinc-400">
          <Loader2 className="animate-spin" size={22} />
          Loading your studios...
        </div>
      </main>
    );
  }

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
            <h3 className="text-3xl font-semibold">
              {String(listings.length).padStart(2, "0")}
            </h3>
            <p className="mt-2 text-sm text-zinc-500">Total Listings</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
            <h3 className="text-3xl font-semibold">—</h3>
            <p className="mt-2 text-sm text-zinc-500">Total Bookings</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
            <h3 className="text-3xl font-semibold">—</h3>
            <p className="mt-2 text-sm text-zinc-500">Monthly Revenue</p>
          </div>
        </div>

        {/* Listings */}
        {listings.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {listings.map((item) => (
              <div
                key={item._id}
                className="overflow-hidden rounded-[28px] border border-white/10 bg-[#111111]"
              >
                {/* Image */}
                <div className="relative h-56">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-zinc-900">
                      <Building2 size={42} className="text-zinc-600" />
                    </div>
                  )}

                  <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs backdrop-blur-md">
                    {item.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="truncate text-lg font-semibold">
                    {item.name}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-sm text-zinc-500">
                    <MapPin size={15} />
                    <span className="truncate">{item.location}</span>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-zinc-500">
                        Starting Price
                      </p>

                      <h4 className="text-2xl font-semibold">
                        ${item.hourlyRate}
                        <span className="text-sm font-normal text-zinc-500">
                          /hr
                        </span>
                      </h4>
                    </div>

                    <div className="flex gap-2">
                      {/* View */}
                      <Link
                        href={`/studios/${item._id}`}
                        title="View Studio"
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 transition hover:bg-white/10"
                      >
                        <Eye size={17} />
                      </Link>

                      {/* Update */}
                      <Link
                        href={`/update-studio/${item._id}`}
                        title="Update Studio"
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 transition hover:bg-white/10"
                      >
                        <Pencil size={17} />
                      </Link>

                      {/* Delete */}
                      <button
                        type="button"
                        title="Delete Studio"
                        onClick={() => setSelectedStudio(item)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/20 text-red-400 transition hover:bg-red-500/10"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-3xl border border-white/10 bg-[#111111] px-6 py-16 text-center">
            <Building2 className="mx-auto text-zinc-500" size={48} />

            <h2 className="mt-5 text-2xl font-semibold">
              No Listings Found
            </h2>

            <p className="mt-3 text-zinc-500">
              You haven't published any studios yet.
            </p>

            <Link
              href="/add-studio"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-black transition hover:bg-zinc-200"
            >
              <PlusCircle size={18} />
              Add Your First Studio
            </Link>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {selectedStudio && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !deleting) {
              setSelectedStudio(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
            className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111111] p-6 shadow-2xl"
          >
            <div className="mb-5 flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
                <AlertTriangle size={24} />
              </div>

              <button
                type="button"
                disabled={deleting}
                onClick={() => setSelectedStudio(null)}
                className="rounded-lg p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
                aria-label="Close confirmation modal"
              >
                <X size={20} />
              </button>
            </div>

            <h2
              id="delete-modal-title"
              className="text-2xl font-semibold"
            >
              Delete Studio?
            </h2>

            <p className="mt-3 leading-7 text-zinc-400">
              Are you sure you want to delete{" "}
              <span className="font-medium text-white">
                {selectedStudio.name}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-7 flex gap-3">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setSelectedStudio(null)}
                className="flex-1 rounded-xl border border-white/10 px-4 py-3 font-medium transition hover:bg-white/5 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleting}
                onClick={handleDelete}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleting ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={17} />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

