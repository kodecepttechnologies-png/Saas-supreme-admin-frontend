import { Link } from "react-router-dom";

import { LoginForm } from "../components/LoginForm";

export const LoginPage = () => {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="hidden bg-[#5e94db] lg:flex lg:flex-col lg:justify-center lg:px-16 xl:px-24">
          <div className="max-w-lg">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
              Supreme Admin
            </p>

            <h1 className="text-5xl font-bold leading-tight text-white">
              Manage your platform from one place.
            </h1>

            <p className="mt-6 text-lg leading-8 text-white/80">
              Monitor organizations, manage platform operations,
              and keep everything under control.
            </p>
          </div>
        </section>

        <section className="flex items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <div className="mb-5 inline-flex rounded-2xl bg-[#DBA55E]/10 px-4 py-2">
                <span className="font-bold text-[#DBA55E]">
                  SA
                </span>
              </div>

              <h2 className="text-3xl font-bold text-slate-900">
                Welcome back
              </h2>

              <p className="mt-2 text-slate-500">
                Sign in to your Supreme Admin account.
              </p>
            </div>

            <LoginForm />

            <p className="mt-6 text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-[#5e94db] hover:underline"
              >
                Create one
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};