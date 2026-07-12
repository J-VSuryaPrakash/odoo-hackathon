import { KpiCard } from "@/components/Dashboard/KPICard"
import { DashboardFilters } from "@/components/Dashboard/DashboardFilter"
import { RecentTrips } from "@/components/Dashboard/RecentTrips"
import { VehicleStatus } from "@/components/Dashboard/VehicleStatus"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardFilters />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-7">
        <KpiCard title="Active Vehicles" value={25} />

        <KpiCard title="Available Vehicles" value={18} />

        <KpiCard title="Vehicles In Maintenance" value={3} />

        <KpiCard title="Active Trips" value={7} />

        <KpiCard title="Pending Trips" value={4} />

        <KpiCard title="Drivers On Duty" value={9} />

        <KpiCard title="Fleet Utilization" value="72%" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3 pt-7">
        
        <div className="lg:col-span-2">
          <RecentTrips />
        </div>

        <VehicleStatus />
      </div>
    </div>
  )
}
