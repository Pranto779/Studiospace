"use client";

import { Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteStudioModalProps {
  studio: {
    _id: string;
    name: string;
  };
  onClose: () => void;
  onDeleted: (studioId: string) => void;
}

export default function DeleteStudioModal({
  studio,
  onClose,
  onDeleted,
}: DeleteStudioModalProps) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/listing/${studio._id}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Unable to delete listing");

      toast.success(`${studio.name} was deleted successfully.`);
      onDeleted(studio._id);
    } catch {
      toast.error("Could not delete this listing. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-listing-title"
        className="w-full max-w-md rounded-[28px] border border-white/10 bg-[#151515] p-6 shadow-2xl sm:p-7"
      >
        <div className="flex items-start justify-between gap-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400">
            <Trash2 size={22} />
          </div>
          <button
            type="button"
            aria-label="Close delete confirmation"
            onClick={onClose}
            disabled={deleting}
            className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-500 transition hover:bg-white/[0.06] hover:text-white disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        <h2 id="delete-listing-title" className="mt-6 text-2xl font-semibold">
          Delete this listing?
        </h2>
        <p className="mt-3 text-sm leading-7 text-zinc-400">
          <span className="font-medium text-white">{studio.name}</span>{" "}
          will be permanently removed from StudioSpace. This action cannot
          be undone.
        </p>

        <div className="mt-7 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="h-12 rounded-xl border border-white/10 text-sm font-medium text-zinc-300 transition hover:bg-white/[0.05] disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => void handleDelete()}
            disabled={deleting}
            className="h-12 rounded-xl bg-red-500 text-sm font-semibold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete listing"}
          </button>
        </div>
      </div>
    </div>
  );
}
