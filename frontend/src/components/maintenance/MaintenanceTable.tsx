import { type Maintenance } from "@/types/maintenance"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"

import { MaintenanceStatusBadge } from "./MaintenancyStatusBadge"

interface Props {
  maintenances: Maintenance[]

  onComplete: (maintenanceId: string) => void
}

export function MaintenanceTable({ maintenances, onComplete }: Props) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>

            <TableHead>Vehicle</TableHead>

            <TableHead>Issue</TableHead>

            <TableHead>Estimated Cost</TableHead>

            <TableHead>Actual Cost</TableHead>

            <TableHead>Status</TableHead>

            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {maintenances.map((maintenance) => (
            <TableRow key={maintenance.id}>
              <TableCell>{maintenance.id}</TableCell>

              <TableCell>{maintenance.vehicleName}</TableCell>

              <TableCell>{maintenance.issue}</TableCell>

              <TableCell>
                ₹{maintenance.estimatedCost.toLocaleString()}
              </TableCell>

              <TableCell>
                {maintenance.actualCost
                  ? `₹${maintenance.actualCost.toLocaleString()}`
                  : "-"}
              </TableCell>

              <TableCell>
                <MaintenanceStatusBadge status={maintenance.status} />
              </TableCell>

              <TableCell>
                {maintenance.status === "OPEN" && (
                  <Button size="sm" onClick={() => onComplete(maintenance.id)}>
                    Complete
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
