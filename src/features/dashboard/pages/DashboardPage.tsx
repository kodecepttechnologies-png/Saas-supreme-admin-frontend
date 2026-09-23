import { useAuth } from "../../auth";

export const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <main className="p-5 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Supreme Admin Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Welcome, {user?.firstName}.
        </p>
      </div>
    </main>
  );
};