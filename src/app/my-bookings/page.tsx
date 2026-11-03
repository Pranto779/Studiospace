"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Plus,
  RefreshCw,
} from "lucide-react";
import { authClient } from "../lib/auth-client";
import BookingCard, {
  Booking,
  BookingStatus,
} from "../_compponents/BookingCard";
import { gettokenclient } from "@/hooks/gettokenClient";

interface StoredBooking extends Booking {
  savedAt?: number;
  studioId?: string;
}

const normalizeBookings = (data: unknown, email?: string): Booking[] => {
  const rawBookings = Array.isArray(data)
    ? data
    : data && typeof data === "object"
      ? (((data as { bookings?: unknown }).bookings ||
          (data as { data?: unknown }).data ||
          []) as unknown[])
      : [];

  return rawBookings
    .filter((item): item is Record<string, unknown> => !!item && typeof item === "object")
    .map((item) => {
      const statusValue = String(item.status || "Pending").toLowerCase();
      const status: BookingStatus =
        statusValue === "confirmed"
          ? "Pending"
          : statusValue === "completed"
            ? "Completed"
            : statusValue === "cancelled" || statusValue === "canceled"
              ? "Cancelled"
              : "Pending";

      return {
        _id: String(item._id || item.id || `${item.studioId || "booking"}-${item.date}-${item.startTime}`),
        studioId: String(item.studioId || ""),
        studioImage: String(item.studioImage || item.image || ""),
        studioName: String(item.studioName || item.name || "Studio booking"),
        studioLocation: String(item.studioLocation || item.location || ""),
        customerName: String(item.customerName || item.name || ""),
        customerEmail: String(item.customerEmail || item.customer_email || item.userEmail || item.email || ""),
        date: String(item.date || ""),
        startTime: String(item.startTime || item.time || ""),
        hours: Number(item.hours || 1),
        totalPrice: Number(item.totalPrice || 0),
        status,
      };
    })
    .filter((booking) => !email || booking.customerEmail.toLowerCase() === email.toLowerCase());
};

const mergeStoredBooking = (serverBookings: Booking[]) => {
  try {
    const stored = sessionStorage.getItem("studiospace_new_booking");
    if (!stored) return serverBookings;

    const newBooking = JSON.parse(stored) as StoredBooking;
    if (!newBooking.savedAt || Date.now() - newBooking.savedAt > 60_000) {
      sessionStorage.removeItem("studiospace_new_booking");
      return serverBookings;
    }

    const alreadyPresent = serverBookings.some(
      (booking) =>
        booking._id === newBooking._id ||
        (booking.date === newBooking.date &&
          booking.startTime === newBooking.startTime &&
          booking.studioName === newBooking.studioName)
    );

    sessionStorage.removeItem("studiospace_new_booking");
    return alreadyPresent ? serverBookings : [newBooking, ...serverBookings];
  } catch {
    sessionStorage.removeItem("studiospace_new_booking");
    return serverBookings;
  }
};

const addStudioImages = async (bookings: Booking[]) => {
  if (bookings.every((booking) => booking.studioImage || !booking.studioId)) {
    return bookings;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/studios`, {
      cache: "no-store",
    });
    if (!response.ok) return bookings;

    const data: unknown = await response.json();
    if (!Array.isArray(data)) return bookings;

    const studios = data.filter(
      (item): item is Record<string, unknown> =>
        !!item && typeof item === "object"
    );

    return bookings.map((booking) => {
      const studio = studios.find(
        (item) => String(item._id || item.id || "") === booking.studioId
      );
      if (!studio) return booking;

      return {
        ...booking,
        studioImage: String(booking.studioImage || studio.image || ""),
        studioName: String(booking.studioName || studio.name || "Studio booking"),
        studioLocation: String(
          booking.studioLocation || studio.location || ""
        ),
      };
    });
  } catch {
    return bookings;
  }
};

export default function MyBookingsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email;
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!isPending && !email) router.replace("/signin");
  }, [email, isPending, router]);

  const loadBookings = async () => {
    if (!email) return;
    setLoading(true);
    setError("");

    try {
      const token = await gettokenclient();
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/mybooking`, {
        cache: "no-store",
        headers: token ? { authorization: `Bearer ${token}` } : {},
      });
      if (!response.ok) throw new Error("Unable to load bookings");
      const data: unknown = await response.json();
      const serverBookings = normalizeBookings(data, email);
      setBookings(
        mergeStoredBooking(await addStudioImages(serverBookings))
      );
    } catch {
      setBookings([]);
      setError("We could not load your bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isPending || !email) return;

    const fetchBookings = async () => {
      const token=await gettokenclient()
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/mybooking`, {
          cache: "no-store",
          headers:{
            authorization:`Bearer ${token}`
          }
          
        });
        if (!response.ok) throw new Error("Unable to load bookings");
        const data: unknown = await response.json();
        const serverBookings = normalizeBookings(data, email);
        setBookings(
          mergeStoredBooking(await addStudioImages(serverBookings))
        );
      } catch {
        setBookings([]);
        setError("We could not load your bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    void fetchBookings();
  }, [email, isPending]);

  if (isPending || (!email && loading)) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080808] text-white">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080808] px-4 py-12 text-white sm:px-6 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-500 sm:text-xs">My studio reservations</p>
            <h1 className="text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">My Bookings</h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400">Track every reservation and manage pending requests from one place.</p>
          </div>
          <Link href="/studios" className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-zinc-200">
            <Plus size={17} /> Find a studio
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[0, 1, 2, 3].map((item) => (
              <div key={item} className="h-64 animate-pulse rounded-[28px] border border-white/10 bg-[#111111]" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-[28px] border border-red-500/20 bg-red-500/[0.04] px-6 py-16 text-center">
            <p className="text-lg font-semibold text-red-300">{error}</p>
            <button type="button" onClick={() => void loadBookings()} className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm">
              <RefreshCw size={16} /> Try again
            </button>
          </div>
        ) : bookings.length === 0 ? (
          <div className="rounded-[32px] border border-white/10 bg-[#111111] px-6 py-20 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border border-white/10 bg-white/[0.04]">
              <CalendarDays size={34} className="text-zinc-400" />
            </div>
            <h2 className="mt-6 text-2xl font-semibold">No bookings yet</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-zinc-400">Find a creative space and request your first reservation.</p>
            <Link href="/studios" className="mt-7 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-black">Explore studios</Link>
          </div>
        ) : (
          <div className="grid w-full gap-5">
            {bookings.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                onCancelled={(bookingId) =>
                  setBookings((current) =>
                    current.filter((booking) => booking._id !== bookingId)
                  )
                }
                onUpdated={(updatedBooking) =>
                  setBookings((current) =>
                  current.map((booking) =>
                    booking._id === updatedBooking._id
                      ? updatedBooking
                      : booking
                  )
                  )
                }
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
