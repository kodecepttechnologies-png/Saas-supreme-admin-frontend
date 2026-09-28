import { useState } from "react";

import { deleteOrganization } from "../api/organizations.api";

interface UseDeleteOrganizationReturn {
  remove: (
    organizationId: string,
  ) => Promise<boolean>;

  isLoading: boolean;
  error: string | null;
  success: boolean;
  reset: () => void;
}

export const useDeleteOrganization =
  (): UseDeleteOrganizationReturn => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const remove = async (
      organizationId: string,
    ): Promise<boolean> => {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      try {
        await deleteOrganization(organizationId);

        setSuccess(true);

        return true;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Failed to delete organization.";

        setError(message);

        return false;
      } finally {
        setIsLoading(false);
      }
    };

    const reset = () => {
      setError(null);
      setSuccess(false);
    };

    return {
      remove,
      isLoading,
      error,
      success,
      reset,
    };
  };