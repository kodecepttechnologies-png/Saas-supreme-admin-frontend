import type { Organization } from "../types/organization.types";
import { OrganizationStatusBadge } from "./OrganizationStatusBadge";

interface OrganizationDetailsProps {
  organization: Organization;
}

interface DetailItemProps {
  label: string;
  value: string;
}

const DetailItem = ({
  label,
  value,
}: DetailItemProps) => {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-1 wrap-break-word text-sm text-slate-700">
        {value}
      </p>
    </div>
  );
};

export const OrganizationDetails = ({
  organization,
}: OrganizationDetailsProps) => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Basic Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Organization contact and account information.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 p-5 sm:grid-cols-2 sm:p-6">
        <DetailItem
          label="Organization ID"
          value={organization.customId}
        />

        <DetailItem
          label="Name"
          value={organization.name}
        />

        <DetailItem
          label="Email"
          value={organization.email ?? "Not available"}
        />

        <DetailItem
          label="Phone"
          value={organization.phone ?? "Not available"}
        />

        <div className="sm:col-span-2">
          <DetailItem
            label="Address"
            value={organization.address ?? "Not available"}
          />
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Status
          </p>

          <div className="mt-2">
            <OrganizationStatusBadge
              status={organization.status}
            />
          </div>
        </div>

        <DetailItem
          label="Deleted"
          value={organization.isDeleted ? "Yes" : "No"}
        />

        <DetailItem
          label="Created"
          value={
            organization.createdAt
              ? new Date(
                  organization.createdAt,
                ).toLocaleString()
              : "Not available"
          }
        />

        <DetailItem
          label="Last Updated"
          value={
            organization.updatedAt
              ? new Date(
                  organization.updatedAt,
                ).toLocaleString()
              : "Not available"
          }
        />

        {organization.logoUrl && (
          <div className="sm:col-span-2">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Logo
            </p>

            <div className="mt-3">
              <img
                src={organization.logoUrl}
                alt={`${organization.name} logo`}
                className="h-20 w-20 rounded-lg border border-slate-200 object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};