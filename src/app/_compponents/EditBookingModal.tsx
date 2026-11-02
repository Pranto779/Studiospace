"use client";

import { FormEvent, useEffect, useState } from "react";
import { CalendarDays, Clock3, X } from "lucide-react";
import { toast } from "sonner";
import type { Booking } from "./BookingCard";

interface EditBookingModalProps {
  booking: Booking;
  onClose: () => void;
  onUpdated: (booking: Booking) => void;
}

export default function EditBookingModal({
  booking,
  onClose,
  onUpdated,
}: EditBookingModalProps) {
  const [date, setDate] = useState(booking.date);
  const [startTime, setStartTime] = useState(booking.startTime);
  const [hours, setHours] = useState(String(booking.hours || 1));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);

    const hourlyRate =
      booking.hours > 0 ? Number(booking.totalPrice) / booking.hours : 0;
    const updatedBooking = {
      ...booking,
      date,
      startTime,
      hours: Number(hours),
      totalPrice: Math.round(hourlyRate * Number(hours)),
    };

    try {
      const response = await fetch(
        `${process.env.SERVER_BASE_URL}/mybooking/${encodeURIComponent(booking._id)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date,
            startTime,
            hours: Number(hours),
            totalPrice: updatedBooking.totalPrice,
          }),
        }
      );

      if (!response.ok) throw new Error("Unable to update booking");

      toast.success("Booking updated successfully.");
      onUpdated(updatedBooking);
    } catch {
      toast.error("Could not update this booking. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !saving) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-booking-title"
        className="w-full max-w-lg rounded-[28px] border border-white/10 bg-[#111111] shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-white/10 px-5 py-5 sm:px-7">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-500">
              Reservation editor
            </p>
            <h2 id="edit-booking-title" className="mt-2 text-2xl font-semibold">
              Edit {booking.studioName || "Booking"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            aria-label="Close edit booking"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 hover:bg-white/[0.06] hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5 p-5 sm:grid-cols-2 sm:p-7">
          <label className="sm:col-span-2">
            <span className="mb-2 block text-sm text-zinc-300">Booking date</span>
            <div className="relative">
              <CalendarDays size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                required
                className="h-12 w-full rounded-xl border border-white/10 bg-black pl-11 pr-4 outline-none focus:border-white/30"
              />
            </div>
          </label>

          <label>
            <span className="mb-2 block text-sm text-zinc-300">Start time</span>
            <div className="relative">
              <Clock3 size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="time"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
                required
                className="h-12 w-full rounded-xl border border-white/10 bg-black pl-11 pr-4 outline-none focus:border-white/30"
              />
            </div>
          </label>

          <label>
            <span className="mb-2 block text-sm text-zinc-300">Duration</span>
            <input
              type="number"
              min="1"
              value={hours}
              onChange={(event) => setHours(event.target.value)}
              required
              className="h-12 w-full rounded-xl border border-white/10 bg-black px-4 outline-none focus:border-white/30"
            />
          </label>

          <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="h-11 rounded-xl border border-white/10 px-5 text-sm text-zinc-300 hover:bg-white/[0.05] disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="h-11 rounded-xl bg-white px-5 text-sm font-semibold text-black hover:bg-zinc-200 disabled:opacity-50"
            >
              {saving ? "Updating..." : "Update Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
