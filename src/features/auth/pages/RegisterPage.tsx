import { Link } from "react-router-dom";

import { RegisterForm } from "../components/RegisterForm";

export const RegisterPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#F7F8FA] bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.06)_1px,transparent_0)] bg-size-[26px_26px]">
      <div className="flex shrink-0 items-center justify-center gap-3 border-b border-slate-200 bg-[#0B1220] px-5 py-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-sm font-bold text-[#DBA55E]">
          SA
        </span>
        <div>
          <p className="text-sm font-semibold text-white">Supreme Admin</p>
          <p className="text-xs text-white/60">Platform control center</p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-xl">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
            <div className="h-1.5 bg-[#DBA55E]" />

            <div className="p-6 sm:p-10">
              <div className="mb-8">
                <h1 className="text-3xl font-semibold text-slate-900">
                  Create Supreme Admin
                </h1>

                <p className="mt-2 text-slate-500">
                  Create your platform administrator account.
                </p>
              </div>

              <RegisterForm />

              <p className="mt-6 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-[#5e94db] hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};