import { useFleet } from "@/context/FleetContext"

import { AddMaintenanceDialog } from "@/components/maintenance/MaintenanceDailog"

import { MaintenanceTable } from "@/components/maintenance/MaintenanceTable"

export default function MaintenancePage() {
  const { maintenances, completeMaintenance } = useFleet()

  function handleComplete(maintenanceId: string) {
    completeMaintenance(maintenanceId, 10000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Maintenance</h1>

          <p className="text-muted-foreground">Track vehicle maintenance</p>
        </div>

        <AddMaintenanceDialog />
      </div>

      <MaintenanceTable
        maintenances={maintenances}
        onComplete={handleComplete}
      />
    </div>
  )
}
