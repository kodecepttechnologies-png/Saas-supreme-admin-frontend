import type { Organization } from "../types/organization.types";
import { OrganizationStatusBadge } from "./OrganizationStatusBadge";

interface OrganizationSummaryProps {
  organization: Organization;
}

export const OrganizationSummary = ({
  organization,
}: OrganizationSummaryProps) => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Organization Summary
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Quick overview of this organization.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4 sm:p-6">
        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Organization ID
          </p>

          <p className="mt-2 text-sm font-semibold text-slate-900">
            {organization.customId}
          </p>
        </div>

        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Name
          </p>

          <p className="mt-2 truncate text-sm font-semibold text-slate-900">
            {organization.name}
          </p>
        </div>

        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Status
          </p>

          <div className="mt-2">
            <OrganizationStatusBadge status={organization.status} />
          </div>
        </div>

        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Deleted
          </p>

          <p className="mt-2 text-sm font-semibold text-slate-900">
            {organization.isDeleted ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </section>
  );
};