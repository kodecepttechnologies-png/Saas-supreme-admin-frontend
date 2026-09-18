import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  type RegisterFormData,
} from "../schemas/register.schema";

import { useRegister } from "../hooks/useRegister";
import { useAuth } from "../hooks/AuthContext";

const inputPlainClass =
  "w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-[15px] text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#5e94db] focus:ring-4 focus:ring-[#5e94db]/15";
const inputIconClass = inputPlainClass.replace("px-4", "pl-11 pr-4");
const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";
const errorClass = "mt-1.5 text-sm text-red-600";
const iconClass =
  "pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const registerMutation = useRegister();

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelClass}>
            First name
          </label>

          <input
            id="firstName"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            {...register("firstName")}
            className={inputPlainClass}
            placeholder="John"
          />

          {errors.firstName && (
            <p id="firstName-error" className={errorClass}>
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className={labelClass}>
            Last name
          </label>

          <input
            id="lastName"
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            {...register("lastName")}
            className={inputPlainClass}
            placeholder="Doe"
          />

          {errors.lastName && (
            <p id="lastName-error" className={errorClass}>
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

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
            className={inputIconClass}
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
        <label htmlFor="phone" className={labelClass}>
          Phone
        </label>

        <div className="relative">
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 4.5h3.086a1.5 1.5 0 0 1 1.423 1.026l1.03 3.09a1.5 1.5 0 0 1-.401 1.55l-1.28 1.219a12.06 12.06 0 0 0 5.257 5.257l1.22-1.28a1.5 1.5 0 0 1 1.55-.401l3.09 1.03A1.5 1.5 0 0 1 21 17.414V20.5a1 1 0 0 1-1.06 1A16.5 16.5 0 0 1 4.5 5.56a1 1 0 0 1 1-1.06Z"
            />
          </svg>

          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...register("phone")}
            className={inputIconClass}
            placeholder="+91 9876543210"
          />
        </div>

        {errors.phone && (
          <p id="phone-error" className={errorClass}>
            {errors.phone.message}
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
            autoComplete="new-password"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
            {...register("password")}
            className={inputIconClass}
            placeholder="Minimum 8 characters"
          />
        </div>

        {errors.password && (
          <p id="password-error" className={errorClass}>
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className={labelClass}>
          Confirm password
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
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
            {...register("confirmPassword")}
            className={inputIconClass}
            placeholder="Repeat your password"
          />
        </div>

        {errors.confirmPassword && (
          <p id="confirmPassword-error" className={errorClass}>
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {registerMutation.isError && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          Unable to create your account. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={registerMutation.isPending}
        className="w-full rounded-lg bg-[#DBA55E] px-4 py-3 font-semibold text-white shadow-sm shadow-[#DBA55E]/30 transition hover:bg-[#c99450] focus:outline-none focus:ring-4 focus:ring-[#DBA55E]/25 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {registerMutation.isPending ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
};