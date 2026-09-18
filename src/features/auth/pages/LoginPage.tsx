import { Link } from "react-router-dom";

import { LoginForm } from "../components/LoginForm";

export const LoginPage = () => {
  return (
    <main className="min-h-screen bg-[#F7F8FA] bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.06)_1px,transparent_0)] bg-size-[26px_26px]">
      {/* Brand strip shown only on mobile/tablet, where the hero panel is hidden */}
      <div className="flex items-center gap-3 border-b border-slate-200 bg-[#0B1220] px-5 py-4 lg:hidden">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-sm font-bold text-[#DBA55E]">
          SA
        </span>
        <div>
          <p className="text-sm font-semibold text-white">Supreme Admin</p>
          <p className="text-xs text-white/60">Platform control center</p>
        </div>
      </div>

      <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
        <section className="relative hidden overflow-hidden bg-[#0B1220] lg:flex lg:flex-col lg:justify-between lg:px-16 lg:py-14 xl:px-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.14)_1px,transparent_0)] bg-size-[22px_22px] opacity-60"
          />

          <div className="relative flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-sm font-bold text-[#DBA55E]">
              SA
            </span>
            <span className="text-sm font-semibold tracking-wide text-white/80">
              Supreme Admin
            </span>
          </div>

          <div className="relative max-w-lg">
            <h1 className="text-4xl font-semibold leading-tight text-white xl:text-5xl">
              Every organization on your platform, in one console.
            </h1>

            <div className="mt-5 h-px w-16 bg-[#DBA55E]" />

            <p className="mt-5 text-lg leading-8 text-white/70">
              Monitor organizations, review activity, and keep the whole
              platform running smoothly from a single dashboard.
            </p>
          </div>

          <svg viewBox="0 0 220 160" className="relative h-auto w-56" fill="none" aria-hidden="true">
            <g stroke="rgba(255,255,255,0.25)" strokeWidth="1.5">
              <line x1="34" y1="118" x2="82" y2="56" />
              <line x1="82" y1="56" x2="140" y2="40" />
              <line x1="140" y1="40" x2="188" y2="84" />
              <line x1="82" y1="56" x2="118" y2="122" />
              <line x1="118" y1="122" x2="188" y2="84" />
            </g>
            <circle cx="34" cy="118" r="5" fill="#DBA55E" />
            <circle cx="82" cy="56" r="5" fill="#fff" fillOpacity="0.85" />
            <circle cx="140" cy="40" r="5" fill="#fff" fillOpacity="0.85" />
            <circle cx="188" cy="84" r="5" fill="#DBA55E" className="motion-safe:animate-pulse" />
            <circle cx="118" cy="122" r="5" fill="#fff" fillOpacity="0.85" />
          </svg>
        </section>

        <section className="flex items-center justify-center px-5 py-10 sm:px-8 lg:py-14">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h2 className="text-3xl font-semibold text-slate-900">Welcome back</h2>

              <p className="mt-2 text-slate-500">
                Sign in to your Supreme Admin account.
              </p>
            </div>

            <LoginForm />

            <p className="mt-6 text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link to="/register" className="font-semibold text-[#5e94db] hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};