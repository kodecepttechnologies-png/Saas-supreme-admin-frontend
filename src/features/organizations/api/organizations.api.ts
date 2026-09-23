import { apiClient } from "../../../lib/api/client";

import type {
  OrganizationActionResponse,
  UpdateOrganizationRequest,
  UpdateOrganizationResponse,
} from "../types/organization.types";

export const updateOrganization = async (
  organizationId: string,
  payload: UpdateOrganizationRequest,
): Promise<UpdateOrganizationResponse> => {
  const response = await apiClient.put<UpdateOrganizationResponse>(
    `/organizations/${organizationId}`,
    payload,
  );

  return response.data;
};

export const blockOrganization = async (
  organizationId: string,
): Promise<OrganizationActionResponse> => {
  const response = await apiClient.patch<OrganizationActionResponse>(
    `/organizations/${organizationId}/block`,
  );

  return response.data;
};

export const unblockOrganization = async (
  organizationId: string,
): Promise<OrganizationActionResponse> => {
  const response = await apiClient.patch<OrganizationActionResponse>(
    `/organizations/${organizationId}/unblock`,
  );

  return response.data;
};

export const deleteOrganization = async (
  organizationId: string,
): Promise<OrganizationActionResponse> => {
  const response = await apiClient.delete<OrganizationActionResponse>(
    `/organizations/${organizationId}`,
  );

  return response.data;
};