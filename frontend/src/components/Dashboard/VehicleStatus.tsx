import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Progress } from "@/components/ui/progress"
import { type Vehicle } from "@/types/Vehicle"

interface VehicleStatusProps {
  vehicles: Vehicle[]
}

export function VehicleStatus({ vehicles }: VehicleStatusProps) {
  const totalVehicles = vehicles.length

  const statusRows = [
    {
      label: "Available",
      value: vehicles.filter((vehicle) => vehicle.status === "AVAILABLE")
        .length,
      tone: "text-green-500",
    },
    {
      label: "On Trip",
      value: vehicles.filter((vehicle) => vehicle.status === "ON_TRIP").length,
      tone: "text-blue-500",
    },
    {
      label: "In Shop",
      value: vehicles.filter((vehicle) => vehicle.status === "IN_SHOP").length,
      tone: "text-orange-500",
    },
    {
      label: "Retired",
      value: vehicles.filter((vehicle) => vehicle.status === "RETIRED").length,
      tone: "text-slate-500",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehicle Status</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {statusRows.map((statusRow) => {
          const progress = totalVehicles
            ? Math.round((statusRow.value / totalVehicles) * 100)
            : 0

          return (
            <div key={statusRow.label}>
              <div className="mb-2 flex justify-between">
                <span>{statusRow.label}</span>
                <span className={statusRow.tone}>{statusRow.value}</span>
              </div>

              <Progress value={progress} />
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
