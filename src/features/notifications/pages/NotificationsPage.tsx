export const NotificationsPage = () => {
  return (
    <main className="p-5 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Notifications
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Stay updated with important system notifications.
            </p>
          </div>

          {/* Mock notification */}
          <div className="rounded-xl border border-slate-200 p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#5e94db]/10 text-[#5e94db]">
                🔔
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  New organization registered
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  A new organization has been registered on the
                  platform.
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  Just now
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-8 text-center">
            <p className="text-sm text-slate-500">
              More notifications will appear here.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};