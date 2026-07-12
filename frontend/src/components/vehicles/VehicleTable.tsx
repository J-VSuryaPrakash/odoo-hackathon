import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"

import { MoreHorizontal } from "lucide-react"

import { StatusBadge } from "./StatusBadge"
import type { Vehicle } from "@/types/Vehicle";

interface VehicleTableProps {
  vehicles: Vehicle[]
}

export function VehicleTable({ vehicles }: VehicleTableProps) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Registration</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Odometer</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {vehicles.map((vehicle) => (
            <TableRow key={vehicle.id}>
              <TableCell>{vehicle.registrationNo}</TableCell>

              <TableCell>{vehicle.name}</TableCell>

              <TableCell>{vehicle.type}</TableCell>

              <TableCell>{vehicle.maxLoadCapacity} KG</TableCell>

              <TableCell>{vehicle.odometer.toLocaleString()}</TableCell>

              <TableCell>₹{vehicle.acquisitionCost.toLocaleString()}</TableCell>

              <TableCell>
                <StatusBadge status={vehicle.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
