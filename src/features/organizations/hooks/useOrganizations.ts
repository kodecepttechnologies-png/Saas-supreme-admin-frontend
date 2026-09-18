import { useState } from "react";

import {
  updateOrganization,
} from "../api/organizations.api";
import type {
  Organization,
  UpdateOrganizationRequest,
} from "../types/organization.types";

interface UseUpdateOrganizationReturn {
  update: (
    organizationId: string,
    payload: UpdateOrganizationRequest,
  ) => Promise<Organization | null>;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  reset: () => void;
}

export const useUpdateOrganization =
  (): UseUpdateOrganizationReturn => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const update = async (
      organizationId: string,
      payload: UpdateOrganizationRequest,
    ): Promise<Organization | null> => {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      try {
        const response = await updateOrganization(
          organizationId,
          payload,
        );

        setSuccess(true);

        return response.data;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Failed to update organization.";

        setError(message);

        return null;
      } finally {
        setIsLoading(false);
      }
    };

    const reset = (): void => {
      setError(null);
      setSuccess(false);
    };

    return {
      update,
      isLoading,
      error,
      success,
      reset,
    };
  };