import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between gap-4 w-full">
      <Input placeholder="Search..." className="max-w-96" />

      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Raven K.</span>

        <Avatar>
          <AvatarFallback>RK</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
