import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type {
  UpdateOrganizationRequest,
} from "../types/organization.types";

import { CreateOrganizationForm } from "../components/CreateOrganizationForm";

export const CreateOrganizationPage = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(
    null,
  );

  const handleSubmit = async (
    values: UpdateOrganizationRequest,
  ) => {
    setError(
      "Organization creation is not available yet because the backend create organization API has not been implemented.",
    );

    console.log(
      "Create organization payload:",
      values,
    );
  };

  return (
    <main className="p-5 sm:p-8">
      <div className="mx-auto max-w-3xl">
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

          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Create Organization
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Add a new organization to the platform.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700"
          >
            {error}
          </div>
        )}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <CreateOrganizationForm
            onSubmit={handleSubmit}
            onCancel={() =>
              navigate("/organizations")
            }
          />
        </div>
      </div>
    </main>
  );
};