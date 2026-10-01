import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useOrganizationStatus } from "../hooks/useOrganizationStatus";

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

  const handleCancelStatusAction = () => {
    if (isLoading) {
      return;
    }

    setIsStatusDialogOpen(false);
    reset();
  };

  return (
    <main className="p-5 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-8 text-center">
          <h1 className="text-xl font-semibold text-slate-900">
            Organization Details
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Organization details API is not connected yet.
          </p>

          {organizationId && (
            <p className="mt-2 text-xs text-slate-500">
              Organization ID: {organizationId}
            </p>
          )}

          {error && (
            <p className="mt-4 text-sm text-red-600">
              {error}
            </p>
          )}

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

      {/*
        Status dialog will be connected to the real
        organization once GET organization/:id exists.
      */}

      <OrganizationStatusDialog
        isOpen={isStatusDialogOpen}
        status="active"
        organizationName="Organization"
        isLoading={isLoading}
        onConfirm={async () => {
          if (!organizationId) {
            return;
          }

          await changeStatus(
            organizationId,
            "block",
          );
        }}
        onCancel={handleCancelStatusAction}
      />
    </main>
  );
};