import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginFormData } from "../schemas/login.schema";
import { useLogin } from "../hooks/useLogin";
import { useAuth } from "../hooks/AuthContext";

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
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
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#5e94db] focus:ring-2 focus:ring-[#5e94db]/20"
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
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          autoComplete="current-password"
          {...register("password")}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#5e94db] focus:ring-2 focus:ring-[#5e94db]/20"
          placeholder="••••••••"
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      {loginMutation.isError && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          Unable to login. Please check your credentials.
        </p>
      )}

      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="w-full rounded-xl bg-[#5e94db] px-4 py-3 font-semibold text-white transition hover:bg-[#4d83ca] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loginMutation.isPending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
};