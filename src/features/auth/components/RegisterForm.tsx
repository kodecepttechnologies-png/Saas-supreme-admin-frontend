import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  type RegisterFormData,
} from "../schemas/register.schema";

import { useRegister } from "../hooks/useRegister";
import { useAuth } from "../hooks/AuthContext";

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            First name
          </label>

          <input
            id="firstName"
            {...register("firstName")}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#5e94db] focus:ring-2 focus:ring-[#5e94db]/20"
            placeholder="John"
          />

          {errors.firstName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Last name
          </label>

          <input
            id="lastName"
            {...register("lastName")}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#5e94db] focus:ring-2 focus:ring-[#5e94db]/20"
            placeholder="Doe"
          />

          {errors.lastName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register("email")}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#5e94db] focus:ring-2 focus:ring-[#5e94db]/20"
          placeholder="admin@example.com"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Phone
        </label>

        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          {...register("phone")}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#5e94db] focus:ring-2 focus:ring-[#5e94db]/20"
          placeholder="+91 9876543210"
        />

        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">
            {errors.phone.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          autoComplete="new-password"
          {...register("password")}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#5e94db] focus:ring-2 focus:ring-[#5e94db]/20"
          placeholder="Minimum 8 characters"
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Confirm password
        </label>

        <input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          {...register("confirmPassword")}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#5e94db] focus:ring-2 focus:ring-[#5e94db]/20"
          placeholder="Repeat your password"
        />

        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {registerMutation.isError && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          Unable to create your account. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={registerMutation.isPending}
        className="w-full rounded-xl bg-[#DBA55E] px-4 py-3 font-semibold text-white transition hover:bg-[#c99450] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {registerMutation.isPending
          ? "Creating account..."
          : "Create account"}
      </button>
    </form>
  );
};