export type OrganizationStatus =
  | "active"
  | "inactive"
  | "blocked"
  | "deleted";

export interface Organization {
  customId: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  logoUrl: string | null;
  status: OrganizationStatus;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateOrganizationRequest {
  name?: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  logoUrl?: string | null;
  status?: OrganizationStatus;
}

export interface UpdateOrganizationResponse {
  success: true;
  data: Organization;
}

export interface OrganizationActionResponse {
  success: true;
  message: string;
}