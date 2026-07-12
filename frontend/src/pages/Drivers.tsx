import { useMemo, useState } from "react"

import { drivers } from "@/components/drivers/DriverData"

import { DriverFilters } from "@/components/drivers/DriverFilter"
import { DriverTable } from "@/components/drivers/DriverTable"
import { DriverDialog } from "@/components/drivers/DriverDailog"
import type { DriverStatus } from "@/types/Driver";

export default function DriversPage() {
  const [search, setSearch] = useState("")

  const [driverList, setDriverList] = useState(drivers)

  const [status, setStatus] = useState("ALL")

  function updateDriverStatus(driverId: string, status: DriverStatus) {
    setDriverList((prev) =>
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
  }, [search, status])

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
