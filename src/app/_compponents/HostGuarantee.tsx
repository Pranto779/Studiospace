"use client";

import {
  ShieldCheck,
  BadgeCheck,
  Camera,
  Headphones,
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
    <section className="bg-[#080808] py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">
            Host Guarantee & Support
          </p>

          <h2 className="text-4xl font-semibold tracking-[-1px] md:text-5xl">
            Protection built for
            <span className="font-light text-zinc-500">
              {" "}creators and hosts.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-zinc-400">
            StudioSpace helps creators work confidently with trusted hosts,
            protected bookings and dedicated support every step of the way.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                rounded-[28px]
                border
                border-white/10
                bg-[#111111]
                p-7
                transition-all
                duration-300
                hover:border-white/20
                hover:bg-[#141414]
              "
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  <Icon size={24} />
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-zinc-500">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 rounded-[28px] border border-white/10 bg-[#111111] p-8 text-center">
          <h3 className="text-2xl font-semibold">
            Trusted by creators worldwide
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-zinc-500">
            From photography sessions to large-scale productions,
            StudioSpace provides the tools, protection and support
            needed to focus on creativity.
          </p>
        </div>
      </div>
    </section>
  );
}