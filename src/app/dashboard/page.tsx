"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Building2,
  CalendarDays,
  PlusCircle,
  ArrowUpRight,
  DollarSign,
  Clock3,
  RefreshCw,
  LayoutDashboard,
  Search,
} from "lucide-react";
import { authClient } from "../lib/auth-client";
import { gettokenclient } from "@/hooks/gettokenClient";

interface Studio {
  _id: string;
  name: string;
  email?: string;
  hourlyRate?: number | string;
  image?: string;
  location?: string;
}

interface Booking {
  studioId?: string;
  totalPrice?: number | string;
  status?: string;
  date?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email;

  const [studios, setStudios] = useState<Studio[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async () => {
    if (!email) return;

    setLoading(true);
    setError("");

    try {
      const token = await gettokenclient();
      const headers: Record<string, string> = token
        ? { authorization: `Bearer ${token}` }
        : {};

      const [studioResponse, bookingResponse] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/listing/${encodeURIComponent(email)}`, {
          cache: "no-store",
          headers,
        }),
        fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/mybooking`, {
          cache: "no-store",
          headers,
        }),
      ]);

      if (!studioResponse.ok || !bookingResponse.ok) {
        throw new Error("Dashboard data could not be loaded");
      }

      const studioData: unknown = await studioResponse.json();
      const bookingData: unknown = await bookingResponse.json();

      const allStudios = Array.isArray(studioData) ? (studioData as Studio[]) : [];
      const ownedStudios = allStudios.filter(
        (studio) =>
          studio.email?.toLowerCase() === email.toLowerCase()
      );

      const allBookings = Array.isArray(bookingData)
        ? bookingData
        : bookingData &&
            typeof bookingData === "object" &&
            Array.isArray((bookingData as { bookings?: unknown }).bookings)
          ? ((bookingData as { bookings: Booking[] }).bookings)
          : [];

      const studioIds = new Set(
        ownedStudios.map((studio) => String(studio._id))
      );
      const ownedBookings = allBookings.filter((booking) =>
        studioIds.has(String(booking.studioId || ""))
      );

      setStudios(ownedStudios);
      setBookings(ownedBookings);
    } catch {
      setStudios([]);
      setBookings([]);
      setError("Could not load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [email]);

  useEffect(() => {
    if (!isPending && !email) {
      router.replace("/signin");
    }
  }, [email, isPending, router]);

  useEffect(() => {
    if (isPending || !email) return;
    queueMicrotask(() => void loadDashboard());
  }, [email, isPending, loadDashboard]);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthlyRevenue = bookings.reduce((total, booking) => {
    if (!booking.date) return total;

    const bookingDate = new Date(booking.date);
    const isCurrentMonth =
      bookingDate.getMonth() === currentMonth &&
      bookingDate.getFullYear() === currentYear;
    const isCancelled =
      booking.status?.toLowerCase() === "cancelled";

    if (!isCurrentMonth || isCancelled) return total;

    return total + (Number(booking.totalPrice) || 0);
  }, 0);

  const pendingRequests = bookings.filter(
    (booking) => booking.status?.toLowerCase() === "pending"
  ).length;

  const stats = [
    {
      title: "Total Studios",
      value: String(studios.length),
      icon: Building2,
    },
    {
      title: "Total Bookings",
      value: String(bookings.length),
      icon: CalendarDays,
    },
    {
      title: "Monthly Revenue",
      value: `$${monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
    },
    {
      title: "Pending Requests",
      value: String(pendingRequests).padStart(2, "0"),
      icon: Clock3,
    },
  ];

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {error && (
          <div className="mb-6 flex items-center justify-between rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">
            <p>{error}</p>
            <button
              type="button"
              onClick={() => void loadDashboard()}
              className="ml-4 inline-flex items-center gap-2 rounded-lg border border-red-400/20 px-3 py-2 text-white"
            >
              <RefreshCw size={16} />
              Retry
            </button>
          </div>
        )}

        <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
          <aside className="hidden rounded-[24px] border border-white/10 bg-[#111111] p-3 lg:block">
            <div className="mb-5 px-3 py-4">
              <p className="text-lg font-semibold tracking-tight">StudioSpace</p>
              <p className="mt-1 text-xs text-zinc-500">Host Dashboard</p>
            </div>

            <nav className="space-y-1">
              <Link href="/dashboard" className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-medium text-black">
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
              <Link href="/my-listings" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-zinc-400 transition hover:bg-white/[0.05] hover:text-white">
                <Building2 size={18} />
                My Listings
              </Link>
              <Link href="/my-bookings" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-zinc-400 transition hover:bg-white/[0.05] hover:text-white">
                <CalendarDays size={18} />
                My Bookings
              </Link>
              <Link href="/add-studio" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-zinc-400 transition hover:bg-white/[0.05] hover:text-white">
                <PlusCircle size={18} />
                Add Studio
              </Link>
            </nav>
          </aside>

          <div className="min-w-0">
            <div className="mb-6 flex flex-col gap-5 rounded-[24px] border border-white/10 bg-[#111111] px-5 py-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Dashboard</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                  Welcome, {session?.user?.name || "Creator"}
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden h-11 items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-4 text-zinc-500 sm:flex">
                  <Search size={17} />
                  <span className="text-sm">Search</span>
                </div>
                <Link href="/add-studio" className="inline-flex h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-black transition hover:bg-zinc-200">
                  <PlusCircle size={18} />
                  Add Studio
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div key={stat.title} className="rounded-[22px] border border-white/10 bg-[#111111] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/25">
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                        <Icon size={20} />
                      </div>
                      <span className="rounded-full bg-white/[0.04] px-2 py-1 text-[10px] uppercase tracking-wider text-zinc-500">
                        Live
                      </span>
                    </div>
                    <h3 className="mt-5 text-3xl font-semibold">
                      {loading ? "..." : stat.value}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-500">{stat.title}</p>
                  </div>
                );
              })}
            </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-[1.45fr_0.55fr]">
          <div className="rounded-[24px] border border-white/10 bg-[#111111] p-5">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Recent Studio Listings</h2>
                <p className="mt-1 text-xs text-zinc-500">Your latest active spaces</p>
              </div>
              <Link href="/my-listings" className="text-sm text-zinc-400 hover:text-white">
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {loading ? (
                <p className="py-8 text-center text-sm text-zinc-500">
                  Loading listings...
                </p>
              ) : studios.length === 0 ? (
                <div className="rounded-xl border border-white/10 bg-black/30 p-6 text-center">
                  <p className="text-sm text-zinc-400">
                    You have no studio listings yet.
                  </p>
                  <Link
                    href="/add-studio"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white"
                  >
                    Add your first studio
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              ) : (
                studios.slice(0, 5).map((studio) => (
                  <Link
                    key={studio._id}
                    href={`/studios/${studio._id}`}
                    className="flex items-center gap-4 rounded-[18px] border border-white/[0.07] bg-black/20 p-3 transition duration-300 hover:border-white/20 hover:bg-white/[0.03]"
                  >
                    <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-zinc-900">
                      <Image
                        src={
                          studio.image ||
                          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=400&auto=format&fit=crop"
                        }
                        alt={studio.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="font-medium">{studio.name}</h3>
                      <p className="mt-1 text-sm text-zinc-500">
                        {studio.location || "Active Listing"}
                      </p>
                    </div>

                    <ArrowUpRight
                      size={18}
                      className="ml-auto shrink-0 text-zinc-500"
                    />
                  </Link>
                ))
              )}
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-[#111111] p-5">
            <h2 className="mb-5 text-xl font-semibold">Quick Actions</h2>

            <div className="space-y-3">
              <Link
                href="/add-studio"
                className="flex items-center justify-between rounded-[18px] border border-white/10 bg-black/20 p-4 transition duration-300 hover:border-white/25 hover:bg-white/[0.03]"
              >
                Add Studio
                <ArrowUpRight size={18} />
              </Link>

              <Link
                href="/my-listings"
                className="flex items-center justify-between rounded-[18px] border border-white/10 bg-black/20 p-4 transition duration-300 hover:border-white/25 hover:bg-white/[0.03]"
              >
                My Listings
                <ArrowUpRight size={18} />
              </Link>

              <Link
                href="/my-bookings"
                className="flex items-center justify-between rounded-[18px] border border-white/10 bg-black/20 p-4 transition duration-300 hover:border-white/25 hover:bg-white/[0.03]"
              >
                My Bookings
                <ArrowUpRight size={18} />
              </Link>

            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
    </main>
  );
}