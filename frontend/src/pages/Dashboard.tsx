import { DashboardFilters } from "@/components/Dashboard/DashboardFilter"
import { KpiCard } from "@/components/Dashboard/KPICard"
import { RecentTrips } from "@/components/Dashboard/RecentTrips"
import { VehicleStatus } from "@/components/Dashboard/VehicleStatus"
import { useMemo } from "react"

import { useFleet } from "@/context/FleetContext"

export default function DashboardPage() {
  const { vehicles, drivers, trips } = useFleet()

  const dashboardData = useMemo(() => {
    const activeVehicles = vehicles.filter(
      (vehicle) => vehicle.status !== "RETIRED"
    )
    const availableVehicles = vehicles.filter(
      (vehicle) => vehicle.status === "AVAILABLE"
    )
    const vehiclesInMaintenance = vehicles.filter(
      (vehicle) => vehicle.status === "IN_SHOP"
    )
    const activeTrips = trips.filter((trip) => trip.status === "DISPATCHED")
    const pendingTrips = trips.filter((trip) => trip.status === "DRAFT")
    const driversOnDuty = drivers.filter(
      (driver) => driver.status === "AVAILABLE" || driver.status === "ON_TRIP"
    )
    const vehiclesOnTrip = vehicles.filter(
      (vehicle) => vehicle.status === "ON_TRIP"
    )

    const fleetUtilization = activeVehicles.length
      ? Math.round((vehiclesOnTrip.length / activeVehicles.length) * 100)
      : 0

    return {
      activeVehicles: activeVehicles.length,
      availableVehicles: availableVehicles.length,
      vehiclesInMaintenance: vehiclesInMaintenance.length,
      activeTrips: activeTrips.length,
      pendingTrips: pendingTrips.length,
      driversOnDuty: driversOnDuty.length,
      fleetUtilization,
      recentTrips: [...trips].slice(-5).reverse(),
    }
  }, [drivers, trips, vehicles])

  return (
    <div className="space-y-6">
      <DashboardFilters />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-7">
        <KpiCard title="Active Vehicles" value={dashboardData.activeVehicles} />

        <KpiCard
          title="Available Vehicles"
          value={dashboardData.availableVehicles}
        />

        <KpiCard
          title="Vehicles In Maintenance"
          value={dashboardData.vehiclesInMaintenance}
        />

        <KpiCard title="Active Trips" value={dashboardData.activeTrips} />

        <KpiCard title="Pending Trips" value={dashboardData.pendingTrips} />

        <KpiCard title="Drivers On Duty" value={dashboardData.driversOnDuty} />

        <KpiCard
          title="Fleet Utilization"
          value={`${dashboardData.fleetUtilization}%`}
        />
      </div>

      <div className="grid gap-6 pt-7 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentTrips trips={dashboardData.recentTrips} />
        </div>

        <VehicleStatus vehicles={vehicles} />
      </div>
    </div>
  )
}
