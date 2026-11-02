export default function PageSkeleton() {
  return (
    <main className="min-h-screen bg-[#080808] px-4 py-12 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="h-4 w-32 rounded bg-white/10" />
        <div className="mt-5 h-12 w-80 max-w-full rounded-xl bg-white/10" />
        <div className="mt-4 h-5 w-full max-w-xl rounded bg-white/[0.06]" />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              <div className="h-52 bg-white/[0.07]" />
              <div className="space-y-3 p-5">
                <div className="h-5 w-3/4 rounded bg-white/10" />
                <div className="h-4 w-1/2 rounded bg-white/[0.06]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
