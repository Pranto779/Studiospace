"use client";

import Image from "next/image";
import {
  CalendarDays,
  Clock3,
  Hash,
  Mail,
  MapPin,
  User,
} from "lucide-react";
import BookingActions from "./BookingActions";

export type BookingStatus =
  | "Pending"
  | "Confirmed"
  | "Completed"
  | "Cancelled";

export interface Booking {
  _id: string;
  studioId?: string;
  studioImage?: string;
  studioName?: string;
  studioLocation?: string;
  customerName?: string;
  customerEmail: string;
  date: string;
  startTime: string;
  hours: number;
  totalPrice: number;
  status: BookingStatus;
}

const statusStyles: Record<BookingStatus, string> = {
  Pending: "border-amber-400/20 bg-amber-400/10 text-amber-300",
  Confirmed: "border-blue-400/20 bg-blue-400/10 text-blue-300",
  Completed: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  Cancelled: "border-red-400/20 bg-red-400/10 text-red-300",
};

interface BookingCardProps {
  booking: Booking;
  onCancelled: (bookingId: string) => void;
  onUpdated: (booking: Booking) => void;
}

export default function BookingCard({
  booking,
  onCancelled,
  onUpdated,
}: BookingCardProps) {
  const displayStatus =
    booking.status === "Confirmed" ? "Pending" : booking.status;

  return (
    <article className="grid w-full overflow-hidden rounded-[26px] border border-white/10 bg-[#111111] shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-0.5 hover:border-white/25 lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[380px_minmax(0,1fr)]">
      <div className="relative h-52 overflow-hidden bg-zinc-900 sm:h-56 lg:h-[300px]">
        {booking.studioImage ? (
          <Image
            src={booking.studioImage}
            alt={booking.studioName || "Studio"}
            fill
            sizes="(max-width: 1024px) 100vw, 380px"
            unoptimized
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-zinc-600">
            Studio image
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <span
          className={`absolute right-3 top-3 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-md ${statusStyles[displayStatus]}`}
        >
          {displayStatus}
        </span>
      </div>

      <div className="flex min-w-0 flex-col p-4 sm:p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
          Reservation
        </p>
        <h2 className="mt-1 text-xl font-semibold">
          {booking.studioName || "Studio booking"}
        </h2>

        {booking.studioLocation && (
          <p className="mt-2 flex items-center gap-2 text-sm text-zinc-400">
            <MapPin size={16} />
            {booking.studioLocation}
          </p>
        )}

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
            <p className="flex items-center gap-2 text-xs text-zinc-500">
              <CalendarDays size={15} /> Date
            </p>
            <p className="mt-2 font-medium">{booking.date}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
            <p className="flex items-center gap-2 text-xs text-zinc-500">
              <Clock3 size={15} /> Time
            </p>
            <p className="mt-2 font-medium">
              {booking.startTime} · {booking.hours}h
            </p>
          </div>
        </div>

        <div className="mt-3 grid gap-2 rounded-2xl border border-white/10 bg-black/20 p-3 text-sm sm:grid-cols-2">
          {booking.customerName && (
            <p className="flex items-center gap-2 text-zinc-400">
              <User size={15} className="text-zinc-500" />
              <span className="text-xs text-zinc-500">Guest</span>
              <span className="ml-auto max-w-[65%] truncate text-right text-zinc-200">
                {booking.customerName}
              </span>
            </p>
          )}
          <p className="flex items-center gap-2 text-zinc-400">
            <Mail size={15} className="text-zinc-500" />
            <span className="text-xs text-zinc-500">Email</span>
            <span className="ml-auto max-w-[65%] truncate text-right text-zinc-200">
              {booking.customerEmail}
            </span>
          </p>
          {booking.studioId && (
            <p className="flex items-center gap-2 text-zinc-400 sm:col-span-2">
              <Hash size={15} className="text-zinc-500" />
              <span className="text-xs text-zinc-500">Studio ID</span>
              <span className="ml-auto max-w-[65%] truncate text-right text-zinc-200">
                {booking.studioId}
              </span>
            </p>
          )}
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-white/10 pt-3">
          <div>
            <p className="text-xs text-zinc-500">Booking total</p>
            <p className="mt-1 text-2xl font-semibold">
              ${booking.totalPrice}
            </p>
          </div>
          <BookingActions
            booking={booking}
            onCancelled={onCancelled}
            onUpdated={onUpdated}
          />
        </div>
      </div>
    </article>
  );
}
