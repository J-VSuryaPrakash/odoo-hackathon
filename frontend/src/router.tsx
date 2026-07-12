// src/app/router.tsx

import { createBrowserRouter } from "react-router-dom"
import RoleGuard from "@/components/auth/RoleGaurd"
import DashboardLayout from "@/layout/Dashboard-layout"

import DashboardPage from "@/pages/Dashboard"
import VehiclesPage from "@/pages/Vehicle"
import DriversPage from "@/pages/Drivers"
import TripsPage from "@/pages/Trips"
import MaintenancePage from "@/pages/Maintenance"
import LoginPage from "@/pages/Login";
import ProtectedRoute from "./components/auth/ProtectedRoutes";
import ExpensesPage from "@/pages/Expenses";
import AnalyticsPage from "@/pages/Analytics";
import Settings from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <RoleGuard allowedRoles={["DISPATCHER", "FLEET_MANAGER", "SAFETY_OFFICER", "FINANCIAL_ANALYST"]}>
            <DashboardPage />
          </RoleGuard>
        ),
      },
      {
        path: "Fleet",
        element: (
          <RoleGuard allowedRoles={["FLEET_MANAGER"]}>
            <VehiclesPage />
          </RoleGuard>
        ),
      },
      {
        path: "drivers",
        element: (
          <RoleGuard allowedRoles={["SAFETY_OFFICER"]}>
            <DriversPage />
          </RoleGuard>
        ),
      },
      {
        path: "trips",
        element: (
          <RoleGuard allowedRoles={["DISPATCHER"]}>
            <TripsPage />
          </RoleGuard>
        ),
      },
      {
        path: "maintenance",
        element: (
          <RoleGuard allowedRoles={["FLEET_MANAGER"]}>
            <MaintenancePage />
          </RoleGuard>
        ),
      },
      {
        path: "fuel-expenses",
        element: (
          <RoleGuard allowedRoles={["FINANCIAL_ANALYST"]}>
            <ExpensesPage />
          </RoleGuard>
        ),
      },
      {
        path: "reports",
        element: (
          <RoleGuard
            allowedRoles={[
              "FINANCIAL_ANALYST",
              "FLEET_MANAGER",
              "SAFETY_OFFICER",
              "DISPATCHER",
            ]}
          >
            <AnalyticsPage />
          </RoleGuard>
        ),
      },
      {
        path: "settings",
        element: (
          <RoleGuard
            allowedRoles={[
              "FLEET_MANAGER",
              "DISPATCHER",
              "SAFETY_OFFICER",
              "FINANCIAL_ANALYST",
            ]}
          >
            <Settings />
          </RoleGuard>
        ),
      },
    ],
  },
])
