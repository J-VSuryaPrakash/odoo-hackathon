import { useMemo, useState } from "react"

import { DriverDialog } from "@/components/drivers/DriverDailog"
import { DriverFilters } from "@/components/drivers/DriverFilter"
import { DriverTable } from "@/components/drivers/DriverTable"
import { useFleet } from "@/context/FleetContext"
import type { DriverStatus } from "@/types/Driver"

export default function DriversPage() {
  const [search, setSearch] = useState("")
  const { drivers, setDrivers } = useFleet()

  const [status, setStatus] = useState("ALL")

  function updateDriverStatus(driverId: string, status: DriverStatus) {
    setDrivers((prev) =>
      prev.map((driver) =>
        driver.id === driverId ? { ...driver, status } : driver
      )
    )
  }

  const filteredDrivers = useMemo(() => {
    return drivers.filter((driver) => {
      const matchesSearch =
        driver.name.toLowerCase().includes(search.toLowerCase()) ||
        driver.licenseNumber.toLowerCase().includes(search.toLowerCase())

      const matchesStatus = status === "ALL" || driver.status === status

      return matchesSearch && matchesStatus
    })
  }, [drivers, search, status])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Driver Management</h1>

          <p className="text-muted-foreground">
            Manage driver records and compliance
          </p>
        </div>

        <DriverDialog />
      </div>

      <DriverFilters
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
      />

      <DriverTable
        drivers={filteredDrivers}
        onStatusChange={updateDriverStatus}
      />
    </div>
  )
}
