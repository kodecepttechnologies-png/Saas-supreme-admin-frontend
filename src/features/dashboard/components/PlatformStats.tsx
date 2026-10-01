import type { DashboardStats } from "../types/dashboard.types";
import { StatCard } from "./StatCard";

interface PlatformStatsProps {
  stats: DashboardStats;
}

const BuildingIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M15 9h4a1 1 0 0 1 1 1v11M8 8h2M8 12h2M8 16h2M17 13h1M17 17h1M2 21h20"
    />
  </svg>
);

const ActiveIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m5 12 4 4L19 6"
    />
  </svg>
);

const InactiveIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <circle cx="12" cy="12" r="9" />
    <path
      strokeLinecap="round"
      d="M8 12h8"
    />
  </svg>
);

const BlockedIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <circle cx="12" cy="12" r="9" />
    <path
      strokeLinecap="round"
      d="m8.5 8.5 7 7"
    />
  </svg>
);

export const PlatformStats = ({
  stats,
}: PlatformStatsProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Organization Overview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Current organization statistics across the platform.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Organizations"
          value={stats.totalOrganizations}
          description="All organizations"
          icon={<BuildingIcon />}
        />

        <StatCard
          title="Active Organizations"
          value={stats.activeOrganizations}
          description="Currently active"
          icon={<ActiveIcon />}
        />

        <StatCard
          title="Inactive Organizations"
          value={stats.inactiveOrganizations}
          description="Currently inactive"
          icon={<InactiveIcon />}
        />

        <StatCard
          title="Blocked Organizations"
          value={stats.blockedOrganizations}
          description="Currently blocked"
          icon={<BlockedIcon />}
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Organization Status
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Breakdown of organizations by current status.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatusItem
            label="Active"
            value={stats.organizationStatus.active}
          />

          <StatusItem
            label="Inactive"
            value={stats.organizationStatus.inactive}
          />

          <StatusItem
            label="Blocked"
            value={stats.organizationStatus.blocked}
          />

          <StatusItem
            label="Deleted"
            value={stats.organizationStatus.deleted}
          />
        </div>
      </div>
    </div>
  );
};

interface StatusItemProps {
  label: string;
  value: number;
}

const StatusItem = ({
  label,
  value,
}: StatusItemProps) => {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-sm font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
};