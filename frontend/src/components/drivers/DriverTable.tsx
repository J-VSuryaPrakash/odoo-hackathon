import { type Driver, type DriverStatus } from "@/types/Driver"
import { getUser } from "@/lib/auth"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { DriverStatusBadge } from "./DriverStatusBadge"
import { DriverStatusSelect } from "./DriverStatusSelect";

interface Props {
  drivers: Driver[]

  onStatusChange: (driverId: string, status: DriverStatus) => void
}

export function DriverTable({ drivers }: Props) {

    const currentUser = getUser()

    const canEditStatus = (driver: Driver) => {
      return currentUser?.role === "DRIVER" && currentUser?.id === driver.userId
    }
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>License</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Expiry</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Safety</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {drivers.map((driver) => (
            <TableRow key={driver.id}>
              <TableCell>{driver.name}</TableCell>

              <TableCell>{driver.licenseNumber}</TableCell>

              <TableCell>{driver.licenseCategory}</TableCell>

              <TableCell>{driver.licenseExpiry}</TableCell>

              <TableCell>{driver.contactNumber}</TableCell>

              <TableCell>{driver.safetyScore}</TableCell>

              <TableCell>
                {canEditStatus(driver) ? (
                  <DriverStatusSelect
                    value={driver.status}
                    onChange={(status) => onStatusChange(driver.id, status)}
                  />
                ) : (
                  <DriverStatusBadge status={driver.status} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
