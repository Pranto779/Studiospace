"use client";

import Image from "next/image";
import {
  UserRound,
  Mail,
  Camera,
  MapPin,
  CalendarDays,
  Pencil,
} from "lucide-react";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
            Account Settings
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-1px] md:text-5xl">
            My Profile
          </h1>

          <p className="mt-3 text-zinc-400">
            Manage your personal information and hosting profile.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.8fr,1.4fr]">
          {/* Profile Card */}
          <div className="rounded-[32px] border border-white/10 bg-[#111111] p-8">
            <div className="flex flex-col items-center">
              <div className="relative">
                <Image
                  src="https://i.pravatar.cc/300"
                  alt="Profile"
                  width={120}
                  height={120}
                  className="rounded-full border border-white/10"
                />

                <button className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-white text-black">
                  <Camera size={16} />
                </button>
              </div>

              <h2 className="mt-5 text-2xl font-semibold">
                Pranto
              </h2>

              <p className="mt-1 text-zinc-500">
                Creator & Studio Host
              </p>
            </div>

            <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
              <div className="flex items-center gap-3 text-zinc-400">
                <Mail size={17} />
                pranto@example.com
              </div>

              <div className="flex items-center gap-3 text-zinc-400">
                <MapPin size={17} />
                Dhaka, Bangladesh
              </div>

              <div className="flex items-center gap-3 text-zinc-400">
                <CalendarDays size={17} />
                Joined Jan 2026
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-center">
                <h3 className="text-2xl font-semibold">08</h3>
                <p className="mt-1 text-xs text-zinc-500">
                  Listings
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-center">
                <h3 className="text-2xl font-semibold">42</h3>
                <p className="mt-1 text-xs text-zinc-500">
                  Bookings
                </p>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <div className="rounded-[32px] border border-white/10 bg-[#111111] p-8 md:p-10">
            <div className="mb-8 flex items-center gap-3">
              <Pencil size={20} />
              <h2 className="text-2xl font-semibold">
                Edit Profile
              </h2>
            </div>

            <form className="space-y-6">
              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Full Name
                </label>

                <div className="relative">
                  <UserRound
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                  />

                  <input
                    type="text"
                    defaultValue="Pranto"
                    className="h-12 w-full rounded-xl border border-white/10 bg-black pl-11 pr-4 outline-none focus:border-white/30"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                  />

                  <input
                    type="email"
                    defaultValue="pranto@example.com"
                    className="h-12 w-full rounded-xl border border-white/10 bg-black pl-11 pr-4 outline-none focus:border-white/30"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Photo URL
                </label>

                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  className="h-12 w-full rounded-xl border border-white/10 bg-black px-4 outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Location
                </label>

                <input
                  type="text"
                  defaultValue="Dhaka, Bangladesh"
                  className="h-12 w-full rounded-xl border border-white/10 bg-black px-4 outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Short Bio
                </label>

                <textarea
                  rows={5}
                  placeholder="Tell creators about yourself..."
                  className="w-full rounded-xl border border-white/10 bg-black p-4 outline-none focus:border-white/30"
                />
              </div>

              <button
                type="submit"
                className="h-12 w-full rounded-xl bg-white font-medium text-black transition hover:bg-zinc-200"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}