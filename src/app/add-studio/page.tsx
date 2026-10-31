"use client";

import { useState } from "react";
import {
  Aperture,
  Upload,
  DollarSign,
  MapPin,
  ImageIcon,
  Building2,
  FileText,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Camera,
} from "lucide-react";
import { toast } from "sonner";

export default function AddStudioPage() {
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const studioData = Object.fromEntries(formData.entries());

    console.log(studioData);

    toast.success("Studio submitted successfully.");
  };

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        {/* Hero */}
        <div className="mb-10 overflow-hidden rounded-[32px] border border-white/10 bg-[#111111] p-8 md:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
            <Aperture size={16} />
            <span className="text-xs uppercase tracking-[0.25em] text-zinc-400">
              Studio Hosting
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-[-1px] md:text-6xl">
            Share your creative
            <span className="font-light text-zinc-500">
              {" "}space with creators.
            </span>
          </h1>

          <p className="mt-5 max-w-3xl leading-8 text-zinc-400">
            List your workspace on StudioSpace and connect with
            photographers, filmmakers, podcasters and music producers
            looking for professional creative environments.
          </p>
        </div>

        {/* Layout */}
        <div className="grid gap-8 lg:grid-cols-[0.9fr,1.5fr]">
          {/* Left Side */}
          <div className="space-y-6">
            <div className="rounded-[28px] border border-white/10 bg-[#111111] p-7">
              <h2 className="text-2xl font-semibold">
                Before You Publish
              </h2>

              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <Camera
                    size={20}
                    className="mt-1 text-zinc-400"
                  />

                  <div>
                    <h3 className="font-medium">
                      High Quality Photos
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-zinc-500">
                      Showcase your lighting, equipment and
                      creative environment clearly.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <DollarSign
                    size={20}
                    className="mt-1 text-zinc-400"
                  />

                  <div>
                    <h3 className="font-medium">
                      Accurate Pricing
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-zinc-500">
                      Set transparent hourly rates for a
                      better booking experience.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <ShieldCheck
                    size={20}
                    className="mt-1 text-zinc-400"
                  />

                  <div>
                    <h3 className="font-medium">
                      Creator Friendly
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-zinc-500">
                      Include equipment, parking, Wi‑Fi and
                      amenities creators need.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[#111111] p-7">
              <div className="flex items-center gap-2">
                <Sparkles size={18} />
                <h3 className="font-semibold">
                  Hosting Benefits
                </h3>
              </div>

              <div className="mt-5 space-y-3 text-sm text-zinc-400">
                <p>✓ Reach thousands of creators</p>
                <p>✓ Manage bookings easily</p>
                <p>✓ Showcase your workspace</p>
                <p>✓ Earn from unused studio time</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-[32px] border border-white/10 bg-[#111111] p-8 md:p-10"
          >
            <div className="grid gap-6 md:grid-cols-2">
              {/* Studio Name */}
              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Studio Name
                </label>

                <div className="relative">
                  <Building2
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                  />

                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Luxury Content Studio"
                    className="h-12 w-full rounded-xl border border-white/10 bg-black pl-11 pr-4 outline-none focus:border-white/30"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  name="category"
                  required
                  className="h-12 w-full rounded-xl border border-white/10 bg-black px-4 outline-none focus:border-white/30"
                >
                  <option value="">Select Category</option>
                  <option>Photo Studio</option>
                  <option>Sound Stage</option>
                  <option>Podcast Room</option>
                  <option>Music Suite</option>
                  <option>Art Workshop</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Location
                </label>

                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                  />

                  <input
                    name="location"
                    required
                    type="text"
                    placeholder="Dhaka, Bangladesh"
                    className="h-12 w-full rounded-xl border border-white/10 bg-black pl-11 pr-4 outline-none focus:border-white/30"
                  />
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Hourly Rate ($)
                </label>

                <div className="relative">
                  <DollarSign
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                  />

                  <input
                    name="hourlyRate"
                    type="number"
                    required
                    placeholder="50"
                    className="h-12 w-full rounded-xl border border-white/10 bg-black pl-11 pr-4 outline-none focus:border-white/30"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm text-zinc-300">
                  Studio Image URL
                </label>

                <div className="relative">
                  <ImageIcon
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                  />

                  <input
                    name="image"
                    type="url"
                    required
                    placeholder="https://your-image.com"
                    className="h-12 w-full rounded-xl border border-white/10 bg-black pl-11 pr-4 outline-none focus:border-white/30"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm text-zinc-300">
                  Description
                </label>

                <div className="relative">
                  <FileText
                    size={18}
                    className="absolute left-4 top-4 text-zinc-500"
                  />

                  <textarea
                    rows={6}
                    name="description"
                    required
                    placeholder="Describe your studio, equipment, facilities and environment..."
                    className="w-full rounded-xl border border-white/10 bg-black pl-11 pr-4 pt-4 outline-none focus:border-white/30"
                  />
                </div>
              </div>

              {/* Amenities */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm text-zinc-300">
                  Amenities
                </label>

                <input
                  name="amenities"
                  placeholder="WiFi, Parking, Lighting, AC, Green Room"
                  className="h-12 w-full rounded-xl border border-white/10 bg-black px-4 outline-none focus:border-white/30"
                />
              </div>
            </div>

            {/* Upload Area */}
            <div className="mt-8 rounded-3xl border border-dashed border-white/10 bg-black/40 p-10 text-center transition hover:border-white/20">
              <Upload
                size={34}
                className="mx-auto mb-4 text-zinc-500"
              />

              <h3 className="text-lg font-medium">
                Upload Studio Images
              </h3>

              <p className="mt-2 text-sm text-zinc-500">
                Drag & drop studio photos or upload directly.
              </p>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="group mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-white font-semibold text-black transition hover:bg-zinc-200"
            >
              Publish Studio

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}