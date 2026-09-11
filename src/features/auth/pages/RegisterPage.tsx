import { Link } from "react-router-dom";

import { RegisterForm } from "../components/RegisterForm";

export const RegisterPage = () => {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-xl">
          <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-10">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 inline-flex rounded-2xl bg-[#5e94db]/10 px-4 py-2">
                <span className="font-bold text-[#5e94db]">
                  SA
                </span>
              </div>

              <h1 className="text-3xl font-bold text-slate-900">
                Create Supreme Admin
              </h1>

              <p className="mt-2 text-slate-500">
                Create your platform administrator account.
              </p>
            </div>

            <RegisterForm />

            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#5e94db] hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};