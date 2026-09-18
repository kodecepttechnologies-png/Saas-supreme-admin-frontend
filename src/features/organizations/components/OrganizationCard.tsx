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
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-slate-900">
            {organization.name}
          </h3>

          <p className="mt-1 text-xs font-medium text-slate-500">
            {organization.customId}
          </p>
        </div>

        <OrganizationStatusBadge status={organization.status} />
      </div>

      {/* Organization Information */}
      <div className="mt-5 space-y-3">
        {organization.email && (
          <div>
            <p className="text-xs font-medium text-slate-500">
              Email
            </p>

            <p className="mt-1 break-all text-sm text-slate-700">
              {organization.email}
            </p>
          </div>
        )}

        {organization.phone && (
          <div>
            <p className="text-xs font-medium text-slate-500">
              Phone
            </p>

            <p className="mt-1 text-sm text-slate-700">
              {organization.phone}
            </p>
          </div>
        )}

        {organization.address && (
          <div>
            <p className="text-xs font-medium text-slate-500">
              Address
            </p>

            <p className="mt-1 text-sm text-slate-700">
              {organization.address}
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-5 flex gap-3 border-t border-slate-100 pt-4">
        <button
          type="button"
          onClick={() => onView?.(organization)}
          className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          View
        </button>

        <button
          type="button"
          onClick={() => onStatusAction?.(organization)}
          className="flex-1 rounded-lg bg-[#5e94db] px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
        >
          {isBlocked ? "Unblock" : "Block"}
        </button>
      </div>
    </article>
  );
};