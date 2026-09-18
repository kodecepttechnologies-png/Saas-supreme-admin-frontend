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
      <main className="p-5 sm:p-8">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h1 className="text-xl font-semibold text-slate-900">
              Organization Not Found
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              The requested organization could not be
              found.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/organizations")
              }
              className="mt-5 rounded-lg bg-[#5e94db] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
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
    <main className="p-5 sm:p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <button
            type="button"
            onClick={() =>
              navigate(
                `/organizations/${organization.customId}`,
              )
            }
            className="mb-4 text-sm font-medium text-[#5e94db] hover:underline"
          >
            ← Back to Organization
          </button>

          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Edit Organization
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Update the organization information.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
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