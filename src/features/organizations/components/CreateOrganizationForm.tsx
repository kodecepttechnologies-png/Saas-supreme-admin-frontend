import type { ComponentProps } from "react";

import { OrganizationForm } from "./OrganizationForm";

type OrganizationFormSubmit = ComponentProps<
  typeof OrganizationForm
>["onSubmit"];

interface CreateOrganizationFormProps {
  isSubmitting?: boolean;
  onSuccess?: () => void;
  onSubmit: OrganizationFormSubmit;
  onCancel?: () => void;
}

export const CreateOrganizationForm = ({
  isSubmitting = false,
  onSuccess,
  onSubmit,
  onCancel,
}: CreateOrganizationFormProps) => {
  const handleSubmit: OrganizationFormSubmit = async (values) => {
    await onSubmit(values);
    onSuccess?.();
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">
        <p className="text-sm text-blue-700">
          Enter the organization information below.
        </p>
      </div>

      <OrganizationForm
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        onCancel={onCancel}
      />
    </div>
  );
};