"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "../lib/auth-client";

export interface BookingStudio {
  _id: string;
  name: string;
  location?: string;
  hourlyRate?: number | string;
  image?: string;
}

export default function BookingStudioPage({
  studio,
}: {
  studio: BookingStudio | null;
}) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [submitting, setSubmitting] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    if (!isPending && !session?.user) router.replace("/signin");
  }, [isPending, router, session?.user]);

  if (!studio) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080808] px-6 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">Studio unavailable</h1>
          <Link href="/studios" className="mt-6 inline-block rounded-xl bg-white px-5 py-3 font-semibold text-black">
            Browse Studios
          </Link>
        </div>
      </main>
    );
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!session?.user) return;

    const formData = new FormData(event.currentTarget);
    const booking = {
      studioId: studio._id,
      studioName: studio.name,
      studioLocation: studio.location || "",
      customerEmail: session.user.email,
      customerName: session.user.name || "",
      date: String(formData.get("date")),
      startTime: String(formData.get("startTime")),
      hours: Number(formData.get("hours")),
      totalPrice: (Number(studio.hourlyRate) || 0) * Number(formData.get("hours")),
      status: "Pending",
    };

    setSubmitting(true);
    const toastId = toast.loading("Submitting your booking...");
    try {
      const response = await fetch("http://localhost:8000/mybookCollection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });
      if (!response.ok) throw new Error("Booking failed");

      const result = await response.json().catch(() => null);
      const createdBooking = { ...booking, _id: `${studio._id}-${Date.now()}` };

      if (result && typeof result === "object") {
        const responseData = result as Record<string, unknown>;
        sessionStorage.setItem(
          "studiospace_new_booking",
          JSON.stringify({
            ...createdBooking,
            ...responseData,
            savedAt: Date.now(),
          })
        );
      } else {
        sessionStorage.setItem(
          "studiospace_new_booking",
          JSON.stringify({ ...createdBooking, savedAt: Date.now() })
        );
      }

      toast.dismiss(toastId);
      toast.success("Reservation submitted successfully.");
      router.push("/my-bookings");
    } catch {
      toast.dismiss(toastId);
      toast.error("Could not create your reservation. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const hourlyRate = Number(studio.hourlyRate) || 0;

  return (
    <main className="min-h-screen bg-[#080808] px-4 py-10 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <Link href={`/studios/${studio._id}`} className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white">
          <ArrowLeft size={16} /> Back to studio
        </Link>

        <div className="mt-7 grid gap-5 lg:grid-cols-[1fr_360px]">
          <form onSubmit={handleSubmit} className="rounded-[28px] border border-white/10 bg-[#111111] p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">New reservation</p>
            <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Book your studio</h1>
            <p className="mt-3 text-sm leading-7 text-zinc-400">Select your preferred date and time for this studio reservation.</p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <label className="text-sm text-zinc-300">
                Booking date
                <div className="mt-2 flex h-12 items-center gap-3 rounded-xl border border-white/10 bg-black px-4">
                  <CalendarDays size={17} className="text-zinc-500" />
                  <input required type="date" name="date" min={today} className="w-full bg-transparent outline-none [color-scheme:dark]" />
                </div>
              </label>

              <label className="text-sm text-zinc-300">
                Start time
                <div className="mt-2 flex h-12 items-center gap-3 rounded-xl border border-white/10 bg-black px-4">
                  <Clock3 size={17} className="text-zinc-500" />
                  <input required type="time" name="startTime" className="w-full bg-transparent outline-none [color-scheme:dark]" />
                </div>
              </label>

              <label className="text-sm text-zinc-300 sm:col-span-2">
                Duration
                <div className="mt-2 flex h-12 items-center gap-3 rounded-xl border border-white/10 bg-black px-4">
                  <Clock3 size={17} className="text-zinc-500" />
                  <select required name="hours" defaultValue="1" className="w-full bg-transparent outline-none">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((hours) => (
                      <option key={hours} value={hours} className="bg-black">
                        {hours} {hours === 1 ? "hour" : "hours"}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-sm leading-6 text-zinc-400">
              <ShieldCheck size={19} className="mt-0.5 shrink-0 text-zinc-300" />
              Your reservation is confirmed instantly and does not need host approval.
            </div>

            <button type="submit" disabled={submitting} className="mt-6 h-12 w-full rounded-xl bg-white font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-50">
              {submitting ? "Submitting..." : "Request Booking"}
            </button>
          </form>

          <aside className="h-fit rounded-[28px] border border-white/10 bg-[#111111] p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Your studio</p>
            <h2 className="mt-3 text-2xl font-semibold">{studio.name}</h2>
            {studio.location && (
              <p className="mt-2 flex items-center gap-2 text-sm text-zinc-400">
                <MapPin size={16} /> {studio.location}
              </p>
            )}
            <div className="mt-5 border-t border-white/10 pt-5">
              <p className="text-xs text-zinc-500">Hourly rate</p>
              <p className="mt-1 text-3xl font-semibold">${hourlyRate}<span className="text-sm font-normal text-zinc-500">/hr</span></p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
