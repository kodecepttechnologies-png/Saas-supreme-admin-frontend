import type { Organization } from "../types/organization.types";
import { OrganizationStatusBadge } from "./OrganizationStatusBadge";

interface OrganizationCardProps {
  organization: Organization;
  onView?: (organization: Organization) => void;
  onStatusAction?: (organization: Organization) => void;
}

export const OrganizationCard = ({
  organization,
  onView,
  onStatusAction,
}: OrganizationCardProps) => {
  const isBlocked = organization.status === "blocked";

  return (
    <article className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_10px_30px_rgba(99,102,241,0.08)]">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-gray-900">
            {organization.name}
          </h3>

          <p className="mt-1 text-xs font-medium text-gray-500">
            {organization.customId}
          </p>
        </div>

        <OrganizationStatusBadge status={organization.status} />
      </div>

      {/* Organization Information */}
      <div className="mt-5 space-y-3">
        {organization.email && (
          <div>
            <p className="text-xs font-medium text-gray-400">
              Email
            </p>

            <p className="mt-1 break-all text-sm text-gray-700">
              {organization.email}
            </p>
          </div>
        )}

        {organization.phone && (
          <div>
            <p className="text-xs font-medium text-gray-400">
              Phone
            </p>

            <p className="mt-1 text-sm text-gray-700">
              {organization.phone}
            </p>
          </div>
        )}

        {organization.address && (
          <div>
            <p className="text-xs font-medium text-gray-400">
              Address
            </p>

            <p className="mt-1 text-sm text-gray-700">
              {organization.address}
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-5 flex gap-3 border-t border-gray-100 pt-4">
        <button
          type="button"
          onClick={() => onView?.(organization)}
          className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors duration-150 hover:bg-gray-50"
        >
          View
        </button>

        <button
          type="button"
          onClick={() => onStatusAction?.(organization)}
          className={[
            "flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90",
            isBlocked ? "bg-emerald-600" : "bg-red-600",
          ].join(" ")}
        >
          {isBlocked ? "Unblock" : "Block"}
        </button>
      </div>
    </article>
  );
};