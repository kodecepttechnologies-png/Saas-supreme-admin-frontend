import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { Organization } from "../types/organization.types";

import { mockOrganizations } from "../data/organizations.mock";

import { useOrganizationStatus } from "../hooks/useOrganizationStatus";

import { OrganizationSearch } from "../components/OrganizationSearch";
import { OrganizationFilters } from "../components/OrganizationFilters";
import { OrganizationTable } from "../components/OrganizationTable";
import { OrganizationCard } from "../components/OrganizationCard";
import { OrganizationStatusDialog } from "../components/OrganizationStatusDialog";

export const OrganizationsPage = () => {
  const navigate = useNavigate();

  const [organizations, setOrganizations] =
    useState<Organization[]>(mockOrganizations);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<string>("all");

  const [selectedOrganization, setSelectedOrganization] =
    useState<Organization | null>(null);

  const {
    changeStatus,
    isLoading,
    error,
    reset,
  } = useOrganizationStatus();

  const filteredOrganizations = useMemo(() => {
    const normalizedSearch = search
      .trim()
      .toLowerCase();

    return organizations.filter((organization) => {
      const matchesSearch =
        !normalizedSearch ||
        organization.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        organization.customId
          .toLowerCase()
          .includes(normalizedSearch) ||
        organization.email
          ?.toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "all" ||
        organization.status === statusFilter;

      return Boolean(matchesSearch && matchesStatus);
    });
  }, [organizations, search, statusFilter]);

  const handleView = (organization: Organization) => {
    navigate(
      `/organizations/${organization.customId}`,
    );
  };

  const handleStatusAction = (
    organization: Organization,
  ) => {
    reset();
    setSelectedOrganization(organization);
  };

  const handleConfirmStatusAction = async () => {
    if (!selectedOrganization) {
      return;
    }

    const action =
      selectedOrganization.status === "blocked"
        ? "unblock"
        : "block";

    const success = await changeStatus(
      selectedOrganization.customId,
      action,
    );

    if (!success) {
      return;
    }

    const nextStatus =
      action === "block"
        ? "blocked"
        : "active";

    setOrganizations((previous) =>
      previous.map((organization) =>
        organization.customId ===
        selectedOrganization.customId
          ? {
              ...organization,
              status: nextStatus,
            }
          : organization,
      ),
    );

    setSelectedOrganization(null);
  };

  const handleCancelStatusAction = () => {
    if (isLoading) {
      return;
    }

    reset();
    setSelectedOrganization(null);
  };

  return (
    <main className="p-5 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Organizations
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage organizations across the platform.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/organizations/new")
            }
            className="rounded-lg bg-[#5e94db] px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#5e94db] focus:ring-offset-2"
          >
            + Create Organization
          </button>
        </div>

        <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center">
          <OrganizationSearch
            value={search}
            onChange={setSearch}
          />

          <OrganizationFilters
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </div>

        {error && (
          <div
            role="alert"
            className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {filteredOrganizations.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              No organizations found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Try changing your search or filter.
            </p>
          </div>
        ) : (
          <>
            <OrganizationTable
              organizations={filteredOrganizations}
              onView={handleView}
              onStatusAction={handleStatusAction}
            />

            <div className="space-y-4 lg:hidden">
              {filteredOrganizations.map(
                (organization) => (
                  <OrganizationCard
                    key={organization.customId}
                    organization={organization}
                    onView={handleView}
                    onStatusAction={
                      handleStatusAction
                    }
                  />
                ),
              )}
            </div>
          </>
        )}

        {selectedOrganization && (
          <OrganizationStatusDialog
            isOpen={true}
            status={selectedOrganization.status}
            organizationName={
              selectedOrganization.name
            }
            isLoading={isLoading}
            onConfirm={handleConfirmStatusAction}
            onCancel={handleCancelStatusAction}
          />
        )}
      </div>
    </main>
  );
};