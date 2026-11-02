"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Eye, MapPin, Pencil, Trash2 } from "lucide-react";
import type { EditableStudio } from "./UpdateStudioModal";

export interface ListingStudio extends EditableStudio {
  hourlyRate?: number | string;
}

interface ListingCardProps {
  studio: ListingStudio;
  onUpdate: (studio: ListingStudio) => void;
  onDelete: (studio: ListingStudio) => void;
}

export default function ListingCard({
  studio,
  onUpdate,
  onDelete,
}: ListingCardProps) {
  return (
    <article className="group overflow-hidden rounded-[26px] border border-white/10 bg-[#111111] shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
      <div className="relative h-60 overflow-hidden sm:h-64">
        {studio.image ? (
          <Image
            src={studio.image}
            alt={studio.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[#181818]">
            <Building2 size={42} className="text-zinc-700" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/10 to-transparent" />

        {studio.category && (
          <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 text-[11px] font-medium backdrop-blur-md">
            {studio.category}
          </span>
        )}

        <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-[11px] font-medium text-emerald-300 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Active
        </span>

        <div className="absolute bottom-4 left-5 right-5">
          <h2 className="text-xl font-semibold sm:text-2xl">{studio.name}</h2>
          {studio.location && (
            <p className="mt-2 flex items-center gap-2 text-sm text-zinc-300">
              <MapPin size={15} className="shrink-0" />
              <span className="truncate">{studio.location}</span>
            </p>
          )}
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              Hourly rate
            </p>
            <p className="mt-1 text-3xl font-semibold">
              <span className="text-lg text-zinc-500">$</span>
              {studio.hourlyRate || 0}
              <span className="text-sm font-normal text-zinc-500">/hr</span>
            </p>
          </div>
          <p className="truncate rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-zinc-400">
            {studio.email}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onUpdate(studio)}
            className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] text-sm font-medium text-zinc-200 transition hover:border-white/25 hover:bg-white/[0.08]"
          >
            <Pencil size={16} />
            Update
          </button>
          <button
            type="button"
            onClick={() => onDelete(studio)}
            className="flex h-11 items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.06] text-sm font-medium text-red-400 transition hover:bg-red-500/15"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>

        <Link
          href={`/studios/${studio._id}`}
          className="mt-2 flex h-11 items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-black transition hover:bg-zinc-200"
        >
          <Eye size={17} />
          View Studio
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
