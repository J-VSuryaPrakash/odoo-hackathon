// src/app/router.tsx

import { createBrowserRouter } from "react-router-dom"

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
        element: <DashboardPage />,
      },
      {
        path: "Fleet",
        element: <VehiclesPage />,
      },
      {
        path: "drivers",
        element: <DriversPage />,
      },
      {
        path: "trips",
        element: <TripsPage />,
      },
      {
        path: "maintenance",
        element: <MaintenancePage />,
      },
      {
        path: "fuel-expenses",
        element: <ExpensesPage />,
      },
      {
        path: "reports",
        element: <AnalyticsPage />,
      },
      {
        path: "settings",
        element: <Settings />,
      }
    ],
  },
])
