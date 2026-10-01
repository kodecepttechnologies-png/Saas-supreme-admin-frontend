export const PersonalSettingsPage = () => {
  return (
    <main className="p-5 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Personal Settings
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage your personal account settings.
            </p>
          </div>

          {/* Profile */}
          <section className="border-b border-slate-200 pb-8">
            <h2 className="text-lg font-semibold text-slate-900">
              Profile
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your personal account information.
            </p>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Name
                </label>

                <input
                  type="text"
                  value="Super Admin"
                  readOnly
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>

                <input
                  type="email"
                  value="admin@example.com"
                  readOnly
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none"
                />
              </div>
            </div>
          </section>

          {/* Password */}
          <section className="border-b border-slate-200 py-8">
            <h2 className="text-lg font-semibold text-slate-900">
              Password
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Change your account password.
            </p>

            <button
              type="button"
              className="mt-5 rounded-lg bg-[#5e94db] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              Change Password
            </button>
          </section>

          {/* Preferences */}
          <section className="pt-8">
            <h2 className="text-lg font-semibold text-slate-900">
              Preferences
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Personal application preferences.
            </p>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Email Notifications
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Receive important notifications through email.
                  </p>
                </div>

                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 accent-[#5e94db]"
                />
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    System Notifications
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Show notifications inside the dashboard.
                  </p>
                </div>

                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 accent-[#5e94db]"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};