"use client";

import {
  ShieldCheck,
  BadgeCheck,
  Camera,
  Headphones,
  ArrowUpRight,
} from "lucide-react";

export default function HostGuarantee() {
  const items = [
    {
      icon: ShieldCheck,
      title: "Liability Protection",
      description:
        "Book creative workspaces with confidence through platform-backed protection and secure booking processes.",
    },
    {
      icon: BadgeCheck,
      title: "Verified Profiles",
      description:
        "Every host and creator profile is reviewed to help build a trusted studio-sharing community.",
    },
    {
      icon: Camera,
      title: "Equipment Safety",
      description:
        "Professional spaces designed to help creators operate safely while protecting valuable equipment.",
    },
    {
      icon: Headphones,
      title: "24/7 Creator Support",
      description:
        "Our support team is available around the clock to assist with bookings, hosts and workspace issues.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#080808] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-32">
      <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-white/[0.025] blur-[140px]" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 sm:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-zinc-500 sm:text-xs">
              Host Guarantee & Support
            </p>
            <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              Protection built for
              <span className="block font-light text-zinc-500">
                creators and hosts.
              </span>
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-zinc-400 sm:text-base lg:pb-1">
            StudioSpace helps creators work confidently with trusted hosts,
            protected bookings and dedicated support every step of the way.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group relative min-h-72 overflow-hidden rounded-[26px] border border-white/10 bg-[#111111] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_24px_70px_rgba(0,0,0,0.35)] sm:p-7"
              >
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/[0.09] to-transparent" />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] shadow-[0_12px_35px_rgba(0,0,0,0.25)] backdrop-blur-md transition duration-500 group-hover:rotate-3 group-hover:scale-105">
                  <Icon size={24} />
                </div>

                <h3 className="relative mt-8 text-xl font-semibold sm:text-2xl">
                  {item.title}
                </h3>

                <p className="relative mt-3 text-sm leading-7 text-zinc-400">
                  {item.description}
                </p>

                <ArrowUpRight
                  size={18}
                  className="absolute bottom-6 right-6 text-zinc-600 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
                />
              </div>
            );
          })}
        </div>

        <div className="mt-5 overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-r from-[#171717] via-[#111111] to-[#171717] p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                The StudioSpace promise
              </p>
              <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">
                Trusted by creators worldwide
              </h3>
            </div>
            <p className="max-w-xl text-sm leading-7 text-zinc-400">
              From focused photo sessions to large-scale productions, create with
              the confidence that your space and team are protected.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}