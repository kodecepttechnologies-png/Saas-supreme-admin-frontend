import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginFormData } from "../schemas/login.schema";
import { useLogin } from "../hooks/useLogin";
import { useAuth } from "../hooks/AuthContext";

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-11 pr-4 text-[15px] text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#5e94db] focus:ring-4 focus:ring-[#5e94db]/15";
const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";
const errorClass = "mt-1.5 text-sm text-red-600";
const iconClass =
  "pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const loginMutation = useLogin();

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>

        <div className="relative">
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 7.5 12 13l9-5.5M4.5 5.5h15A1.5 1.5 0 0 1 21 7v10a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17V7a1.5 1.5 0 0 1 1.5-1.5Z"
            />
          </svg>

          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
            className={inputClass}
            placeholder="admin@example.com"
          />
        </div>

        {errors.email && (
          <p id="email-error" className={errorClass}>
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password" className={labelClass}>
          Password
        </label>

        <div className="relative">
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 10.5V8a4.5 4.5 0 1 1 9 0v2.5M6 10.5h12a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 19v-7A1.5 1.5 0 0 1 6 10.5Z"
            />
          </svg>

          <input
            id="password"
            type="password"
            autoComplete="current-password"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
            {...register("password")}
            className={inputClass}
            placeholder="••••••••"
          />
        </div>

        {errors.password && (
          <p id="password-error" className={errorClass}>
            {errors.password.message}
          </p>
        )}
      </div>

      {loginMutation.isError && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          Unable to login. Please check your credentials.
        </p>
      )}

      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="w-full rounded-lg bg-[#5e94db] px-4 py-3 font-semibold text-white shadow-sm shadow-[#5e94db]/30 transition hover:bg-[#4d83ca] focus:outline-none focus:ring-4 focus:ring-[#5e94db]/25 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loginMutation.isPending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
};