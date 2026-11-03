"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  Building2,
  DollarSign,
  ImageIcon,
  MapPin,
  Save,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { toast } from "sonner";

export interface EditableStudio {
  _id: string;
  name: string;
  email: string;
  location?: string;
  category?: string;
  hourlyRate?: number | string;
  securityDeposit?: number | string;
  maxCapacity?: number | string;
  image?: string;
  description?: string;
  amenities?: string | string[];
}

interface UpdateStudioModalProps {
  studio: EditableStudio;
  updateEndpoint?: string;
  onClose: () => void;
  onUpdated: (studio: EditableStudio) => void;
}

const categories = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Sound Stage",
];

const amenityOptions = [
  "WiFi",
  "Parking",
  "Lighting",
  "AC",
  "Green Room",
  "Soundproofing",
  "Makeup Room",
  "Equipment",
];

export default function UpdateStudioModal({
  studio,
  updateEndpoint = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/listing/${encodeURIComponent(studio._id)}`,
  onClose,
  onUpdated,
}: UpdateStudioModalProps) {
  const currentAmenities = Array.isArray(studio.amenities)
    ? studio.amenities
    : (studio.amenities || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

  const [form, setForm] = useState({
    name: studio.name || "",
    category: studio.category || "",
    maxCapacity: String(studio.maxCapacity ?? ""),
    hourlyRate: String(studio.hourlyRate ?? ""),
    securityDeposit: String(studio.securityDeposit ?? ""),
    location: studio.location || "",
    image: studio.image || "",
    description: studio.description || "",
  });
  const [amenities, setAmenities] = useState<string[]>(currentAmenities);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const updateField = (
    field: keyof typeof form,
    value: (typeof form)[keyof typeof form]
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const toggleAmenity = (amenity: string) => {
    setAmenities((current) =>
      current.includes(amenity)
        ? current.filter((item) => item !== amenity)
        : [...current, amenity]
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);

    const { _id, ...studioFields } = studio;
    const updatedStudio = {
      ...studioFields,
      ...form,
      hourlyRate: Number(form.hourlyRate),
      securityDeposit: Number(form.securityDeposit),
      maxCapacity: Number(form.maxCapacity),
      amenities,
      email: studio.email,
      _id,
    };

    try {
      const response = await fetch(
        updateEndpoint,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...studioFields,
            ...form,
            hourlyRate: Number(form.hourlyRate),
            securityDeposit: Number(form.securityDeposit),
            maxCapacity: Number(form.maxCapacity),
            amenities,
            email: studio.email,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Unable to update listing");
      }

      await response.json().catch(() => null);
      toast.success(`${form.name} was updated successfully.`);
      onUpdated(updatedStudio);
    } catch (error) {
      console.error(error);
      toast.error("Could not update this listing. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-black/80 p-3 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !saving) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="update-studio-title"
        className="my-auto w-full max-w-4xl rounded-[28px] border border-white/10 bg-[#111111] shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-white/10 px-5 py-5 sm:px-8">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-500">
              Listing editor
            </p>
            <h2 id="update-studio-title" className="mt-2 text-2xl font-semibold">
              Update {studio.name}
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close update form"
            onClick={onClose}
            disabled={saving}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 hover:bg-white/[0.06] hover:text-white disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5 p-5 sm:grid-cols-2 sm:p-8">
          <label className="sm:col-span-2">
            <span className="mb-2 block text-sm text-zinc-300">Studio title</span>
            <div className="relative">
              <Building2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input value={form.name} onChange={(event) => updateField("name", event.target.value)} placeholder={studio.name || "Enter studio title"} required className="h-12 w-full rounded-xl border border-white/10 bg-black pl-11 pr-4 outline-none focus:border-white/30" />
            </div>
          </label>

          <label>
            <span className="mb-2 block text-sm text-zinc-300">Category</span>
            <select value={form.category} onChange={(event) => updateField("category", event.target.value)} required className="h-12 w-full rounded-xl border border-white/10 bg-black px-4 outline-none focus:border-white/30">
              <option value="">Select category</option>
              {categories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
          </label>

          <label>
            <span className="mb-2 block text-sm text-zinc-300">Maximum capacity</span>
            <div className="relative">
              <Users size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input type="number" min="1" value={form.maxCapacity} onChange={(event) => updateField("maxCapacity", event.target.value)} placeholder={String(studio.maxCapacity ?? "e.g. 20")} required className="h-12 w-full rounded-xl border border-white/10 bg-black pl-11 pr-4 outline-none focus:border-white/30" />
            </div>
          </label>

          <label>
            <span className="mb-2 block text-sm text-zinc-300">Hourly rate ($)</span>
            <div className="relative">
              <DollarSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input type="number" min="0" value={form.hourlyRate} onChange={(event) => updateField("hourlyRate", event.target.value)} placeholder={String(studio.hourlyRate ?? "e.g. 67")} required className="h-12 w-full rounded-xl border border-white/10 bg-black pl-11 pr-4 outline-none focus:border-white/30" />
            </div>
          </label>

          <label>
            <span className="mb-2 block text-sm text-zinc-300">Security deposit ($)</span>
            <div className="relative">
              <Wallet size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input type="number" min="0" value={form.securityDeposit} onChange={(event) => updateField("securityDeposit", event.target.value)} placeholder={String(studio.securityDeposit ?? "e.g. 100")} required className="h-12 w-full rounded-xl border border-white/10 bg-black pl-11 pr-4 outline-none focus:border-white/30" />
            </div>
          </label>

          <label className="sm:col-span-2">
            <span className="mb-2 block text-sm text-zinc-300">Location / full address</span>
            <div className="relative">
              <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input value={form.location} onChange={(event) => updateField("location", event.target.value)} placeholder={studio.location || "Enter full studio address"} required className="h-12 w-full rounded-xl border border-white/10 bg-black pl-11 pr-4 outline-none focus:border-white/30" />
            </div>
          </label>

          <label className="sm:col-span-2">
            <span className="mb-2 block text-sm text-zinc-300">Studio image URL</span>
            <div className="relative">
              <ImageIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input type="url" value={form.image} onChange={(event) => updateField("image", event.target.value)} placeholder={studio.image || "https://your-image.com/studio.jpg"} required className="h-12 w-full rounded-xl border border-white/10 bg-black pl-11 pr-4 outline-none focus:border-white/30" />
            </div>
          </label>

          <fieldset className="sm:col-span-2">
            <legend className="mb-3 text-sm text-zinc-300">Amenities</legend>
            <div className="flex flex-wrap gap-2">
              {amenityOptions.map((amenity) => (
                <button key={amenity} type="button" onClick={() => toggleAmenity(amenity)} aria-pressed={amenities.includes(amenity)} className={`rounded-full border px-4 py-2 text-sm ${amenities.includes(amenity) ? "border-white bg-white text-black" : "border-white/10 bg-black text-zinc-400 hover:border-white/30 hover:text-white"}`}>
                  {amenities.includes(amenity) ? "✓ " : "+ "}{amenity}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="sm:col-span-2">
            <span className="mb-2 block text-sm text-zinc-300">Detailed overview</span>
            <textarea rows={5} value={form.description} onChange={(event) => updateField("description", event.target.value)} placeholder={studio.description || "Describe your studio, equipment, facilities and environment..."} required className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-white/30" />
          </label>

          <div className="flex gap-3 sm:col-span-2 sm:justify-end">
            <button type="button" onClick={onClose} disabled={saving} className="h-12 rounded-xl border border-white/10 px-6 text-sm font-medium text-zinc-300 hover:bg-white/[0.05] disabled:opacity-50">Cancel</button>
            <button type="submit" disabled={saving} className="flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-7 text-sm font-semibold text-black hover:bg-zinc-200 disabled:opacity-50">
              <Save size={17} />
              {saving ? "Saving changes..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
