import { useNavigate, useParams } from "react-router-dom";

import { mockOrganizations } from "../data/organizations.mock";

import { EditOrganizationForm } from "../components/EditOrganizationForm";

export const EditOrganizationPage = () => {
  const navigate = useNavigate();

  const { organizationId } =
    useParams<{ organizationId: string }>();

  const organization = mockOrganizations.find(
    (item) => item.customId === organizationId,
  );

  if (!organization) {
    return (
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-[0_10px_30px_rgba(99,102,241,0.08)]">
            <h1 className="text-xl font-semibold text-gray-900">
              Organization Not Found
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              The requested organization could not be
              found.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/organizations")
              }
              className="mt-5 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #6366F1 0%, #4338CA 100%)",
                boxShadow: "0 4px 24px rgba(99,102,241,0.35)",
              }}
            >
              Back to Organizations
            </button>
          </div>
        </div>
      </main>
    );
  }

  const handleSuccess = () => {
    navigate(
      `/organizations/${organization.customId}`,
    );
  };

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <button
            type="button"
            onClick={() =>
              navigate(
                `/organizations/${organization.customId}`,
              )
            }
            className="mb-4 text-sm font-medium text-indigo-600 transition-colors duration-150 hover:text-indigo-700 hover:underline"
          >
            ← Back to Organization
          </button>

          <h1 className="text-2xl font-bold text-gray-900">
            Edit Organization
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Update the organization information.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_10px_30px_rgba(99,102,241,0.08)] sm:p-6">
          <EditOrganizationForm
            organization={organization}
            onSuccess={handleSuccess}
            onCancel={() =>
              navigate(
                `/organizations/${organization.customId}`,
              )
            }
          />
        </div>
      </div>
    </main>
  );
};