"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import BookingStudioPage, { BookingStudio } from "../../_compponents/BookingStudioPage";

export default function DynamicBookingPage() {
  const params = useParams<{ studioId: string }>();
  const [studio, setStudio] = useState<BookingStudio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStudio = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/studios/${params.studioId}`,
          { cache: "no-store" }
        );

        if (!response.ok) throw new Error("Studio unavailable");
        setStudio((await response.json()) as BookingStudio);
      } catch {
        toast.error("Could not load this studio.");
      } finally {
        setLoading(false);
      }
    };

    if (params.studioId) void loadStudio();
  }, [params.studioId]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080808] text-white">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </main>
    );
  }

  return <BookingStudioPage studio={studio} />;
}
