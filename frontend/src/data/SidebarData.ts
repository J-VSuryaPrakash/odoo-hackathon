// src/components/sidebar/sidebar-data.ts

import {
  LayoutDashboard,
  Car,
  Users,
  Route,
  Wrench,
  Fuel,
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
    title: "Reports & Analytics",
    url: "/reports",
    icon: ChartSpline,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Wrench,
  }
]
