"use client";

import Link from "next/link";
import {
  Aperture,
  ArrowRight,
  Camera,
  Film,
  Mic2,
  Music4,
  Shield,
  BadgeCheck,
  Clock3,
} from "lucide-react";

export default function AboutPage() {
  const stats = [
    { value: "10K+", label: "Creators" },
    { value: "2K+", label: "Studios" },
    { value: "50K+", label: "Bookings" },
    { value: "99%", label: "Satisfaction Rate" },
  ];

  const services = [
    {
      icon: Camera,
      title: "Photography Studios",
      description:
        "Professional shooting environments equipped for commercial and creative photography.",
    },
    {
      icon: Film,
      title: "Film Production Spaces",
      description:
        "Production-ready stages built for content creators, filmmakers and agencies.",
    },
    {
      icon: Mic2,
      title: "Podcast Lounges",
      description:
        "Acoustically optimized podcast rooms designed for creators and storytellers.",
    },
    {
      icon: Music4,
      title: "Music Suites",
      description:
        "Professional recording setups for musicians, producers and sound engineers.",
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Verified Hosts",
      text: "Every listed workspace goes through verification to ensure trust and reliability.",
    },
    {
      icon: Clock3,
      title: "Instant Booking",
      text: "Book creative spaces quickly with transparent pricing and availability.",
    },
    {
      icon: BadgeCheck,
      title: "Creator Support",
      text: "Dedicated assistance whenever hosts or creators need help.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-white/[0.02] blur-[180px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-white/[0.02] blur-[180px]" />

        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
            <Aperture size={16} />
            <span className="text-xs uppercase tracking-[0.2em] text-zinc-400">
              About StudioSpace
            </span>
          </div>

          <h1 className="max-w-5xl text-5xl font-semibold leading-tight tracking-[-2px] md:text-7xl">
            Built for
            <span className="font-light text-zinc-500">
              {" "}
              creators who think bigger.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
            StudioSpace connects creators with premium workspaces. From
            photography studios to podcast lounges and production spaces,
            everything you need to create extraordinary work exists here.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-zinc-500">
              The Story Behind StudioSpace
            </p>

            <h2 className="text-4xl font-semibold tracking-[-1px]">
              A platform designed for modern creators.
            </h2>

            <p className="mt-6 leading-8 text-zinc-400">
              Finding the perfect creative space should never be complicated.
              StudioSpace was created to simplify how creators discover,
              compare, and book high-quality workspaces.
            </p>

            <p className="mt-5 leading-8 text-zinc-400">
              Whether you&apos;re planning a photo shoot, recording a podcast,
              producing music, or building your next campaign, StudioSpace
              brings creators and hosts together in one ecosystem.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#111111] p-8">
            <h3 className="text-2xl font-semibold">Our Mission</h3>

            <p className="mt-4 leading-8 text-zinc-400">
              Empower creators with easy access to extraordinary creative
              environments.
            </p>

            <div className="mt-8 border-t border-white/10 pt-8">
              <h3 className="text-2xl font-semibold">Our Vision</h3>

              <p className="mt-4 leading-8 text-zinc-400">
                To become the world&apos;s most trusted marketplace for creative
                workspaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10 bg-[#0E0E0E]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-20 md:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label}>
              <h3 className="text-5xl font-semibold text-white">
                {item.value}
              </h3>

              <p className="mt-3 text-sm text-zinc-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-zinc-500">
            What We Offer
          </p>

          <h2 className="text-4xl font-semibold tracking-[-1px]">
            Designed for every creative discipline.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="rounded-3xl border border-white/10 bg-[#111111] p-8 transition-all duration-300 hover:border-white/20 hover:bg-[#161616]"
              >
                <Icon size={30} className="text-zinc-300" />

                <h3 className="mt-6 text-xl font-semibold">
                  {service.title}
                </h3>

                <p className="mt-3 leading-7 text-zinc-500">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-12">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-zinc-500">
            Why Creators Choose Us
          </p>

          <h2 className="text-4xl font-semibold tracking-[-1px]">
            A trusted platform built around creators.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="rounded-3xl border border-white/10 bg-[#111111] p-8"
              >
                <Icon size={28} className="text-zinc-300" />

                <h3 className="mt-5 text-xl font-semibold">
                  {benefit.title}
                </h3>

                <p className="mt-3 leading-7 text-zinc-500">
                  {benefit.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <h2 className="text-5xl font-semibold tracking-[-2px]">
            Your next creative project starts here.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-zinc-400">
            Discover inspiring workspaces, connect with trusted hosts and bring
            your ideas to life.
          </p>

          <Link
            href="/studios"
            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-zinc-200"
          >
            Explore Studios
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}