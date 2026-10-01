export interface OrganizationEmployee {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
}

interface EmployeeReadOnlyListProps {
  employees?: OrganizationEmployee[];
  isLoading?: boolean;
}

export const EmployeeReadOnlyList = ({
  employees = [],
  isLoading = false,
}: EmployeeReadOnlyListProps) => {
  if (isLoading) {
    return (
      <section className="rounded-2xl border border-gray-100 bg-white shadow-[0_10px_30px_rgba(99,102,241,0.08)]">
        <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Employees
          </h2>
        </div>

        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-12 rounded-xl bg-gray-100" />
            <div className="h-12 rounded-xl bg-gray-100" />
            <div className="h-12 rounded-xl bg-gray-100" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-gray-100 bg-white shadow-[0_10px_30px_rgba(99,102,241,0.08)]">
      <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Employees
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Read-only employee information for this organization.
        </p>
      </div>

      {employees.length === 0 ? (
        <div className="p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <span className="text-lg text-gray-400">
              👥
            </span>
          </div>

          <h3 className="mt-4 text-sm font-semibold text-gray-900">
            No employee information
          </h3>

          <p className="mx-auto mt-1 max-w-md text-sm text-gray-500">
            Employee information is not currently available for
            this organization.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full">
              <thead className="border-b border-gray-100 bg-gray-50/70">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Name
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Role
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {employees.map((employee) => (
                  <tr key={employee.id} className="transition-colors duration-100 hover:bg-indigo-50/20">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {employee.name}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {employee.email}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {employee.role}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {employee.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="space-y-3 p-4 md:hidden">
            {employees.map((employee) => (
              <article
                key={employee.id}
                className="rounded-xl border border-gray-100 p-4"
              >
                <p className="font-medium text-gray-900">
                  {employee.name}
                </p>

                <p className="mt-1 break-all text-sm text-gray-500">
                  {employee.email}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {employee.role}
                  </span>

                  <span className="text-xs font-medium capitalize text-gray-500">
                    {employee.status}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
};