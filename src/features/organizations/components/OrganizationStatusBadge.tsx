import type { OrganizationStatus } from "../types/organization.types";

interface OrganizationStatusBadgeProps {
  status: OrganizationStatus;
}

const statusConfig: Record<
  OrganizationStatus,
  { label: string; className: string }
> = {
  active: {
    label: "Active",
    className: "bg-emerald-50 text-emerald-700",
  },
  inactive: {
    label: "Inactive",
    className: "bg-gray-100 text-gray-600",
  },
  blocked: {
    label: "Blocked",
    className: "bg-red-50 text-red-700",
  },
  deleted: {
    label: "Deleted",
    className: "bg-red-50/60 text-red-400",
  },
};

export const OrganizationStatusBadge = ({
  status,
}: OrganizationStatusBadgeProps) => {
  const config = statusConfig[status] ?? statusConfig.inactive;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
};