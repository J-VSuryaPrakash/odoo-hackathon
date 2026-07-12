import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useMemo } from "react"

import { useFleet } from "@/context/FleetContext"

function formatLabel(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function DashboardFilters() {
  const { vehicles, trips } = useFleet()

  const vehicleTypes = useMemo(
    () => Array.from(new Set(vehicles.map((vehicle) => vehicle.type))).sort(),
    [vehicles]
  )

  const vehicleStatuses = useMemo(
    () => Array.from(new Set(vehicles.map((vehicle) => vehicle.status))).sort(),
    [vehicles]
  )

  const tripStatuses = useMemo(
    () => Array.from(new Set(trips.map((trip) => trip.status))).sort(),
    [trips]
  )

  return (
    <div>
      <h2 className="pb-1 text-lg font-semibold">Filters</h2>
      <div className="flex flex-wrap gap-4 p-2">
        <Select>
          <SelectTrigger className="w-55">
            <SelectValue placeholder="Vehicle Type" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {vehicleTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-55">
            <SelectValue placeholder="Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {vehicleStatuses.map((status) => (
              <SelectItem key={status} value={status}>
                {formatLabel(status)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-55">
            <SelectValue placeholder="Trip Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {tripStatuses.map((status) => (
              <SelectItem key={status} value={status}>
                {formatLabel(status)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
