export interface OrganizationStatus {
  active: number;
  inactive: number;
  blocked: number;
  deleted: number;
}

export interface DashboardStats {
  totalOrganizations: number;
  activeOrganizations: number;
  inactiveOrganizations: number;
  blockedOrganizations: number;
  deletedOrganizations: number;
  organizationStatus: OrganizationStatus;
}

export interface DashboardResponse {
  success: boolean;
  data: DashboardStats;
}