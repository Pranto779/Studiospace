import Link from "next/link";
import { ArrowLeft, Compass, House } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-[#080808] px-5 py-20 text-white">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035] blur-[120px]" />

      <div className="relative w-full max-w-2xl text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
          <Compass size={24} className="text-zinc-300" />
        </div>

        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.32em] text-zinc-500">
          Error 404
        </p>
        <h1 className="mt-4 text-[6rem] font-semibold leading-none tracking-[-0.08em] text-white sm:text-[8rem]">
          404
        </h1>
        <h2 className="mt-5 text-2xl font-semibold sm:text-3xl">
          This studio is off the map
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-zinc-400 sm:text-base">
          The page you are looking for does not exist or may have moved to a
          different location.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            <House size={17} />
            Back to Home
          </Link>
          <Link
            href="/studios"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.05]"
          >
            <ArrowLeft size={17} />
            Explore Studios
          </Link>
        </div>
      </div>
    </main>
  );
}
