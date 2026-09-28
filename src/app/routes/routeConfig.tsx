import { Navigate, Route, Routes } from "react-router-dom";

import { LoginPage } from "../../features/auth";
import { DashboardPage } from "../../features/dashboard";

import {
  CreateOrganizationPage,
  EditOrganizationPage,
  OrganizationDetailsPage,
  OrganizationsPage,
} from "../../features/organizations";

import { SupremeAdminLayout } from "../layouts/SupremeAdminLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Supreme Admin Login */}
      <Route element={<PublicRoute />}>
        <Route
          path="/supreme-admin/login"
          element={<LoginPage />}
        />
      </Route>

      {/* Protected Supreme Admin */}
      <Route element={<ProtectedRoute />}>
        <Route element={<SupremeAdminLayout />}>
          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="/organizations"
            element={<OrganizationsPage />}
          />

          <Route
            path="/organizations/new"
            element={<CreateOrganizationPage />}
          />

          <Route
            path="/organizations/:organizationId"
            element={<OrganizationDetailsPage />}
          />

          <Route
            path="/organizations/:organizationId/edit"
            element={<EditOrganizationPage />}
          />
        </Route>
      </Route>

      {/* Unknown URL */}
      <Route
        path="*"
        element={<Navigate to="/supreme-admin/login" replace />}
      />
    </Routes>
  );
};