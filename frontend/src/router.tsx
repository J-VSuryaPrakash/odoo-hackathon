// src/app/router.tsx

import { createBrowserRouter } from "react-router-dom"

import DashboardLayout from "@/layout/Dashboard-layout"

import DashboardPage from "@/pages/Dashboard"
import VehiclesPage from "@/pages/Vehicle"
import DriversPage from "@/pages/Drivers"
import TripsPage from "@/pages/Trips"
import MaintenancePage from "@/pages/Maintenance"
import FuelPage from "@/pages/Fuel"
import ReportsPage from "@/pages/Reports"
import LoginPage from "@/pages/Login";
import ProtectedRoute from "./components/auth/ProtectedRoutes";

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
        path: "fuel",
        element: <FuelPage />,
      },
      {
        path: "reports",
        element: <ReportsPage />,
      },
    ],
  },
])
