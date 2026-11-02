
"use client";

import { useState } from "react";
import {
  Aperture,
  DollarSign,
  MapPin,
  ImageIcon,
  Building2,
  FileText,
  ArrowRight,
  Users,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";


const amenitiesOptions = [
  "WiFi",
  "Parking",
  "Lighting",
  "AC",
  "Green Room",
  "Soundproofing",
  "Makeup Room",
  "Equipment",
];

export default function AddStudioPage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const userEmail = session?.user?.email;

  const [category, setCategory] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAmenityChange = (amenity: string) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();



    if (isPending) {
      toast.error("Please wait while your session loads.");
      return;
    }

    if (!userEmail) {
      toast.error("Please sign in before publishing a studio.");
      router.push("/sign-in");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const studioData = {
      ...Object.fromEntries(formData.entries()),
      category,
      amenities,
      email: userEmail,
      hourlyRate: Number(formData.get("hourlyRate")),
      securityDeposit: Number(formData.get("securityDeposit")),
      maxCapacity: Number(formData.get("maxCapacity")),
    };

    try {
      setLoading(true);

      const res = await fetch("http://localhost:8000/add-studio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify(studioData),
      });

      if (!res.ok) {
        throw new Error("Failed to publish studio");
      }

      await res.json();

      toast.success("Studio published successfully!");

      form.reset();
      setCategory("");
      setAmenities([]);

      router.push("/my-listings");
    } catch (error) {
      console.error(error);
      toast.error("Failed to publish studio.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-5xl rounded-[32px] border border-white/10 bg-[#111111] p-6 md:p-10"
        >
          {/* Hero Section Inside Form */}
          <div className="mb-10 border-b border-white/10 pb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
              <Aperture size={16} />

              <span className="text-xs uppercase tracking-[0.25em] text-zinc-400">
                Studio Hosting
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-[-1px] md:text-6xl">
              Share your creative
              <span className="font-light text-zinc-500">
                {" "}
                space with creators.
              </span>
            </h1>

            <p className="mt-5 max-w-3xl leading-8 text-zinc-400">
              List your workspace on StudioSpace and connect with
              photographers, filmmakers, podcasters and music producers looking
              for professional creative environments.
            </p>
          </div>

          {/* Form Fields */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Studio Title */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-zinc-300">
                Studio Title
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
                  placeholder="Enter Studio Title"
                  className="h-12 w-full rounded-xl border border-white/10 bg-black pl-11 pr-4 outline-none transition focus:border-white/30"
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
                className="h-12 w-full rounded-xl border border-white/10 bg-black px-4 outline-none transition focus:border-white/30"
              >
                <option value="">Select Category</option>
                <option value="Photo Studio">Photo Studio</option>
                <option value="Film Stage">Film Stage</option>
                <option value="Podcast Lounge">Podcast Lounge</option>
                <option value="Music Suite">Music Suite</option>
                <option value="Workshop">Workshop</option>
                <option value="Sound Stage">Sound Stage</option>
              </select>
            </div>

            {/* Maximum Capacity */}
            <div>
              <label className="mb-2 block text-sm text-zinc-300">
                Maximum Capacity
              </label>

              <div className="relative">
                <Users
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  name="maxCapacity"
                  type="number"
                  min="1"
                  required
                  placeholder="e.g. 20 people"
                  className="h-12 w-full rounded-xl border border-white/10 bg-black pl-11 pr-4 outline-none transition focus:border-white/30"
                />
              </div>
            </div>

            {/* Hourly Rate */}
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
                  min="0"
                  required
                  placeholder="e.g. 67"
                  className="h-12 w-full rounded-xl border border-white/10 bg-black pl-11 pr-4 outline-none transition focus:border-white/30"
                />
              </div>
            </div>

            {/* Security Deposit */}
            <div>
              <label className="mb-2 block text-sm text-zinc-300">
                Security Deposit ($)
              </label>

              <div className="relative">
                <Wallet
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  name="securityDeposit"
                  type="number"
                  min="0"
                  required
                  placeholder="e.g. 100"
                  className="h-12 w-full rounded-xl border border-white/10 bg-black pl-11 pr-4 outline-none transition focus:border-white/30"
                />
              </div>
            </div>

            {/* Location */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-zinc-300">
                Location / Full Address
              </label>

              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  name="location"
                  type="text"
                  required
                  placeholder="Enter full studio address"
                  className="h-12 w-full rounded-xl border border-white/10 bg-black pl-11 pr-4 outline-none transition focus:border-white/30"
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
                  className="h-12 w-full rounded-xl border border-white/10 bg-black pl-11 pr-4 outline-none transition focus:border-white/30"
                />
              </div>
            </div>

            {/* Amenities */}
            <div className="md:col-span-2">
              <label className="mb-3 block text-sm text-zinc-300">
                Amenities & Facilities
              </label>

              <div className="flex flex-wrap gap-3">
                {amenitiesOptions.map((amenity) => {
                  const selected = amenities.includes(amenity);

                  return (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => handleAmenityChange(amenity)}
                      aria-pressed={selected}
                      className={`rounded-full border px-4 py-2 text-sm transition ${
                        selected
                          ? "border-white bg-white text-black"
                          : "border-white/10 bg-black text-zinc-400 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {selected ? "✓ " : "+ "}
                      {amenity}
                    </button>
                  );
                })}
              </div>

              <input
                type="hidden"
                name="amenities"
                value={amenities.join(", ")}
              />
            </div>

            {/* Detailed Overview */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-zinc-300">
                Detailed Overview
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
                  className="w-full rounded-xl border border-white/10 bg-black py-4 pl-11 pr-4 outline-none transition focus:border-white/30"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || isPending}
            className="group mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-white font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Publishing..."
              : isPending
                ? "Loading session..."
                : "Publish Studio"}

            {!loading && !isPending && (
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            )}
          </button>
        </form>
      </div>
    </main>
  );
}

