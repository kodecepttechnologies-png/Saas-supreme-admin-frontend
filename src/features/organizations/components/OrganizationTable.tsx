import type { Organization } from "../types/organization.types";
import { OrganizationStatusBadge } from "./OrganizationStatusBadge";

interface OrganizationTableProps {
  organizations: Organization[];
  onView?: (organization: Organization) => void;
  onStatusAction?: (organization: Organization) => void;
}

export const OrganizationTable = ({
  organizations,
  onView,
  onStatusAction,
}: OrganizationTableProps) => {
  return (
    <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:block">
      <table className="w-full">
        <thead className="border-b border-slate-200 bg-slate-50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
              Name
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
              Status
            </th>

            <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {organizations.map((organization) => (
            <tr
              key={organization.customId}
              className="transition hover:bg-slate-50"
            >
              <td className="px-6 py-4 text-sm font-medium text-slate-900">
                {organization.name}
              </td>

              <td className="px-6 py-4">
                <OrganizationStatusBadge
                  status={organization.status}
                />
              </td>

              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => onView?.(organization)}
                    className="text-sm font-medium text-[#5e94db] hover:underline"
                  >
                    View
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onStatusAction?.(organization)
                    }
                    className="text-sm font-medium text-slate-600 hover:underline"
                  >
                    {organization.status === "blocked"
                      ? "Unblock"
                      : "Block"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};