import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginFormData } from "../schemas/login.schema";
import { useLogin } from "../hooks/useLogin";
import { useAuth } from "../hooks/AuthContext";

/* ── Inline SVG icons ── */
const EmailIcon = () => (
  <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 7 10-7" />
  </svg>
);

const LockIcon = () => (
  <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const inputBase =
  "w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm text-gray-900 placeholder-slate-400 outline-none transition focus:ring-2";

const inputNormal = `${inputBase} border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20`;
const inputError  = `${inputBase} border-red-400 focus:border-red-500 focus:ring-red-500/20`;

export const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginMutation.mutateAsync(data);
      setUser(response.user);
      navigate("/dashboard");
    } catch {
      // We'll replace this with a reusable API error system.
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Email */}
      <div>
        <label htmlFor="login-email" className="mb-1.5 block text-sm font-medium text-gray-700">
          Email
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
            <EmailIcon />
          </span>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            {...register("email")}
            className={errors.email ? inputError : inputNormal}
            placeholder="you@example.com"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="login-password" className="mb-1.5 block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
            <LockIcon />
          </span>
          <input
            id="login-password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            {...register("password")}
            className={`${errors.password ? inputError : inputNormal} pr-10`}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600 transition"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Remember me + Forgot password */}
      <div className="flex items-center justify-between">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600 select-none">
          <input
            type="checkbox"
            id="remember-me"
            className="h-4 w-4 rounded border-gray-300 bg-white accent-indigo-600"
          />
          Remember me
        </label>
        <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition">
          Forgot password?
        </a>
      </div>

      {/* API error */}
      {loginMutation.isError && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 border border-red-200">
          Unable to login. Please check your credentials.
        </p>
      )}

      {/* Submit */}
      <button
        id="login-submit"
        type="submit"
        disabled={loginMutation.isPending}
        className="group relative w-full overflow-hidden rounded-xl px-4 py-3.5 font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
        style={{
          background: "linear-gradient(135deg, #6366F1 0%, #4338CA 100%)",
          boxShadow: "0 4px 24px rgba(99,102,241,0.35)",
        }}
      >
        <span className="relative flex items-center justify-center gap-2">
          {loginMutation.isPending ? "Signing in…" : "Sign In"}
          {!loginMutation.isPending && (
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          )}
        </span>
      </button>
    </form>
  );
};