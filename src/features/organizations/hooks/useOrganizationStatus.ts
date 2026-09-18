import { useState } from "react";

import {
  blockOrganization,
  unblockOrganization,
} from "../api/organizations.api";

type OrganizationStatusAction = "block" | "unblock";

interface UseOrganizationStatusReturn {
  changeStatus: (
    organizationId: string,
    action: OrganizationStatusAction,
  ) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  reset: () => void;
}

export const useOrganizationStatus =
  (): UseOrganizationStatusReturn => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const changeStatus = async (
      organizationId: string,
      action: OrganizationStatusAction,
    ): Promise<boolean> => {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      try {
        if (action === "block") {
          await blockOrganization(organizationId);
        } else {
          await unblockOrganization(organizationId);
        }

        setSuccess(true);

        return true;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : `Failed to ${action} organization.`;

        setError(message);

        return false;
      } finally {
        setIsLoading(false);
      }
    };

    const reset = (): void => {
      setError(null);
      setSuccess(false);
    };

    return {
      changeStatus,
      isLoading,
      error,
      success,
      reset,
    };
  };