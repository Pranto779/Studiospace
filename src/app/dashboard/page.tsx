"use client";

import Link from "next/link";
import {
  Building2,
  CalendarDays,
  PlusCircle,
  ArrowUpRight,
  DollarSign,
  Clock3,
} from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Studios",
      value: "12",
      icon: Building2,
    },
    {
      title: "Total Bookings",
      value: "86",
      icon: CalendarDays,
    },
    {
      title: "Monthly Revenue",
      value: "$2,450",
      icon: DollarSign,
    },
    {
      title: "Pending Requests",
      value: "04",
      icon: Clock3,
    },
  ];

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Dashboard
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-[-1px] md:text-5xl">
              Welcome Back
            </h1>

            <p className="mt-3 text-zinc-400">
              Manage your studios, bookings and hosting activity.
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
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-[24px] border border-white/10 bg-[#111111] p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                  <Icon size={22} />
                </div>

                <h3 className="mt-5 text-3xl font-semibold">
                  {stat.value}
                </h3>

                <p className="mt-2 text-sm text-zinc-500">
                  {stat.title}
                </p>
              </div>
            );
          })}
        </div>

        {/* Content */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr,0.8fr]">
          {/* Recent Listings */}
          <div className="rounded-[28px] border border-white/10 bg-[#111111] p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Recent Studio Listings
              </h2>

              <Link
                href="/my-listings"
                className="text-sm text-zinc-400 hover:text-white"
              >
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {[
                "Luxury Content Studio",
                "Podcast Pro Room",
                "Creative Photo Loft",
              ].map((studio) => (
                <div
                  key={studio}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 p-4"
                >
                  <div>
                    <h3 className="font-medium">{studio}</h3>
                    <p className="mt-1 text-sm text-zinc-500">
                      Active Listing
                    </p>
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="text-zinc-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-[28px] border border-white/10 bg-[#111111] p-6">
            <h2 className="mb-6 text-xl font-semibold">
              Quick Actions
            </h2>

            <div className="space-y-3">
              <Link
                href="/add-studio"
                className="flex items-center justify-between rounded-xl border border-white/10 p-4 transition hover:bg-white/[0.03]"
              >
                Add Studio
                <ArrowUpRight size={18} />
              </Link>

              <Link
                href="/my-listings"
                className="flex items-center justify-between rounded-xl border border-white/10 p-4 transition hover:bg-white/[0.03]"
              >
                My Listings
                <ArrowUpRight size={18} />
              </Link>

              <Link
                href="/my-bookings"
                className="flex items-center justify-between rounded-xl border border-white/10 p-4 transition hover:bg-white/[0.03]"
              >
                My Bookings
                <ArrowUpRight size={18} />
              </Link>

              <Link
                href="/profile"
                className="flex items-center justify-between rounded-xl border border-white/10 p-4 transition hover:bg-white/[0.03]"
              >
                Profile Settings
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}