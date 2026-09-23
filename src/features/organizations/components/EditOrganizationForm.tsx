import type { Organization } from "../types/organization.types";
import { useUpdateOrganization } from "../hooks/useOrganizations";
import { OrganizationForm } from "./OrganizationForm";

interface EditOrganizationFormProps {
  organization: Organization;
  onSuccess?: (organization: Organization) => void;
  onCancel?: () => void;
}

export const EditOrganizationForm = ({
  organization,
  onSuccess,
  onCancel,
}: EditOrganizationFormProps) => {
  const {
    update,
    isLoading,
    error,
  } = useUpdateOrganization();

  const handleSubmit = async (values: Parameters<
    React.ComponentProps<typeof OrganizationForm>["onSubmit"]
  >[0]) => {
    const updatedOrganization = await update(
      organization.customId,
      values,
    );

    if (updatedOrganization) {
      onSuccess?.(updatedOrganization);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <OrganizationForm
        organization={organization}
        isSubmitting={isLoading}
        onSubmit={handleSubmit}
        onCancel={onCancel}
      />
    </div>
  );
};