import { type Trip } from "@/types/Trips"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"

import { TripStatusBadge } from "./TripStatusBadge"

interface Props {
  trips: Trip[]

  onDispatch: (tripId: string) => void
  onComplete: (tripId: string) => void
  onCancel: (tripId: string) => void
}

export function TripTable({ trips, onDispatch, onComplete, onCancel }: Props) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Trip ID</TableHead>
            <TableHead>Vehicle</TableHead>
            <TableHead>Driver</TableHead>
            <TableHead>Origin</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Cargo</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {trips.map((trip) => (
            <TableRow key={trip.id}>
              <TableCell>{trip.id}</TableCell>

              <TableCell>{trip.vehicleName}</TableCell>

              <TableCell>{trip.driverName}</TableCell>

              <TableCell>{trip.origin}</TableCell>

              <TableCell>{trip.destination}</TableCell>

              <TableCell>{trip.cargoWeight} KG</TableCell>

              <TableCell>
                <TripStatusBadge status={trip.status} />
              </TableCell>

              <TableCell>
                <div className="flex gap-2">
                  {trip.status === "DRAFT" && (
                    <>
                      <Button size="sm" onClick={() => onDispatch(trip.id)}>
                        Dispatch
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onCancel(trip.id)}
                      >
                        Cancel
                      </Button>
                    </>
                  )}

                  {trip.status === "DISPATCHED" && (
                    <>
                      <Button size="sm" onClick={() => onComplete(trip.id)}>
                        Complete
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onCancel(trip.id)}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
