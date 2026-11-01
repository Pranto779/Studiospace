"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BookingRoutePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/studios");
  }, [router]);

  return null;
}
