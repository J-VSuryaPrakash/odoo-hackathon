// src/components/sidebar/sidebar-data.ts

import {
  LayoutDashboard,
  Car,
  Users,
  Route,
  Wrench,
  Fuel,
  ChartSpline,
} from "lucide-react"

import type { UserRole } from "@/types/auth"

export interface SidebarItem {
  title: string
  url: string
  icon: any
  allowedRoles: UserRole[]
}

export const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    allowedRoles: ["FLEET_MANAGER", "SAFETY_OFFICER", "FINANCIAL_ANALYST", "DISPATCHER"],
  },

  {
    title: "Fleet",
    url: "/fleet",
    icon: Car,
    allowedRoles: ["FLEET_MANAGER"],
  },

  {
    title: "Drivers",
    url: "/drivers",
    icon: Users,
    allowedRoles: ["SAFETY_OFFICER"],
  },

  {
    title: "Trips",
    url: "/trips",
    icon: Route,
    allowedRoles: ["DISPATCHER"],
  },

  {
    title: "Maintenance",
    url: "/maintenance",
    icon: Wrench,
    allowedRoles: ["FLEET_MANAGER"],
  },

  {
    title: "Fuel & Expenses",
    url: "/fuel-expenses",
    icon: Fuel,
    allowedRoles: ["FINANCIAL_ANALYST"],
  },

  {
    title: "Reports & Analytics",
    url: "/reports",
    icon: ChartSpline,
    allowedRoles: ["FINANCIAL_ANALYST", "FLEET_MANAGER", "SAFETY_OFFICER", "DISPATCHER"],
  },

  {
    title: "Settings",
    url: "/settings",
    icon: Wrench,
    allowedRoles: [
      "FLEET_MANAGER",
      "DISPATCHER",
      "SAFETY_OFFICER",
      "FINANCIAL_ANALYST",
    ],
  },
]
