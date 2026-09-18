export const OrganizationSkeleton = () => {
  return (
    <main className="p-5 sm:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 animate-pulse">
          <div className="h-8 w-48 rounded bg-slate-200" />
          <div className="mt-3 h-4 w-72 rounded bg-slate-200" />
        </div>

        {/* Toolbar */}
        <div className="mb-6 flex flex-col gap-3 lg:flex-row">
          <div className="h-11 w-full rounded-lg bg-slate-200 lg:flex-1" />
          <div className="h-11 w-full rounded-lg bg-slate-200 lg:w-40" />
          <div className="h-11 w-full rounded-lg bg-slate-200 lg:w-48" />
        </div>

        {/* Desktop */}
        <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white lg:block">
          <div className="animate-pulse">
            <div className="h-14 border-b border-slate-200 bg-slate-50" />

            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex h-16 items-center gap-8 border-b border-slate-100 px-6"
              >
                <div className="h-4 w-48 rounded bg-slate-200" />
                <div className="h-6 w-20 rounded-full bg-slate-200" />
                <div className="ml-auto h-4 w-28 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="space-y-4 lg:hidden">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex justify-between gap-4">
                <div>
                  <div className="h-5 w-40 rounded bg-slate-200" />
                  <div className="mt-2 h-3 w-24 rounded bg-slate-200" />
                </div>

                <div className="h-6 w-20 rounded-full bg-slate-200" />
              </div>

              <div className="mt-6 space-y-3">
                <div className="h-4 w-full rounded bg-slate-200" />
                <div className="h-4 w-3/4 rounded bg-slate-200" />
              </div>

              <div className="mt-5 h-10 rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};