// src/components/sidebar/app-sidebar.tsx

import { NavLink, useLocation } from "react-router-dom"

import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar"

import { sidebarItems } from "./sidebar-data"

import { cn } from "@/lib/utils"

export function AppSidebar() {
  const location = useLocation()

  return (
    <Sidebar className="border-r bg-background" collapsible="icon">
      <SidebarHeader className="border-b px-6 py-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">TransitOps</h1>

          <p className="mt-1 text-sm text-muted-foreground">Fleet Management</p>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-6">
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.url

            return (
              <NavLink
                key={item.title}
                to={item.url}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",

                  "hover:bg-muted",

                  isActive &&
                    "bg-primary text-primary-foreground shadow-sm hover:bg-primary"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />

                <span>{item.title}</span>
              </NavLink>
            )
          })}
        </nav>
      </SidebarContent>
    </Sidebar>
  )
}
