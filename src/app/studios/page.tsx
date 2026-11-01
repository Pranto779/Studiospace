import React from "react";
import StudiosPage from "../_compponents/Studios";

const Studio = async ({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) => {
  const { category } = await searchParams;

  const res = await fetch(
    category
      ? `http://localhost:8000/studios?category=${encodeURIComponent(category)}`
      : "http://localhost:8000/studios",
    { cache: "no-store" }
  );

  const data = await res.json();

  return <StudiosPage studios={data} />;
};

export default Studio;