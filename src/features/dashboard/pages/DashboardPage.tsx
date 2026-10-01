import { DashboardHeader } from "../components/DashboardHeader";
import { DashboardSkeleton } from "../components/DashboardSkeleton";
import { PlatformStats } from "../components/PlatformStats";
import { useDashboard } from "../hooks/useDashboard";

export const DashboardPage = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useDashboard();

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <DashboardHeader />
        <DashboardSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <DashboardHeader />

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="text-base font-semibold text-red-800">
            Unable to load dashboard
          </h2>

          <p className="mt-1 text-sm text-red-700">
            {error instanceof Error
              ? error.message
              : "Something went wrong while loading dashboard data."}
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!data?.success || !data.data) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <DashboardHeader />

        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
          No dashboard data is available.
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <DashboardHeader />

      <PlatformStats stats={data.data} />
    </div>
  );
};