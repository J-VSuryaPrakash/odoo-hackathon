// src/components/sidebar/sidebar-data.ts

import {
  LayoutDashboard,
  Truck,
  Car,
  Users,
  Route,
  Wrench,
  Fuel,
  BarChart3,
  ChartSpline
} from "lucide-react"

export const sidebarItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Fleet",
    url: "/fleet",
    icon: Car,
  },
  {
    title: "Drivers",
    url: "/drivers",
    icon: Users,
  },
  {
    title: "Trips",
    url: "/trips",
    icon: Route,
  },
  {
    title: "Maintenance",
    url: "/maintenance",
    icon: Wrench,
  },
  {
    title: "Fuel & Expenses",
    url: "/fuel",
    icon: Fuel,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: ChartSpline,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Wrench,
  }
]
