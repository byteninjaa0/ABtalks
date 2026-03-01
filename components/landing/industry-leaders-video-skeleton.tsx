export function IndustryLeadersVideoSkeleton() {
  return (
    <section
      id="industry-videos"
      className="border-t border-slate-800/60 px-4 py-20 md:py-24"
      aria-busy="true"
      aria-label="Industry leaders videos loading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="h-4 w-64 animate-pulse rounded bg-slate-800 mx-auto" />
        <div className="mt-8 h-9 w-80 animate-pulse rounded bg-slate-800 mx-auto" />
        <div className="mx-auto mt-4 h-5 max-w-md animate-pulse rounded bg-slate-800" />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/40"
            >
              <div className="aspect-video w-full animate-pulse bg-slate-800" />
              <div className="space-y-3 p-5">
                <div className="h-5 w-full animate-pulse rounded bg-slate-800" />
                <div className="h-5 w-3/4 animate-pulse rounded bg-slate-800" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-slate-800" />
                <div className="h-4 w-32 animate-pulse rounded bg-slate-800" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <div className="h-12 w-56 animate-pulse rounded-xl bg-slate-800" />
        </div>
      </div>
    </section>
  );
}
