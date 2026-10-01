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
    <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_10px_30px_rgba(99,102,241,0.08)] lg:block">
      <table className="w-full">
        <thead className="border-b border-gray-100 bg-gray-50/70">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              Name
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              Status
            </th>

            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {organizations.map((organization) => (
            <tr
              key={organization.customId}
              className="transition-colors duration-100 hover:bg-indigo-50/30"
            >
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
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
                    className="text-sm font-medium text-indigo-600 transition-colors duration-150 hover:text-indigo-700 hover:underline"
                  >
                    View
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onStatusAction?.(organization)
                    }
                    className="text-sm font-medium text-gray-600 transition-colors duration-150 hover:text-gray-900 hover:underline"
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