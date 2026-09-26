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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px]"
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
        className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
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
            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors duration-150 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={[
              "rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50",
              isBlocking ? "bg-red-600" : "bg-emerald-600",
            ].join(" ")}
          >
            {isLoading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};