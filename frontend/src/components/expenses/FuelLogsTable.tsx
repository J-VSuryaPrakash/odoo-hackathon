import { type FuelLog } from "@/types/fuelLogs"

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"

interface Props {
  fuelLogs: FuelLog[]
}

export function FuelLogsTable({ fuelLogs }: Props) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vehicle</TableHead>

            <TableHead>Date</TableHead>

            <TableHead>Liters</TableHead>

            <TableHead>Fuel Cost</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {fuelLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{log.vehicleName}</TableCell>

              <TableCell>{log.date}</TableCell>

              <TableCell>{log.liters} L</TableCell>

              <TableCell>₹{log.fuelCost.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
