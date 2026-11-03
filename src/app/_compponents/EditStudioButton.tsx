"use client";

import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import UpdateStudioModal, {
  EditableStudio,
} from "./UpdateStudioModal";

interface EditStudioButtonProps {
  studio: EditableStudio;
}

export default function EditStudioButton({ studio }: EditStudioButtonProps) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-black"
      >
        <Pencil size={17} />
        Edit Studio
      </button>

      {editing && (
        <UpdateStudioModal
          studio={studio}
          updateEndpoint={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/studios/${encodeURIComponent(studio._id)}`}
          onClose={() => setEditing(false)}
          onUpdated={() => router.push("/my-listings")}
        />
      )}
    </>
  );
}
