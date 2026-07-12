
import { Outlet, useNavigate } from "react-router-dom"
import { LogOut } from "lucide-react"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { logout } from "@/lib/auth"
import { Button } from "@/components/ui/button"


export default function DashboardLayout() {

  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate("/login")
  }
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-16 items-center border-b px-4">
          <SidebarTrigger />
          <Button variant="outline" onClick={handleLogout}>
            <LogOut />
            Logout
          </Button>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
