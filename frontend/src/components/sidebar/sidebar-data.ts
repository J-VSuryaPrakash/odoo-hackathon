// src/components/sidebar/sidebar-data.ts

import {
  LayoutDashboard,
  Truck,
  Users,
  Route,
  Wrench,
  Fuel,
  BarChart3,
} from "lucide-react"

export const sidebarItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Vehicles",
    url: "/vehicles",
    icon: Truck,
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
    title: "Reports",
    url: "/reports",
    icon: BarChart3,
  },
]
