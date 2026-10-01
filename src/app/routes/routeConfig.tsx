import { Navigate, Route, Routes } from "react-router-dom";

import { LoginPage } from "../../features/auth";
import { DashboardPage } from "../../features/dashboard";

import {
  CreateOrganizationPage,
  EditOrganizationPage,
  OrganizationDetailsPage,
  OrganizationsPage,
} from "../../features/organizations";

import { NotificationsPage } from "../../features/notifications/pages/NotificationsPage";
import { PersonalSettingsPage } from "../../features/profile/pages/PersonalSettingsPage";

import { SupremeAdminLayout } from "../layouts/SupremeAdminLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* ================================
          SUPREME ADMIN LOGIN
      ================================= */}

      <Route element={<PublicRoute />}>
        <Route
          path="/supreme-admin/login"
          element={<LoginPage />}
        />
      </Route>

      {/* ================================
          PROTECTED SUPREME ADMIN ROUTES
      ================================= */}

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

          {/* Notifications */}
          <Route
            path="/notifications"
            element={<NotificationsPage />}
          />

          {/* Personal Settings / Profile */}
          <Route
            path="/profile"
            element={<PersonalSettingsPage />}
          />

        </Route>
      </Route>

      {/* ================================
          UNKNOWN URL
      ================================= */}

      <Route
        path="*"
        element={
          <Navigate
            to="/supreme-admin/login"
            replace
          />
        }
      />
    </Routes>
  );
};