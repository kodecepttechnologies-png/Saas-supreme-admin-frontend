import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  type RegisterFormData,
} from "../schemas/register.schema";

import { useRegister } from "../hooks/useRegister";
import { useAuth } from "../hooks/AuthContext";

/* ── Inline SVG icons ── */
const UserIcon = () => (
  <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const EmailIcon = () => (
  <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 7 10-7" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
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

/* ── Field wrapper ── */
const FieldError = ({ msg }: { msg?: string }) =>
  msg ? <p className="mt-1 text-xs text-red-500">{msg}</p> : null;

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const registerMutation = useRegister();
  const [showPassword, setShowPassword]        = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await registerMutation.mutateAsync(data);
      setUser(response.user);
      navigate("/dashboard");
    } catch {
      // Replace with reusable API error handling later.
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* First + Last name */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="reg-firstName" className="mb-1.5 block text-sm font-medium text-gray-700">
            First name
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
              <UserIcon />
            </span>
            <input
              id="reg-firstName"
              {...register("firstName")}
              className={errors.firstName ? inputError : inputNormal}
              placeholder="John"
            />
          </div>
          <FieldError msg={errors.firstName?.message} />
        </div>

        <div>
          <label htmlFor="reg-lastName" className="mb-1.5 block text-sm font-medium text-gray-700">
            Last name
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
              <UserIcon />
            </span>
            <input
              id="reg-lastName"
              {...register("lastName")}
              className={errors.lastName ? inputError : inputNormal}
              placeholder="Doe"
            />
          </div>
          <FieldError msg={errors.lastName?.message} />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="reg-email" className="mb-1.5 block text-sm font-medium text-gray-700">
          Email
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
            <EmailIcon />
          </span>
          <input
            id="reg-email"
            type="email"
            autoComplete="email"
            {...register("email")}
            className={errors.email ? inputError : inputNormal}
            placeholder="you@example.com"
          />
        </div>
        <FieldError msg={errors.email?.message} />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="reg-phone" className="mb-1.5 block text-sm font-medium text-gray-700">
          Phone
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
            <PhoneIcon />
          </span>
          <input
            id="reg-phone"
            type="tel"
            autoComplete="tel"
            {...register("phone")}
            className={errors.phone ? inputError : inputNormal}
            placeholder="+91 9876543210"
          />
        </div>
        <FieldError msg={errors.phone?.message} />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="reg-password" className="mb-1.5 block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
            <LockIcon />
          </span>
          <input
            id="reg-password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            {...register("password")}
            className={`${errors.password ? inputError : inputNormal} pr-10`}
            placeholder="Minimum 8 characters"
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
        <FieldError msg={errors.password?.message} />
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="reg-confirmPassword" className="mb-1.5 block text-sm font-medium text-gray-700">
          Confirm password
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
            <LockIcon />
          </span>
          <input
            id="reg-confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            {...register("confirmPassword")}
            className={`${errors.confirmPassword ? inputError : inputNormal} pr-10`}
            placeholder="Repeat your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((v) => !v)}
            className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600 transition"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        <FieldError msg={errors.confirmPassword?.message} />
      </div>

      {/* API error */}
      {registerMutation.isError && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 border border-red-200">
          Unable to create your account. Please try again.
        </p>
      )}

      {/* Submit */}
      <button
        id="register-submit"
        type="submit"
        disabled={registerMutation.isPending}
        className="group relative w-full overflow-hidden rounded-xl px-4 py-3.5 font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
        style={{
          background: "linear-gradient(135deg, #6366F1 0%, #4338CA 100%)",
          boxShadow: "0 4px 24px rgba(99,102,241,0.35)",
        }}
      >
        <span className="relative flex items-center justify-center gap-2">
          {registerMutation.isPending ? "Creating account…" : "Create Account"}
          {!registerMutation.isPending && (
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          )}
        </span>
      </button>
    </form>
  );
};