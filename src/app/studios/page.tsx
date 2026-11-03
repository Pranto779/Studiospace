import React from "react";
import StudiosPage from "../_compponents/Studios";

const Studio = async ({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) => {
  const { category } = await searchParams;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/studios?category=${encodeURIComponent(category || "")}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  return (
    <div className="min-h-screen bg-[#080808] px-6 py-12 text-white">
      <div className="mx-auto mb-10 max-w-7xl">
        <p className="mb-3 text-sm uppercase tracking-[0.25em] text-zinc-500">
          Discover Spaces
        </p>

        <h1 className="text-4xl font-semibold md:text-5xl">
          Explore Studios
        </h1>

        <p className="mt-4 max-w-2xl text-zinc-400">
          Browse premium creative spaces for photography, filmmaking,
          podcasting and music production.
        </p>
      </div>

      <div className="mx-auto max-w-7xl">
        {data.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-white/10 text-center">
            <h2 className="text-2xl font-semibold">No Studios Found</h2>
            <p className="mt-2 text-zinc-400">
              No studios available in this category.
            </p>
          </div>
        ) : (
          <StudiosPage studios={data} />
        )}
      </div>
    </div>
  );
};

export default Studio;
