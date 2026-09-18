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
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Employees
          </h2>
        </div>

        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-12 rounded-lg bg-slate-100" />
            <div className="h-12 rounded-lg bg-slate-100" />
            <div className="h-12 rounded-lg bg-slate-100" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Employees
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Read-only employee information for this organization.
        </p>
      </div>

      {employees.length === 0 ? (
        <div className="p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
            <span className="text-lg text-slate-400">
              👥
            </span>
          </div>

          <h3 className="mt-4 text-sm font-semibold text-slate-900">
            No employee information
          </h3>

          <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
            Employee information is not currently available for
            this organization.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Name
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Role
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      {employee.name}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {employee.email}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {employee.role}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
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
                className="rounded-lg border border-slate-200 p-4"
              >
                <p className="font-medium text-slate-900">
                  {employee.name}
                </p>

                <p className="mt-1 break-all text-sm text-slate-500">
                  {employee.email}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-slate-600">
                    {employee.role}
                  </span>

                  <span className="text-xs font-medium capitalize text-slate-500">
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