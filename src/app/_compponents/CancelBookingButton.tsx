"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

interface CancelBookingButtonProps {
  bookingId: string;
  onCancelled: (bookingId: string) => void;
}

export default function CancelBookingButton({
  bookingId,
  onCancelled,
}: CancelBookingButtonProps) {
  const [cancelling, setCancelling] = useState(false);

  const cancelBooking = async () => {
    setCancelling(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/mybooking/${bookingId}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Unable to cancel booking");

      onCancelled(bookingId);
      toast.success("Booking cancelled successfully.");
    } catch {
      toast.error("Could not cancel this booking.");
    } finally {
      setCancelling(false);
    }
  };

  return (
    <button
      type="button"
      disabled={cancelling}
      onClick={() => void cancelBooking()}
      className="flex h-11 items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 text-sm font-medium text-red-400 hover:bg-red-500/15 disabled:opacity-50"
    >
      <X size={16} />
      {cancelling ? "Cancelling..." : "Cancel Booking"}
    </button>
  );
}
