"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import BookingStudioPage, {
  BookingStudio,
} from "../../_compponents/BookingStudioPage";
import { authClient } from "@/app/lib/auth-client";

export default function DynamicBookingPage() {
  const params = useParams<{ studioId: string }>();

  const [studio, setStudio] = useState<BookingStudio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStudio = async () => {
      try {
        const { data, error } = await authClient.token();

        if (error || !data?.token) {
          throw new Error("Authentication token unavailable");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/studios/${params.studioId}`,
          {
            cache: "no-store",
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Studio unavailable");
        }

        const result = (await response.json()) as BookingStudio;
        setStudio(result);
      } catch (error) {
        console.error(error);
        toast.error("Could not load this studio.");
      } finally {
        setLoading(false);
      }
    };

    if (params.studioId) {
      void loadStudio();
    }
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
