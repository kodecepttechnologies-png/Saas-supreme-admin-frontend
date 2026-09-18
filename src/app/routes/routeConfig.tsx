import { Navigate, Route, Routes } from "react-router-dom";

import {
  LoginPage,
  RegisterPage,
} from "../../features/auth";

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
      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<SupremeAdminLayout />}>
          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          {/* Organizations */}
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

      {/* Fallback */}
      <Route
        path="*"
        element={<Navigate to="/dashboard" replace />}
      />
    </Routes>
  );
};