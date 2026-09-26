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
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl">
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
    <main className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <button
            type="button"
            onClick={() =>
              navigate("/organizations")
            }
            className="mb-4 text-sm font-medium text-indigo-600 transition-colors duration-150 hover:text-indigo-700 hover:underline"
          >
            ← Back to Organizations
          </button>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {organization.name}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
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
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors duration-150 hover:bg-gray-50"
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
                  className={[
                    "rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90",
                    organization.status === "blocked" ? "bg-emerald-600" : "bg-red-600",
                  ].join(" ")}
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
            className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
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