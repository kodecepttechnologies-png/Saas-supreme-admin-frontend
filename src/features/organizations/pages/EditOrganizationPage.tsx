import { useNavigate, useParams } from "react-router-dom";

export const EditOrganizationPage = () => {
  const navigate = useNavigate();

  const { organizationId } =
    useParams<{ organizationId: string }>();

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
            Edit Organization
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Update the organization information.
          </p>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-8 text-center">
          <h2 className="text-lg font-semibold text-slate-900">
            Organization data unavailable
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            The organization details GET API has not
            been connected yet.
          </p>

          {organizationId && (
            <p className="mt-2 text-xs text-slate-500">
              Organization ID: {organizationId}
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
    </main>
  );
};