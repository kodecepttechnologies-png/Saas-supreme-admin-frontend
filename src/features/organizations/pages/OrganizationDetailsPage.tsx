import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { mockOrganizations } from "../data/organizations.mock";

import { useOrganizationStatus } from "../hooks/useOrganizationStatus";

import { OrganizationSummary } from "../components/OrganizationSummary";
import { OrganizationDetails } from "../components/OrganizationDetails";
import { EmployeeReadOnlyList } from "../components/EmployeeReadOnlyList";
import { OrganizationStatusDialog } from "../components/OrganizationStatusDialog";

export const OrganizationDetailsPage = () => {
  const navigate = useNavigate();

  const { organizationId } =
    useParams<{ organizationId: string }>();

  const [isStatusDialogOpen, setIsStatusDialogOpen] =
    useState(false);

  const {
    changeStatus,
    isLoading,
    error,
    reset,
  } = useOrganizationStatus();

  const organization = mockOrganizations.find(
    (item) => item.customId === organizationId,
  );

  if (!organization) {
    return (
      <main className="p-5 sm:p-8">
        <div className="mx-auto max-w-5xl">
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

  const handleConfirmStatusAction = async () => {
    const action =
      organization.status === "blocked"
        ? "unblock"
        : "block";

    const success = await changeStatus(
      organization.customId,
      action,
    );

    if (success) {
      setIsStatusDialogOpen(false);
      reset();
    }
  };

  const handleCancelStatusAction = () => {
    if (isLoading) {
      return;
    }

    setIsStatusDialogOpen(false);
    reset();
  };

  return (
    <main className="p-5 sm:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <button
            type="button"
            onClick={() =>
              navigate("/organizations")
            }
            className="mb-4 text-sm font-medium text-[#5e94db] hover:underline"
          >
            ← Back to Organizations
          </button>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                {organization.name}
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Organization details and read-only
                employee information.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/organizations/${organization.customId}/edit`,
                  )
                }
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Edit
              </button>

              {!organization.isDeleted && (
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    setIsStatusDialogOpen(true);
                  }}
                  className="rounded-lg bg-[#5e94db] px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                >
                  {organization.status === "blocked"
                    ? "Unblock"
                    : "Block"}
                </button>
              )}
            </div>
          </div>
        </div>

        {error && !isStatusDialogOpen && (
          <div
            role="alert"
            className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <div className="space-y-6">
          <OrganizationSummary
            organization={organization}
          />

          <OrganizationDetails
            organization={organization}
          />

          <EmployeeReadOnlyList />
        </div>
      </div>

      {!organization.isDeleted && (
        <OrganizationStatusDialog
          isOpen={isStatusDialogOpen}
          status={organization.status}
          organizationName={organization.name}
          isLoading={isLoading}
          onConfirm={handleConfirmStatusAction}
          onCancel={handleCancelStatusAction}
        />
      )}
    </main>
  );
};