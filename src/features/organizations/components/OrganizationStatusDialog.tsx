import type { OrganizationStatus } from "../types/organization.types";

interface OrganizationStatusDialogProps {
  isOpen: boolean;
  status: OrganizationStatus;
  organizationName: string;
  isLoading?: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}

export const OrganizationStatusDialog = ({
  isOpen,
  status,
  organizationName,
  isLoading = false,
  onConfirm,
  onCancel,
}: OrganizationStatusDialogProps) => {
  if (!isOpen) {
    return null;
  }

  const isBlocking = status !== "blocked";

  const title = isBlocking
    ? "Block Organization"
    : "Unblock Organization";

  const description = isBlocking
    ? `Are you sure you want to block "${organizationName}"?`
    : `Are you sure you want to unblock "${organizationName}"?`;

  const confirmText = isBlocking ? "Block" : "Unblock";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isLoading) {
          onCancel();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="organization-status-dialog-title"
        aria-describedby="organization-status-dialog-description"
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="mb-5">
          <h2
            id="organization-status-dialog-title"
            className="text-lg font-semibold text-gray-900"
          >
            {title}
          </h2>

          <p
            id="organization-status-dialog-description"
            className="mt-2 text-sm leading-6 text-gray-600"
          >
            {description}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            This action will change the organization status.
          </p>
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="rounded-lg bg-[#5e94db] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};