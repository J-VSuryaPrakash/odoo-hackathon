import { useMemo, useState } from "react"

import { VehicleDialog } from "@/components/vehicles/VehicleDailog"
import { VehicleFilters } from "@/components/vehicles/VehicleFilter"
import { VehicleTable } from "@/components/vehicles/VehicleTable"
import { useFleet } from "@/context/FleetContext"

export default function VehiclesPage() {
  const [search, setSearch] = useState("")
  const [type, setType] = useState("ALL")
  const [status, setStatus] = useState("ALL")
  const { vehicles } = useFleet()

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const matchesSearch =
        vehicle.name.toLowerCase().includes(search.toLowerCase()) ||
        vehicle.registrationNo.toLowerCase().includes(search.toLowerCase())

      const matchesType = type === "ALL" || vehicle.type === type

      const matchesStatus = status === "ALL" || vehicle.status === status

      return matchesSearch && matchesType && matchesStatus
    })
  }, [vehicles, search, type, status])

  return (
    <div className="space-y-6">
      {/* Page Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Vehicle Registry
          </h1>

          <p className="text-muted-foreground">
            Manage and monitor fleet vehicles
          </p>
        </div>

        <VehicleDialog />
      </div>

      {/* Filters */}

      <VehicleFilters
        search={search}
        onSearchChange={setSearch}
        type={type}
        onTypeChange={setType}
        status={status}
        onStatusChange={setStatus}
      />

      {/* Stats Row */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Total Vehicles</p>

          <p className="mt-2 text-2xl font-bold">{vehicles.length}</p>
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Available</p>

          <p className="mt-2 text-2xl font-bold text-green-500">
            {vehicles.filter((v) => v.status === "AVAILABLE").length}
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">On Trip</p>

          <p className="mt-2 text-2xl font-bold text-blue-500">
            {vehicles.filter((v) => v.status === "ON_TRIP").length}
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">In Shop</p>

          <p className="mt-2 text-2xl font-bold text-orange-500">
            {vehicles.filter((v) => v.status === "IN_SHOP").length}
          </p>
        </div>
      </div>

      {/* Table */}

      <VehicleTable vehicles={filteredVehicles} />
    </div>
  )
}
