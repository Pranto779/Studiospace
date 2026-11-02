"use client";

import { Pencil } from "lucide-react";
import { useState } from "react";
import type { Booking } from "./BookingCard";
import CancelBookingButton from "./CancelBookingButton";
import EditBookingModal from "./EditBookingModal";

interface BookingActionsProps {
  booking: Booking;
  onCancelled: (bookingId: string) => void;
  onUpdated: (booking: Booking) => void;
}

export default function BookingActions({
  booking,
  onCancelled,
  onUpdated,
}: BookingActionsProps) {
  const [editing, setEditing] = useState(false);

  if (booking.status !== "Pending" && booking.status !== "Confirmed") {
    return null;
  }

  return (
    <>
      <div className="flex flex-wrap justify-end gap-2">
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm font-medium text-white hover:bg-white/[0.08]"
        >
          <Pencil size={16} />
          Edit
        </button>
        <CancelBookingButton
          bookingId={booking._id}
          onCancelled={onCancelled}
        />
      </div>

      {editing && (
        <EditBookingModal
          booking={booking}
          onClose={() => setEditing(false)}
          onUpdated={(updatedBooking) => {
            onUpdated(updatedBooking);
            setEditing(false);
          }}
        />
      )}
    </>
  );
}
